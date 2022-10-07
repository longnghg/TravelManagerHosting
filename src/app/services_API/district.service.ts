import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class DistrictService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/get-district", data);
  }

  InsertDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/insert-district", data);
  }

  UpdateDistrict(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/update-district", data);
  }
}
