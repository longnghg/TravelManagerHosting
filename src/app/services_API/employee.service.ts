import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/get-employees");
  }

  search(data){
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/search-employees", data);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/create-employees", data);
  }
}
