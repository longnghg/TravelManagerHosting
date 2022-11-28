import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationModel } from "../../models/authentication.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { ConfigService } from "../../services_API/config.service";
import { AuthenticationService } from "../../services_API/authentication.service";
import { NotificationService } from "../../services_API/notification.service";
import { StatusNotification } from "../../enums/enum";
import { NotificationUserModel } from 'src/app/models/notificationUser.model';
import { RouteNotification, TypeNotification } from "../../enums/enum";


// signalr
import { HubConnection } from '@microsoft/signalr';

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
  resAthentication: AuthenticationModel = new AuthenticationModel()
  img = "../../../assets/img/employees/unknown.png"
  response: ResponseModel
  resNotification: NotificationUserModel[]
  totalResult = 0
  isSeen: boolean = false
   // mo dau
     //signalr
     private hubConnectionBuilder: HubConnection
  constructor(private notificationService: NotificationService, private authenticationService: AuthenticationService, location: Location,  private element: ElementRef, private router: Router, public configService:ConfigService) {
    this.location = location;
  }

  ngOnInit() {
     this.hubConnectionBuilder = this.configService.signIR()
    this.hubConnectionBuilder.start().then(function(){

    });
    this.hubConnectionBuilder.on('Init', (result: any) => {
      console.log("da nah ndc tin hieu");
    })


    // ket thuc
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    if(this.auth){
      if(this.auth.image){
        this.img = this.configService.apiUrl + this.auth.image
      }
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.initNotification()
    setInterval(() => {
     this.initNotification()}, 60000);

  }

  initNotification(){
    this.notificationService.gets(this.auth.roleId, this.auth.id, this.isSeen).then(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resNotification = this.response.content
        this.totalResult = this.response.totalResult
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  updateIsSeen(notification: NotificationUserModel){
    if (!notification.isSeen) {
      this.notificationService.updateIsSeen(notification.idNotification).then(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          notification.isSeen = true
          this.totalResult = this.totalResult-1
          this.router.navigate(['',RouteNotification[TypeNotification[notification.type]]]);
          setTimeout(() => {
            document.body.scrollTop = 3000;
            document.documentElement.scrollTop = 3000;
          }, 300);
          // location.assign(this.configService.clientUrl+ RouteNotification[TypeNotification[notification.type]])
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    else{
      // location.assign(this.configService.clientUrl+ RouteNotification[TypeNotification[notification.type]])
      this.router.navigate(['',RouteNotification[TypeNotification[notification.type]]]);
      setTimeout(() => {
        document.body.scrollTop = 3000;
        document.documentElement.scrollTop = 3000;
      }, 300);
    }
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
      localStorage.removeItem("token")
      sessionStorage.clear()
      this.auth = null
      location.assign(this.configService.clientUrl + "/login")
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  changeIsSeen(){
    if(this.isSeen)
    {
      this.isSeen = false
    }
    else{
      this.isSeen = true
      
    }
  }
}
