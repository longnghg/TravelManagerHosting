import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationModel } from "../../models/authentication.model";
import { ConfigService } from "../../services_API/config.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  currentUser: AuthenticationModel
  img = "../../../assets/img/employees/unknown.png"
  constructor(location: Location,  private element: ElementRef, private router: Router, public configService:ConfigService) {
    this.location = location;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if(this.currentUser){
      if(this.currentUser.image){
        this.img = this.configService.apiUrl + this.currentUser.image
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

}
