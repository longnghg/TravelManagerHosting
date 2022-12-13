import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";

@Injectable({
    providedIn: 'root'
})

export class CustomerService{
  constructor(private http:HttpClient, private configService:ConfigService){ }

  gets()
  {
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/customer/list-customer");
  }
  create(data: any)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/customer/create-customer", data);
  }
  search(data)
  {
    return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/customer/search-customer",data);
  }

  block(idCustomer: string, isBlock: boolean)
  {
    return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/customer/block-customer?idCustomer="+idCustomer+"&isBlock="+isBlock,{});
  }
}
