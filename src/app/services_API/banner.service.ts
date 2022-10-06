import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponsiveModel } from "../models/responsiveModels/responsive.model";

@Injectable({
    providedIn: 'root'
})

export class BannerService{
  constructor(private http:HttpClient, private url:ConfigService){ }

    UploadBanner(data: any)
  {
      return this.http.post<ResponsiveModel>(this.url.apiUrl + "/api/news/UploadBanner",data);
  }
}
