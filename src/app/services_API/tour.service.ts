import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { TourModel } from "../models/tour.model";
import { NotificationService } from "../services_API/notification.service";
@Injectable({
  providedIn: 'root'
})

export class TourService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  resTour: TourModel[]
  async views()
  {
    var value = <any>await new Promise<any>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Tour/gets-tour").subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resTour =  this.response.content
          resolve(this.resTour);
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
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Tour/list-tour?isDelete="+isDelete);
  }
  getwaiting(idUser: any){
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Tour/list-tour-waiting?idUser="+idUser);
  }
  getTour(idTour: string)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Tour/detail-tour?idTour="+idTour);
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Tour/create-tour", data);
  }
  update(data: any, idTour: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Tour/update-tour?idTour="+idTour, data);
  }

  delete(idTour: any, idUser: any)
  {
    return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Tour/delete-tour?idTour="+idTour+"&idUser="+idUser);
  }
  restore(idTour: any, idUser: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Tour/restore-tour?idTour="+idTour+"&idUser="+idUser, {});
  }

  approve(idTour: any){
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Tour/approve-tour?idTour="+idTour, {});
  }

  refused(idTour: any){
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Tour/refused-tour?idTour="+idTour, {});
  }

  ratingTour(rating: any, idTour: any)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Tour/update-rating-tour?rating="+rating+"&idTour="+idTour, {});
  }

  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Tour/search-tour", data);
  }

  searchWaiting(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Tour/search-tour-waiting", data);
  }
}

