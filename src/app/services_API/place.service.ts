import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
@Injectable({
  providedIn: 'root'
})

export class PlaceService{
constructor(private http:HttpClient, private configService:ConfigService){ }

gets()
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Service/gets-place");
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Service/create-place", data);
}

}
