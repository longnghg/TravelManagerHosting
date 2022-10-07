import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-list-province',
  templateUrl: './list-province.component.html',
  styleUrls: ['./list-province.component.scss'],
})
export class ListProvinceComponent implements OnInit {

  resProvince: LocationModel[]
  response: ResponseModel
  child: LocationModel
  type: string
  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService){}
  ngOnInit(): void {
    this.provinceService.GetProvince().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      this.resProvince = JSON.parse(this.response.content)
    })
  }

  childData(data: LocationModel, type: string){
    this.child = data
    this.type = type
  }

}
