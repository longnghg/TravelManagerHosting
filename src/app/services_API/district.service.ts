import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class DistrictService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  GetDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/get-district", data);
  }

  InsertDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/insert-district", data);
  }

  UpdateDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Location/update-district", data);
  }
}
