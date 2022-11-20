import { Component, OnInit } from '@angular/core';
import { EmployeeModel, ValidationForgotPass } from 'src/app/models/employee.model';
import { OTPModel, ValidationOtp } from 'src/app/models/otp.model';
import { AuthenticationService } from 'src/app/services_API/authentication.service';
import { EmployeeService } from 'src/app/services_API/employee.service';
import { ResponseModel } from 'src/app/models/responsiveModels/response.model';
import { StatusNotification } from 'src/app/enums/enum';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  validationOtp: ValidationOtp = new ValidationOtp
  validationForgotPass: ValidationForgotPass = new ValidationForgotPass
  resEmployee: EmployeeModel = new EmployeeModel
  confirmPassword: string
  OTP: OTPModel = new OTPModel
  checkOTP: string


  isload: boolean
  isOtp: boolean
  isTrue: boolean = false
  response: ResponseModel
  timePresent: number
  endTime: any
  config: CountdownConfig
  isCountdown: boolean = false

  constructor(private authenticationSvc: AuthenticationService, private employeeSvc: EmployeeService,
    private notificationService: NotificationService, private configService: ConfigService ) { }

  ngOnInit(): void {
  }

  SendOTP(){
    this.isload = true
    this.validationOtp = new ValidationOtp
    this.validationOtp =  this.configService.validateOtp(this.OTP, this.validationOtp, false)
    if (this.validationOtp.total == 0) {
      this.employeeSvc.SendOTP(this.OTP.email).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (this.response.notification.type == StatusNotification.Success) {
          this.isOtp = true
          this.OTP.beginTime = this.response.content.beginTime
          this.OTP.endTime = this.response.content.endTime
          this.OTP.otpCode = this.response.content.otpCode
          this.OTP.id = this.response.content.id

          this.config = { leftTime: 120, format: 'mm:ss'};
          this.isCountdown = false
          this.isload = false
        }
        if(this.response.notification.type == StatusNotification.Error){
          this.isload = false
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    else{
      this.isload = false
    }
  }

    handleEvent(e: CountdownEvent) {
      if (e.action === 'done') {
        this.isCountdown = true
      }
    }

    btnCheckOTP(){
      this.timePresent = Date.now()
      this.endTime = this.OTP.endTime
      this.validationOtp = new ValidationOtp
      this.validationOtp =  this.configService.validateOtp(this.OTP, this.validationOtp, true)
      if ( this.validationOtp.total == 0) {
        this.isTrue = true
      }
    }

    EmpForgotPass() {
      this.resEmployee.email = this.OTP.email
      this.validationForgotPass = new ValidationForgotPass
      this.validationForgotPass =  this.configService.validateForgotPass(this.resEmployee, this.validationForgotPass)
      if (this.validationForgotPass.total == 0) {
      this.authenticationSvc.forgotPassword(this.resEmployee).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)

        if (this.response.notification.type == StatusNotification.Success) {
          localStorage.clear()
          location.assign(this.configService.clientUrl + "/login")
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
}
