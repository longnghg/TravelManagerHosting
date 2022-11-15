import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class CostTourService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/CostTour/list-cost-tour");
  }

  getCostbyidSchedule(idSchedule: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/CostTour/detail-cost-tour-idSchedule?idSchedule="+idSchedule);
  }

  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/CostTour/create-cost-tour", data);
  }

  update(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/CostTour/update-cost-tour", data);
  }
}
