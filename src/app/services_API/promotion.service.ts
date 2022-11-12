import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { PromotionModel } from "../models/promotion.model";
import { NotificationService } from "../services_API/notification.service"
import { StatusNotification } from "../enums/enum";

@Injectable({
    providedIn: 'root'
})

export class PromotionService{
  constructor(private http:HttpClient,
    private configService:ConfigService,
    private notificationService: NotificationService){ }
  response: ResponseModel
  resPromotion: PromotionModel[]
  async views()
  {
    this.resPromotion.forEach(promotion => {
      promotion.fromDateDisplay = this.configService.formatFromUnixTimestampToFullDate(promotion.fromDate)
      promotion.toDateDisplay = this.configService.formatFromUnixTimestampToFullDate(promotion.toDate)
    });

    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-promotion?isDelete="+false).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
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

  gets(isDelete)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/gets-promotion?isDelete="+isDelete);
  }
  getPromotion(idPromotion: number)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/get-promotion?idPromotion="+idPromotion);
  }
  getsWaiting(idUser: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/gets-promotion-waiting?idUser="+idUser);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Promotion/create-promotion", data);
  }
  update(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Promotion/update-promotion", data);
  }
  delete(idPromotion: any, idUser: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/delete-promotion?idPromotion="+idPromotion+"&idUser="+idUser);
  }

  approve(idPromotion:number)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/approve-promotion?idPromotion="+idPromotion);
  }

  refuse(idPromotion: number)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/refuse-protion?idPromotion="+idPromotion);
  }
  restore(idPromotion: number, idUser: string)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/restore-promotion?idPromotion="+idPromotion+"&idUser="+idUser);
  }
}
