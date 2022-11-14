import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { RestaurantModel } from "../models/restaurant.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class RestaurantService{
constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }

response: ResponseModel
resRestaurant: RestaurantModel[]
async views()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant?isDelete="+false).subscribe(res => {
      this.response = res
      this.resRestaurant =  this.response.content
        resolve(this.resRestaurant);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

gets(isDelete)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant?isDelete="+isDelete);
}
getRestaurant(idRestaurant: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/get-restaurant?idRestaurant="+idRestaurant);
}
getsWaiting(idUser: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant-waiting?idUser="+idUser);
}
create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-restaurant", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/update-restaurant", data);
}
delete(idRestaurant: any, idUser: any)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/service/delete-restaurant?idRestaurant="+idRestaurant+"&idUser="+idUser);
}

approve(idRestaurant: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/approve-restaurant?idRestaurant="+idRestaurant);
}

refuse(idRestaurant: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/refuse-restaurant?idRestaurant="+idRestaurant);
}
restore(idRestaurant: string, idUser: string)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/restore-restaurant?idRestaurant="+idRestaurant+"&idUser="+idUser);
}
search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-Restaurant", data);
}
searchWaiting(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/search-restaurant-waiting", data);
}
}
