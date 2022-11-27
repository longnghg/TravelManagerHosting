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
async views(fromDate, toDate)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car?fromDate="+fromDate+"&toDate="+toDate).subscribe(res => {
      this.response = res
      this.resCar =  this.response.content
      resolve(this.resCar);
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, "Error")
  })})
  return value

}

async viewsUpdate(fromDate, toDate, idSchedule)
{
  var value = <any>await new Promise<any>(resolve => {
    this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car-update?fromDate="+fromDate+"&toDate="+toDate+"&idSchedule="+idSchedule).subscribe(res => {
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
gets(isdelete: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-car?isDelete="+isdelete);
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/create-car", data);
}
update(data: any, idCar: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Car/update-car?idCar="+idCar, data);

}

delete(idCar: any, idUser: any)
{
  return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Car/delete-car?idCar="+idCar+"&idUser="+idUser);
}

restore(idCar: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Car/restore-car?idCar="+idCar, {});
}

search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/search-car", data);
}

getsCarByDate(fromDate: any, toDate: any, idTour: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car?idTour="+idTour+"&fromDate="+fromDate+"&toDate="+toDate);
}
}
