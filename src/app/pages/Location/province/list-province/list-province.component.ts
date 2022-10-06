import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";

@Component({
  selector: 'app-list-province',
  templateUrl: './list-province.component.html',
  styleUrls: ['./list-province.component.scss']
})
export class ListProvinceComponent implements OnInit {

  resProvince: LocationModel[]
  responsive: ResponsiveModel

  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService) { }
  ngOnInit(): void {
    this.provinceService.GetProvince().subscribe(res => {
      this.responsive = res

      if(this.responsive.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resProvince = JSON.parse(this.responsive.content)
      for (let index = 0; index < this.resProvince.length; index++) {

      }
        console.log(this.resProvince);
    })
  }

  PageItem(){
    document.location.assign(this.configService.clientUrl + "/#/item-province")
  }

}
