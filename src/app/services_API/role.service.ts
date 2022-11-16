import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { RoleModel } from "../models/role.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
    providedIn: 'root'
})

export class RoleService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resRole: RoleModel[]
  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Role/list-role?isDelete="+false).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resRole =  this.response.content
          resolve(this.resRole);
        }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })})
    return value

  }
  gets(isDelete: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Role/list-role?isDelete="+isDelete);
  }
  search(data: any)
  {
    console.log(this.configService.apiUrl + "/api/Role/search-role", data);

    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Role/search-role", data);
  }

  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Role/create-role", data);
  }

  update(data: any, idRole: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Role/update-role?idRole="+idRole, data);
  }

  restore(idRole: any, data: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Role/restore-role?idRole="+idRole, data);
  }
  delete(idRole: any){
    return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Role/delete-role?idRole="+idRole);
  }
}
