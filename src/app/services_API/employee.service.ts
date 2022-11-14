import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { EmployeeModel } from "../models/employee.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

  response: ResponseModel
  resEmployee: EmployeeModel[]
  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/gets-employee?isDelete="+false).subscribe(res => {
        this.response = res
        this.resEmployee =  this.response.content
        resolve(this.resEmployee);
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })})
    return value

  }
  gets(isDelete: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/gets-employee?isDelete="+isDelete);
  }

  get(idEmployee: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/get-employee?idEmployee="+idEmployee);
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
  delete(idEmployee: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/delete-employee?idEmployee="+idEmployee);
  }
  restore(idEmployee: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Employee/restore-employee?idEmployee="+idEmployee);
  }
}
