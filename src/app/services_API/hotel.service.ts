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
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-hotel?isDelete="+false).subscribe(res => {
      this.response = res
      this.resHotel =  this.response.content
      resolve(this.resHotel);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

gets(isDelete)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-hotel?isDelete="+isDelete);
}
getHotel(idHotel: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-hotel?idHotel="+idHotel);
}
getsWaiting(idUser: any, pageIndex: number, pageSize: number)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/list-hotel-waiting?idUser="+idUser+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
}
create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-hotel", data);
}
update(data: any, idHotel: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/update-hotel?idHotel="+idHotel, data);
}
delete(idHotel: any, idUser: any)
{
  return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/service/delete-hotel?idHotel="+idHotel+"&idUser="+idUser);
}

approve(idHotel: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/approve-hotel?idHotel="+idHotel, {});
}

refuse(idHotel: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/refuse-hotel?idHotel="+idHotel, {});
}
restore(idHotel: string, idUser: string)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Service/restore-hotel?idHotel="+idHotel+"&idUser="+idUser, {});
}
search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-hotel", data);
}

searchWaiting(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-hotel-waiting", data);
}
}
