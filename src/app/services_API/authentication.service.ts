import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  login(email: any, password: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Authentication/login-employee", {email, password});
  }

  logOut(empId: string)
  {
      return  this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Authentication/logout-employee?idEmp="+empId);
  }



}
