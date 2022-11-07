import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class ScheduleService{
constructor(private http:HttpClient, private configService:ConfigService){ }

gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule");
}

getsSchedulebyIdTour(idTour: any, isDelete: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule-idtour?idTour="+idTour+"&isDelete="+isDelete);
}

getsSchedulebyIdTourWaiting(idTour: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/gets-schedule-idtour-waiting?idTour="+idTour);
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/create-schedule", data);
}
update(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/update-schedule", data);
}
delete(idSchedule: any, idUser: any)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/delete-schedule?idSchedule="+idSchedule+"&idUser="+idUser);
}
restore(idSchedule: any, idUser: any)
{
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/restore-schedule?idSchedule="+idSchedule+"&idUser="+idUser);
}
approve(idSchedule: any){
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/approve-schedule?idSchedule="+idSchedule);
}

refused(idSchedule: any){
  return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/refused-schedule?idSchedule="+idSchedule);
}
}
