import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { RestaurantModel } from "../models/restaurant.model";
import { NotificationService } from "../services_API/notification.service";
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
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant").subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resRestaurant =  this.response.content
        resolve(this.resRestaurant);
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
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant");
}

getwaiting(){
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-restaurant-waiting");
}


create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-restaurant", data);
}

}
