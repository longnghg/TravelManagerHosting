import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { PromotionModel } from "../models/promotion.model";
import { NotificationService } from "../services_API/notification.service"

@Injectable({
    providedIn: 'root'
})

export class PromotionService{
  constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
  response: ResponseModel
  resPromotion: PromotionModel[]
  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/gets-promotion").subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resPromotion =  this.response.content
          resolve(this.resPromotion);
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
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/gets-promotion");
  }

  getsWaiting()
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/gets-promotion-waiting");
  }


  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Promotion/create-promotion", data);
  }
}
