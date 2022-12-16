import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { StatusNotification } from "../enums/enum";
import { NotificationService } from "../services_API/notification.service";
import { StatisticModel } from "../models/statistic.model";
@Injectable({
  providedIn: 'root'
})

export class StatisticService{
  constructor(private http:HttpClient, private configService:ConfigService, private notificationService: NotificationService){ }
  response: ResponseModel
  async listWeekByYear(year)
  {
    var value = <StatisticModel[]>await new Promise<StatisticModel[]>(resolve => {
      this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Statistic/list-week-by-year?year="+year).subscribe(res => {
        this.response = res
        var result =  this.response.content
          resolve(result);
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })})
    return value
  }

  getStatisticTourbookingFromDateToDate(fromDate, toDate)
  {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Statistic/list-statistic-tourbooking-by-date?fromDate="+fromDate+"&toDate="+toDate);
  }

  getStatisticTourbookingByYear(year)
  {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Statistic/list-statistic-tourbooking-by-year?year="+year);
  }

  getStatisticTourbookingByMonth(month, year)
  {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Statistic/list-statistic-tourbooking-by-month?month="+month+"&year="+year);
  }

  getStatisticTotalTourbookingByDate(fromDate, toDate)
  {
    return this.http.get<ResponseModel>(this.configService.apiUrl + "/api/Statistic/list-statistic-total-tourbooking-by-date?fromDate="+fromDate+"&toDate="+toDate);
  }
}
