import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { ResponseModel } from "../models/responsiveModels/response.model";
import { VoucherModel } from "../models/voucher.model";
import { NotificationService } from "../services_API/notification.service";
import { StatusNotification } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})
export class VoucherService{
  constructor(private http:HttpClient, private configService:ConfigService,private notificationService: NotificationService){ }
  response: ResponseModel
  resCar: VoucherModel[]

  gets(isdelete: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Voucher/list-voucher?isDelete="+isdelete);
}

create(data: any)
{
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Voucher/create-voucher", data);
}
update(data: any, idVoucher: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Voucher/update-voucher?idVoucher="+idVoucher, data);

}

delete(idVoucher: any)
{
  return this.http.delete<ResponseModel>( this.configService.apiUrl + "/api/Voucher/delete-voucher?idVoucher="+idVoucher);
}

restore(idVoucher: any)
{
  return this.http.put<ResponseModel>( this.configService.apiUrl + "/api/Voucher/restore-voucher?idVoucher="+idVoucher, {});
}

search(data){
  return this.http.post<ResponseModel>( this.configService.apiUrl + "/api/Car/search-car", data);
}

getsCarByDate(fromDate: any, toDate: any, idTour: any)
{
    return this.http.get<ResponseModel>( this.configService.apiUrl + "/api/Car/list-selectbox-car?idTour="+idTour+"&fromDate="+fromDate+"&toDate="+toDate);
}
}

