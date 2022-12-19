import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel, ValidationEmployeeModel ,ValidationChangePass} from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { RoleService } from 'src/app/services_API/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from "../../../services_API/authentication.service";
import { StatusNotification } from "../../../enums/enum";

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss'],
})
export class ItemEmployeeComponent implements OnInit{
  response: ResponseModel
  auth: AuthenticationModel
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  @ViewChild('closeModalLoadApprove') closeModalLoadApprove: ElementRef;
  isLoading: boolean
  validateEmployee: ValidationEmployeeModel = new ValidationEmployeeModel
  validationChangePass: ValidationChangePass = new ValidationChangePass
  @Input() resEmployee: EmployeeModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  listGender = this.configService.listGender()
  isChange: boolean = false
  resRole: RoleModel[]
  resEmployeeTmp: EmployeeModel
  formData: any
  img:any
  idEmployee: any
  constructor(private authService: AuthenticationService,private router: Router, private activatedRoute: ActivatedRoute,private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.idEmployee = this.activatedRoute.snapshot.paramMap.get('id2')
    this.type = this.activatedRoute.snapshot.paramMap.get('id1')

    this.init()

    this.roleService.views().then(response =>{
      this.resRole = response

    })
  }
  EmpchangePass(){
    this.validationChangePass = new ValidationChangePass
    this.validationChangePass =  this.configService.validateChangePass(this.resEmployee, this.validationChangePass)
    if (this.validationChangePass.total == 0) {
          this.resEmployee.idEmployee = this.auth.id


          this.employeeService.changePassword(this.resEmployee.idEmployee, this.resEmployee.password, this.resEmployee.newPassword).subscribe(res =>{
            this.response = res
           this.notificationService.handleAlertObj(res.notification)

           if(this.response.notification.type == StatusNotification.Success)
           {
             this.logOut()
           }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
          })
        }
  }
  init(){
    if(this.type == "detail"){
      this.employeeService.get(this.idEmployee).subscribe(res => {
        this.response = res

        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resEmployee = this.response.content
          this.resEmployeeTmp = Object.assign({}, this.resEmployee)

          if(this.resEmployee){

            if (this.resEmployee.image) {
              // this.img = this.configService.apiUrl + this.resEmployee.image
              this.img = this.resEmployee.image
            }
            else{
              this.img = "../../../../assets/img/employees/unknown.png"
            }

            if(this.resEmployee.birthday){
              this.resEmployee.birthdayDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resEmployee.birthday)
            }
          }
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })

    }
    else{
      this.resEmployee = new EmployeeModel
      this.resEmployeeTmp = Object.assign({}, this.resEmployee)
      if(this.resEmployee){

        if (this.resEmployee.image) {
         // this.img = this.configService.apiUrl + this.resEmployee.image
         this.img = this.resEmployee.image
        }
        else{
          this.img = "../../../../assets/img/employees/unknown.png"
        }
      }
    }
  }
  // ngOnChanges(): void {
  //   this.roleService.views().then(response =>{
  //     this.resRole = response
  //   })
  //   if(this.resEmployee){

  //     if (this.resEmployee.image) {
  //       this.img = this.configService.apiUrl + this.resEmployee.image
  //     }
  //     else{
  //       this.img = "../../../../assets/img/employees/unknown.png"
  //     }

  //     if(this.resEmployee.birthday){
  //       this.resEmployee.birthday = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resEmployee.birthday))
  //       // this.birthdayView = this.configService.formatFromUnixTimestampToFullDateView(Number.parseInt(this.resEmployee.birthday))
  //     }
  //   }
  //   if(this.type == "create"){
  //     this.close()
  //   }
  //   this.resEmployeeTmp = Object.assign({}, this.resEmployee)


  // }
  inputChange(){
    if (JSON.stringify(this.resEmployee) != JSON.stringify(this.resEmployeeTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  inputDateChange(){
    this.resEmployee.birthday = new Date(this.resEmployee.birthdayDisplay).getTime()
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
      this.notificationService.handleAlert("Không đúng định dạng hình ảnh !", StatusNotification.Error)
    }
  }

  save(){
    this.validateEmployee = new ValidationEmployeeModel
    this.validateEmployee =  this.configService.validateEmployee(this.resEmployee, this.validateEmployee)

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
          if (res.notification.type == StatusNotification.Validation) {
            this.validateEmployee[res.notification.description] = res.notification.messenge
          }
          else{
            this.notificationService.handleAlertObj(res.notification)
            if (res.notification.type == StatusNotification.Success) {
              this.close()
              this.isChange = false
              this.router.navigate(['','list-employee']);
            }
          }
          this.isLoading = false


        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.employeeService.update(file, this.resEmployee.idEmployee).subscribe(res =>{
          this.response = res
          if (res.notification.type == StatusNotification.Validation) {
            this.validateEmployee[res.notification.description] = res.notification.messenge
          }
          else{
            this.notificationService.handleAlertObj(res.notification)
            if (res.notification.type == StatusNotification.Success) {
              if (this.resEmployee.isActive != this.resEmployeeTmp.isActive) {
                this.configService.callBlockSignalR(this.resEmployee.idEmployee)
              }
              this.close()
              this.router.navigate(['','list-employee']);
            }
          }
          this.isChange = true
          this.isLoading = false

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }

    }
    else{
      this.isLoading = false
    }

  }

  backup(){
    this.resEmployee = Object.assign({}, this.resEmployeeTmp)
    this.resEmployee.birthdayDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resEmployee.birthday)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  close(){
    if (this.type == 'create') {
      this.resEmployee = new EmployeeModel()
      this.img = "../../../../assets/img/employees/unknown.png"
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
      if (this.resEmployee.idEmployee != this.auth.id) {
        this.employeeService.delete(this.resEmployee.idEmployee).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.isLoading = false
          if (res.notification.type == StatusNotification.Success) {
            this.configService.callBlockSignalR(this.resEmployee.idEmployee)
            setTimeout(() => {
              this.closeModalLoadDelete.nativeElement.click()
              this.router.navigate(['','list-employee']);
             }, 100);
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
       }
       else{
        this.isLoading = false
        this.notificationService.handleAlert("Bạn không thể xóa tài khoản đang đăng nhập !", StatusNotification.Error)
      }
    }
   }
   logOut(){
    this.authService.logOut(this.auth.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      localStorage.removeItem("currentUser")
      localStorage.removeItem("token")
      sessionStorage.clear()
      this.auth = null
      location.assign(this.configService.clientUrl + "/login")
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
   restore(){
    if (this.resEmployee) {
      this.employeeService.restore(this.resEmployee.idEmployee).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isLoading = false
        if (res.notification.type == StatusNotification.Success) {
          setTimeout(() => {
            this.closeModalLoadRestore.nativeElement.click()
            this.router.navigate(['','list-employee'], { state: { isDelete: true } });
           }, 100);
         }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
  }
}
