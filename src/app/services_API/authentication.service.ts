import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  login(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Authentication/login-employee", data);
  }

  logOut(empId: string)
  {
      return  this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Authentication/logout-employee?idEmp="+empId);
  }

  block(email: string){
    return this.http.put<ResponseModel>(this.configService.apiUrl + "/api/Authentication/block-customer?email="+email, {});
  }

}
