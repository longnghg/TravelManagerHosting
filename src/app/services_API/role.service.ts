import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { RoleModel, RoleTitle } from "../models/role.model";
import { NotificationService } from "../services_API/notification.service";

@Injectable({
    providedIn: 'root'
})

export class RoleService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resRole: RoleModel[]
  async gets()
  {
    var value = <RoleModel[]>await new Promise<RoleModel[]>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Role/gets-role").subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resRole =  this.response.content
          resolve(this.resRole);
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })})
    return value

  }

  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Role/create-role", data);
  }
}
