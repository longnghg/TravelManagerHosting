import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  login(email: any, password: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Authentication/EmpLogin", {email, password});
  }

  logOut()
  {
      var empId = localStorage.getItem("empId")
      localStorage.clear();
      document.location.assign(this.url.clientUrl +'/#/login');
      return  this.http.post(this.url.apiUrl + "/api/Authentication/Logout", {empId});
  }



}
