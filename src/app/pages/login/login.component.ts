import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from "../../services_API/authentication.service";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
import { AuthenticationModel, ValidationLoginModel } from "../../models/authentication.model";
import { EmployeeModel } from "../../models/employee.model";
import { RoleModel} from "../../models/role.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";
import { Router } from '@angular/router';
import { ROUTES } from '../../components/sidebar/sidebar.component';



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
  countLoginFail = 0
  timeBlock: any
  constructor(private router: Router, private configService:ConfigService, private notificationService:NotificationService, private authenticationService:AuthenticationService) { }
  ngOnInit() {

  }

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
      this.authenticationService.login(this.resEmployee).subscribe(res=>{
        this.response = res

        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resAthentication = this.response.content
          var path = this.configService.getPath(this.resAthentication.roleId)
          localStorage.setItem("token", this.resAthentication.token)
          localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))
          console.log("hello");
          console.log(document.location.assign(this.configService.clientUrl + path))
          // document.location.assign(this.configService.clientUrl + path)
        }
        else if(this.response.notification.type == StatusNotification.Block){
          this.timeBlock = this.response.content
          this.modalBlock.nativeElement.click()
          this.isloading = false
        }
        else{
          this.countLoginFail +=1
          if (this.countLoginFail > 5) {
            this.authenticationService.block(this.resEmployee.email).subscribe(res => {
              this.response = res
              if (this.response.notification.type == StatusNotification.Error) {
                localStorage.setItem("MY3t/ez6Q0yEwHMr0/Cy/Q=="+this.resEmployee.email,(new Date(new Date().getTime() +30*60000).getTime()).toString())
              }
              this.countLoginFail = 0
            })
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
