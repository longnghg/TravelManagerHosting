import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class ProvinceService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetProvince()
  {
      return this.http.get<ResponseModel>( this.url.apiUrl + "/api/Location/get-province");
  }

  InsertProvince(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/insert-province", data);
  }

  UpdateProvince(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/update-province", data);
  }
}
