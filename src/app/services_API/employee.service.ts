import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets(isDelete: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/gets-employee", {isDelete});
  }

  search(data){
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/search-employee", data);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/create-employee", data);
  }

  update(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/update-employee", data);
  }
  delete(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Employee/delete-employee", data);
  }
}
