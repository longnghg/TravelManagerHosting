import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetEmployees(pagination: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Employee/get-employees", pagination);
  }

  Test()
  {
      return this.http.get<ResponseModel>( this.url.apiUrl + "/api/Employee/test");
  }
}
