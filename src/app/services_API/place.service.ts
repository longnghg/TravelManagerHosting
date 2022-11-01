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
getPlace(idPlace: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-place?idPlace="+idPlace);
}
getwaiting(){
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-place-waiting?idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-place", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/update-place", data);
}

delete(idPlace: any)
{
  console.log("idPlace");
  console.log(idPlace); // kiểm tra xem nó nhận đc ko , để lẹ hơn thì tui kiểm tra luôn đường dẫn api
 var b = this.configService.apiUrl + "api/service/delete-hotel?idPlace="+idPlace+"&idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1";
 console.log(b);

  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/service/delete-hotel?idPlace="+idPlace+"&idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1");
}

}
