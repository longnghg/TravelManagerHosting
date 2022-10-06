import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class ProvinceService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetProvince()
  {
      return this.http.get<ResponsiveModel>( this.url.apiUrl + "/api/Location/get-province");
  }

  InsertProvince(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/insert-province", data);
  }

  UpdateProvince(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/update-province", data);
  }
}
