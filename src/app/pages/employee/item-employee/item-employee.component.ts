import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services_API/role.service';

@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss'],
})
export class ItemEmployeeComponent implements OnInit{

  response: ResponseModel
  @Input() resEmployee: EmployeeModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  listGender = this.configService.listGender()
  isEdit: boolean = false
  isChange: boolean = false
  resRole: RoleModel[]
  resEmployeeTmp: EmployeeModel
  formData: any
  img:any = "../../../../assets/img/employees/unknown.png"
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
    }
    if(this.type == "create"){
      this.resEmployee = new EmployeeModel()
      this.isEdit = true
    }
    else{
      this.isEdit = false
    }

    this.resEmployeeTmp = Object.assign({}, this.resEmployee)
  }
  inputChange(){
    console.log(JSON.stringify(this.resEmployeeTmp));
      console.log(JSON.stringify(this.resEmployee));

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
      this.restore()

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
    }
  }

  save(){
    var valid =  this.configService.validateEmployee(this.resEmployee)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        var file = new FormData();
        file.append('data', JSON.stringify(this.resEmployee))
        file.append('file', this.formData.path[0].files[0])

        this.employeeService.create(file).subscribe(res =>{
          this.response = res
         this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{
        this.employeeService.update(this.resEmployee).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      this.isChange = false
      this.isEdit = false
    }

  }
  delete(){
    this.employeeService.delete(this.resEmployee).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  restore(){
    this.resEmployee = Object.assign({}, this.resEmployeeTmp)
    this.isChange = false
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
    this.restore()
  }

  restoreEmployee(){
    this.employeeService.restore(this.resEmployee).subscribe(res =>{
      this.response = res
      console.log(this.response);

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  getDataDelete(){
    this.parentDel.emit(this.resEmployee);
  }

}
