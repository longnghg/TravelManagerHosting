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
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule");
}

getsSchedulebyIdTour(idTour: any, isDelete: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule-idtour?idTour="+idTour+"&isDelete="+isDelete);
}

getsSchedulebyIdTourWaiting(idTour: any, idUser: any, pageIndex: number, pageSize: number)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Schedule/list-schedule-idtour-waiting?idTour="+idTour+"&idUser="+idUser+"&pageIndex="+pageIndex+"&pageSize="+pageSize);
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/create-schedule", data);
}
update(data: any, idSchedule: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Schedule/update-schedule?idSchedule="+idSchedule, data);
}
delete(idSchedule: any, idUser: any)
{
  return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Schedule/delete-schedule?idSchedule="+idSchedule+"&idUser="+idUser);
}
restore(idSchedule: any, idUser: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Schedule/restore-schedule?idSchedule="+idSchedule+"&idUser="+idUser, {});
}
approve(idSchedule: any){
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Schedule/approve-schedule?idSchedule="+idSchedule, {});
}

refused(idSchedule: any){
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Schedule/refused-schedule?idSchedule="+idSchedule, {});
}

search(data, idTour: any){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/search-schedule?idTour="+idTour, data);
}

searchWaiting(data, idTour: any){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Schedule/search-schedule-waiting?idTour="+idTour, data);
}
}
