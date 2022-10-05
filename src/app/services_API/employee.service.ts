import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetEmployees()
  {
      return this.http.get<ResponsiveModel>( this.url.apiUrl + "/api/Employee/GetEmployees");
  }

}
