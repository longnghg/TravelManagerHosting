import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { PlaceModel } from "../models/place.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
  providedIn: 'root'
})

export class PlaceService{
constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

response: ResponseModel
resPlace: PlaceModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-place").subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resPlace =  this.response.content
        resolve(this.resPlace);
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

gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-place");
}

getwaiting(){
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-place-waiting");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-place", data);
}



}
