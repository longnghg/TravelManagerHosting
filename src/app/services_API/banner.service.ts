import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class BannerService{
  constructor(private http:HttpClient, private url:ConfigService){ }

    UploadBanner(data: any)
  {
      return this.http.post<ResponseModel>(this.url.apiUrl + "/api/news/UploadBanner",data);
  }
}
