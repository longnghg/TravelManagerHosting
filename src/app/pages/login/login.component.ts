import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services_API/authentication.service";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
import { AuthenticationModel } from "../../models/authentication.model";
import { RoleModel, RoleTitle } from "../../models/role.model";
import { ResponsiveModel } from "../../models/responsiveModels/responsive.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  resAthentication: AuthenticationModel
  responsive: ResponsiveModel
  token: string
  isloading = false
  email = "test1@gmail.com"
  password = "123"
  constructor( private configService:ConfigService, private notificationService:NotificationService, private authentication:AuthenticationService) { }
  ngOnInit() {}

  Login(){
    this.isloading = true
    this.authentication.login(this.email, this.password).subscribe(res=>{
      this.responsive = res

      this.notificationService.handleAlertObj(res.notification)
      if(this.responsive.notification.type == "Success")
      {
        this.resAthentication = JSON.parse(this.responsive.content)
        localStorage.setItem("token", this.resAthentication.Token)
        localStorage.setItem("currentUser", JSON.stringify(this.resAthentication))
        document.location.assign("http://localhost:4200/#/dashboard")
      }

      this.isloading = false

    }, error => {
      this.isloading = false
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }
}

