import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
  providedIn: 'root'
})

export class TourookingService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/list-tourbooking");
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/create-tourBooking", data);
  }

  statisticTourBooking()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/statistic-tourbooking");

  }

  checkCalled(idTourBooking: string){
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/check-called?idTourBooking="+idTourBooking);
  }
  search(data){
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/TourBooking/search-TourBooking", data);
  }


}
