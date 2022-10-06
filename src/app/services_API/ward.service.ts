import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class WardService{
  constructor(private http:HttpClient, private url:ConfigService){ }

  GetWard(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/get-ward", data);
  }

  InsertWard(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/insert-ward", data);
  }

  UpdateWard(data: any)
  {
      return this.http.post<ResponsiveModel>( this.url.apiUrl + "/api/Location/update-ward", data);
  }
}
