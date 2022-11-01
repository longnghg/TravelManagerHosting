import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../services_API/authentication.service";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
import { AuthenticationModel, ValidationLoginModel } from "../../models/authentication.model";
import { EmployeeModel } from "../../models/employee.model";
import { RoleModel} from "../../models/role.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('modalBlock') modalBlock: ElementRef;
  resAthentication: AuthenticationModel
  resEmployee: EmployeeModel = new EmployeeModel
  validateAuth: ValidationLoginModel = new ValidationLoginModel;
  response: ResponseModel
  token: string
  isloading = false
  email = "test1@gmail.com"
  password = "123"
  countLoginFail = 0
  timeBlock: any
  constructor( private configService:ConfigService, private notificationService:NotificationService, private authentication:AuthenticationService) { }
  ngOnInit() {}

  login(){
    this.validateAuth = new ValidationLoginModel
    this.validateAuth = this.configService.validateLogin(this.resEmployee, this.validateAuth)
    if (this.validateAuth.total == 0) {
      this.isloading = true
      this.timeBlock = Number.parseInt(localStorage.getItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resEmployee.email))

      if (new Date().getTime() >= this.timeBlock) {
        localStorage.removeItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resEmployee.email)
        this.timeBlock = null
        this.countLoginFail = 0
      }

    if (this.timeBlock) {
      this.modalBlock.nativeElement.click()
      this.isloading = false
    }
    else{
      this.authentication.login(this.resEmployee).subscribe(res=>{
        this.response = res

        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resAthentication = this.response.content
          localStorage.setItem("token", this.resAthentication.token)
          localStorage.setItem("idUser", this.resAthentication.id)
          localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))
          document.location.assign( this.configService.clientUrl + "/#/dashboard")
        } else{
          this.countLoginFail +=1
          if (this.countLoginFail > 5) {
           localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resEmployee.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
          }
        }

        this.notificationService.handleAlertObj(res.notification)

        this.isloading = false

      }, error => {
        this.isloading = false
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    }}
  }
