import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel, ValidationEmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services_API/role.service';
import { ActivatedRoute, Router } from '@angular/router';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss'],
})
export class ItemEmployeeComponent implements OnInit{
  response: ResponseModel
  validateEmployee: ValidationEmployeeModel = new ValidationEmployeeModel
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
  idEmployee: any
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.idEmployee = this.activatedRoute.snapshot.paramMap.get('id2')
    this.type = this.activatedRoute.snapshot.paramMap.get('id1')
    if(this.type == "detail"){
      this.isEdit = false
      this.employeeService.get(this.idEmployee).subscribe(res => {
        this.response = res

        if(!this.response.notification.type)
        {
          this.resEmployee = this.response.content
          this.resEmployeeTmp = Object.assign({}, this.resEmployee)

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
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })

    }
    else{
      this.resEmployee = new EmployeeModel
      this.resEmployeeTmp = Object.assign({}, this.resEmployee)
      this.isEdit = true
      if(this.resEmployee){

        if (this.resEmployee.image) {
          this.img = this.configService.apiUrl + this.resEmployee.image
        }
        else{
          this.img = "../../../../assets/img/employees/unknown.png"
        }
      }
    }

    this.roleService.views().then(response =>{
      this.resRole = response

    })
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
    if (e.target.files[0].type == "image/jpg" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png") {
      if (e.target.files && e.target.files[0]){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.img = reader.result;
        reader.readAsDataURL(file)

        this.resEmployee.image = this.img
      }
    }
    else{
      this.notificationService.handleAlert("Không đúng định dạng hình ảnh !", "Error")
    }
  }

  save(){
    this.validateEmployee =  this.configService.validateEmployee(this.resEmployee, this.validateEmployee)
    console.log(this.validateEmployee);

    if (this.validateEmployee.total == 0) {
      var file = new FormData();
      file.append('data', JSON.stringify(this.resEmployee))

      if (this.formData) {
        file.append('file', this.formData.path[0].files[0])
      }

      if(this.type == "create")
      {
        this.employeeService.create(file).subscribe(res =>{
          this.response = res
          if (res.notification.type != "Error") {
            this.close()
          }
         this.notificationService.handleAlertObj(res.notification)
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
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", "Info")
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
    this.resEmployee.phone = input.value
  }

  delete(){
    if (this.resEmployee) {
      if (this.resEmployee.idEmployee != localStorage.getItem("idUser")) {
        this.employeeService.delete(this.resEmployee.idEmployee).subscribe(res =>{
          this.response = res

          this.notificationService.handleAlertObj(res.notification)
          if (res.notification.type == "Success") {
           this.router.navigate(['','list-employee']);
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
       }
       else{
        this.notificationService.handleAlert("Bạn không thể xóa tài khoản đang đăng nhập !", "Error")
      }
    }
   }

   restore(){
    if (this.resEmployee) {
      this.employeeService.restore(this.resEmployee.idEmployee).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == "Success") {
          this.router.navigate(['','list-employee'], { state: { isDelete: true } });
         }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
  }
}
