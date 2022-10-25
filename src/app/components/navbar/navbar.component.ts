import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationModel } from "../../models/authentication.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { ConfigService } from "../../services_API/config.service";
import { AuthenticationService } from "../../services_API/authentication.service";
import { NotificationService } from "../../services_API/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  auth: AuthenticationModel
  img = "../../../assets/img/employees/unknown.png"
  response: ResponseModel
  constructor(private notificationService: NotificationService, private authenticationService: AuthenticationService, location: Location,  private element: ElementRef, private router: Router, public configService:ConfigService) {
    this.location = location;
  }

  ngOnInit() {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    if(this.auth){
      if(this.auth.image){
        this.img = this.configService.apiUrl + this.auth.image
      }
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Thông tin chi tiết';
  }

  logOut(){
    this.authenticationService.logOut(this.auth.id).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      localStorage.removeItem("currentUser")
      localStorage.removeItem("idUser")
      localStorage.removeItem("token")
      sessionStorage.clear()
      this.auth = null
      location.assign(this.configService.clientUrl + "/#/login")
      location.reload()
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

}
