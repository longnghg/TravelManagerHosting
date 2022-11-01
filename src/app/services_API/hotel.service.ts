import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { HotelModel } from "../models/hotel.model";
import { NotificationService } from "../services_API/notification.service";
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
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel").subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
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

gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel");
}
getHotel(idHotel: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-hotel?idHotel="+idHotel);
}
getsWaiting()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-hotel-waiting?idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1");
}
create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-hotel", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/update-hotel", data);
}
delete(idHotel: any)
{
  console.log("idHotel");
  console.log(idHotel); // kiểm tra xem nó nhận đc ko , để lẹ hơn thì tui kiểm tra luôn đường dẫn api
 var b = this.configService.apiUrl + "api/service/delete-hotel?idHotel="+idHotel+"&idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1";
 console.log(b);

  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/service/delete-hotel?idHotel="+idHotel+"&idUser=b07a87d7-c378-4e6c-9af8-447a3ee852b1");
}
}
