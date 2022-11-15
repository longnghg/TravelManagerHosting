import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { CarModel } from "../models/car.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})

export class CarService{
constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
response: ResponseModel
resCar: CarModel[]
async views(fromDate, toDate, idTour)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car?fromDate="+fromDate+"&toDate="+toDate+"&idTour="+idTour).subscribe(res => {
      this.response = res
      this.resCar =  this.response.content
      resolve(this.resCar);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

async views2()
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-car").subscribe(res => {
      this.response = res
      this.resCar =  this.response.content
      resolve(this.resCar);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}
gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-car");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/create-car", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/update-car", data);

}

delete(idCar: number, idUser: number)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/delete-car?idCar="+idCar+"idUser="+idUser);

}

getsCarByDate(fromDate: any, toDate: any, idTour: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car?idTour="+idTour+"&fromDate="+fromDate+"&toDate="+toDate);
}
}
