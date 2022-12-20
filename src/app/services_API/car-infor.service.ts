import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { CarInforModel } from "../models/car-infor.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
import { CarModel } from "../models/car.model";
@Injectable({
  providedIn: 'root'
})
export class CarInforService {
  constructor(private http: HttpClient,
    private configService: ConfigService,
    private notificationService: NotificationService) { }
  response: ResponseModel
  resCar: CarModel[]

  getsListScheduleOfCar(idCar: string) {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Car/list-schedule-of-car?idCar="+idCar+"&pageIndex=1&pageSize=5");
  }

  getsFullCar(isdelete: any)
  {
      return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-car?isDelete="+isdelete);
  }
}

