import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class DistrictService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetDistrict(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/get-district", data);
  }

  InsertDistrict(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/insert-district", data);
  }

  UpdateDistrict(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/update-district", data);
  }
}
