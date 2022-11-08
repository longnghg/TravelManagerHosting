import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { HotelModel } from "../models/hotel.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class HotelService{
constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

response: ResponseModel
resHotel: HotelModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel?isDelete="+false).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resHotel =  this.response.content
        resolve(this.resHotel);
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

gets(isDelete)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel?isDelete="+isDelete);
}
getHotel(idHotel: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-hotel?idHotel="+idHotel);
}
getsWaiting(idUser: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel-waiting?idUser="+idUser);
}
create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-hotel", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/update-hotel", data);
}
delete(idHotel: any, idUser: any)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/service/delete-hotel?idHotel="+idHotel+"&idUser="+idUser);
}

approve(idHotel: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/approve-hotel?idHotel="+idHotel);
}

refuse(idHotel: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/refuse-hotel?idHotel="+idHotel);
}
restore(idHotel: string, idUser: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/restore-hotel?idHotel="+idHotel+"&idUser="+idUser);
}
search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-hotel", data);
}

}
