import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services_API/role.service';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss'],
})
export class ItemEmployeeComponent implements OnInit{
  response: ResponseModel
  @Input() resEmployee: EmployeeModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  listGender = this.configService.listGender()
  isEdit: boolean = false
  isChange: boolean = false
  resRole: RoleModel[]
  resEmployeeTmp: EmployeeModel
  formData: any
  birthday: string
  birthdayView: string
  img:any
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService, private roleService: RoleService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    this.roleService.views().then(response =>{
      this.resRole = response
    })
    if(this.resEmployee){

      if (this.resEmployee.image) {
        this.img = this.configService.apiUrl + this.resEmployee.image
      }
      else{
        this.img = "../../../../assets/img/employees/unknown.png"
      }

      if(this.resEmployee.birthday){
        this.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resEmployee.birthday))
        this.birthdayView = this.configService.formatFromUnixTimestampToFullDateView(Number.parseInt(this.resEmployee.birthday))
      }
    }
    if(this.type == "create"){
      this.close()
    }
    else{
      this.isEdit = false
    }

    this.resEmployeeTmp = Object.assign({}, this.resEmployee)
  }
  inputChange(){
    this.birthdayView = this.configService.formatFromUnixTimestampToFullDateView(Number.parseInt(this.resEmployee.birthday))
    if (JSON.stringify(this.resEmployee) != JSON.stringify(this.resEmployeeTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.backup()
    }
    else{
      this.isEdit = true
    }
  }

  changeImg(e: any){
    this.formData = e
    if (e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.img = reader.result;
      reader.readAsDataURL(file)

      this.resEmployee.image = this.img
    }
  }

  save(){
    var valid =  this.configService.validateEmployee(this.resEmployee)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      var file = new FormData();
      file.append('data', JSON.stringify(this.resEmployee))

      if (this.formData) {
        file.append('file', this.formData.path[0].files[0])
      }

      if(this.type == "create")
      {
        this.employeeService.create(file).subscribe(res =>{
          this.response = res
         this.notificationService.handleAlertObj(res.notification)
          this.close()
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{
        this.employeeService.update(file).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if (this.type == 'detail') {
            this.isEdit = false
          }
          this.isChange = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }

    }

  }

  backup(){
    this.resEmployee = Object.assign({}, this.resEmployeeTmp)
    this.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resEmployee.birthday))
    this.birthdayView = this.configService.formatFromUnixTimestampToFullDateView(Number.parseInt(this.resEmployee.birthday))
    this.isChange = false
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
    else{
      this.resEmployee = new EmployeeModel()
      this.img = "../../../../assets/img/employees/unknown.png"
      this.birthday = null
      this.birthdayView = null
      this.isEdit = true
    }
  }



  getDataDelete(){
    this.parentDelete.emit(this.resEmployee);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resEmployee);
  }
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
