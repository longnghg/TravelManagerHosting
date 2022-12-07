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
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/promotion/list-promotion?isDelete="+false+"&pageIndex="+1+"&pageSize="+10).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resPromotion =  this.response.content
          this.resPromotion.forEach(promotion => {
            promotion.fromDateDisplay = this.configService.formatFromUnixTimestampToFullDate(promotion.fromDate)
            promotion.toDateDisplay = this.configService.formatFromUnixTimestampToFullDate(promotion.toDate)
          });
          resolve(this.resPromotion);
        }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })})
    return value

  }

  gets(isDelete)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/list-promotion?isDelete="+isDelete);
  }
  // getPromotion(idPromotion: number)
  // {
  //   return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/get-promotion?idPromotion="+idPromotion);
  // }
  getsWaiting(idUser: any, pageIndex: number, pageSize: number)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/list-promotion-waiting?idUser="+idUser+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Promotion/create-promotion", data);
  }
  update(data: any, idPromotion: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Promotion/update-promotion?idPromotion="+idPromotion, data);
  }
  delete(idPromotion: any, idUser: any)
  {
    return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Promotion/delete-promotion?idPromotion="+idPromotion+"&idUser="+idUser);
  }

  approve(idPromotion:number)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Promotion/approve-promotion?idPromotion="+idPromotion, {});
  }

  refuse(idPromotion: number)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Promotion/refuse-promotion?idPromotion="+idPromotion, {});
  }
  restore(idPromotion: number, idUser: string)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Promotion/restore-promotion?idPromotion="+idPromotion+"&idUser="+idUser, {});
  }
  statistic()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Promotion/statistic");

  }
  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Promotion/search-promotion", data);
  }
}
