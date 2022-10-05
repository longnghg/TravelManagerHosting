import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  login(email: any, password: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Authentication/EmpLogin", {email, password});
  }

  logOut()
  {
      var empId = localStorage.getItem("empId")
      localStorage.clear();
      document.location.assign(this.url.clientUrl +'/#/login');
      return  this.http.post(this.url.apiUrl + "/api/Authentication/Logout", {empId});
  }


  error(status: any, message: any){
      console.log('Status:  '  + status);
      console.log('Message: '  + message);

      if (status == 401){
          message = "Hết hạn đăng nhập !"
          document.location.assign(this.url.clientUrl +'/#/login');
      }
      else if (status == 200) {
          message = message;
      }
      else{
          message = "Không kết nối được đến server !"
      }

      return message
  }
}
