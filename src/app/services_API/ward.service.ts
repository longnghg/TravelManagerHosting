import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class WardService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetWard(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/get-ward", data);
  }

  InsertWard(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/insert-ward", data);
  }

  UpdateWard(data: any)
  {
      return this.http.post<ResponseModel>( this.url.apiUrl + "/api/Location/update-ward", data);
  }
}
