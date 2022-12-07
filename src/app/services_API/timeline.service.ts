import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class TimelineService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Timeline/list-timeline");
  }

  create(data: any)
  {

    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Timeline/create-timeline", data);
  }

  update(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Timeline/update-timeline", data);
  }

  getTimelineidSchedule(idSchedule: any)
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Timeline/list-timeline-idSchedule?idSchedule="+idSchedule);
  }
  delete(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Timeline/delete-timeline", data);
  }
}
