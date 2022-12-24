import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
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
  pageSize = 4
   // mo dau
     //signalr
  hubConnectionBuilder: any
  constructor(private notificationService: NotificationService, private authenticationService: AuthenticationService, location: Location,  private element: ElementRef, private router: Router, public configService:ConfigService) {
    this.location = location;
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    console.log(this.auth);

    if(this.auth){
      this.hubConnectionBuilder = this.configService.signalR()
      this.hubConnectionBuilder.start().then(function(){
        console.info("SignalR listening!");
      });

      this.hubConnectionBuilder.on('Notification', (result: any) => {
        this.initNotification()
      })

      this.hubConnectionBuilder.on('BlockUser', (result: any) => {
        this.logOut()
      })
    }
  }

  ngOnInit() {
    if(this.auth){
      if(this.auth.image){
        this.img = this.configService.apiUrl + this.auth.image
      }
    }
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.initNotification()
    // setInterval(() => {
    //  this.initNotification()}, 30000);
  }

  initNotification(){
    this.notificationService.gets(this.auth.roleId, this.auth.id, this.isSeen, this.pageSize).then(res =>{
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
        titlee = titlee.slice(1);
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

  deleteNotif(id, index){
    this.notificationService.deleteNotification(id).then(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        // this.resNotification.splice(index, 1)
        // this.totalResult =  this.resNotification.length
        this.initNotification()
        this.dropdownMenu.nativeElement.click()
      }
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
    this.pageSize = 4
  }

  moreNotif(){
    this.pageSize = this.pageSize + 4
    this.initNotification()
  }

  changeZIndex(){
    document.getElementById("thead").style.zIndex = "0"
  }
}
