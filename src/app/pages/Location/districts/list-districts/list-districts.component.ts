import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";


@Component({
  selector: 'app-list-districts',
  templateUrl: './list-districts.component.html',
  styleUrls: ['./list-districts.component.scss']
})
export class ListDistrictsComponent implements OnInit {

  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  response: ResponsiveModel
  child: LocationModel
  type: string

  constructor(private notificationService: NotificationService,
     private configService: ConfigService, private provinceService: ProvinceService,
     private districtService: DistrictService) { }
  ngOnInit(): void {

    this.provinceService.GetProvince().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)

      }

      this.resProvince = JSON.parse(this.response.content)

      if (this.resProvince) {
        this.resProvince[0].IdProvince = this.resProvince[0].Id
        this.districtService.GetDistrict(this.resProvince[0]).subscribe(res => {
          this.response = res

          if(this.response.notification.type == "Error")
          {
            this.notificationService.handleAlertObj(res.notification)
          }

          this.resDistrict = JSON.parse(this.response.content)
          console.log(this.resDistrict);

        })
      }
    })
  }


  changeProvince(value){
    var data = JSON.parse(value)

    if(data){
     data.IdProvince =  data.Id
     this.districtService.GetDistrict(data).subscribe(res => {
       this.response = res

       if(this.response.notification.type == "Error")
       {
         this.notificationService.handleAlertObj(res.notification)
       }

       this.resDistrict = JSON.parse(this.response.content)
       console.log(this.resDistrict );

     })
    }
    else{
     this.resDistrict = null
    }
  }


  childData(data: LocationModel, type: string){
    this.child = data
    console.log(this.child);

    this.type = type

  }
}
