import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { WardService } from "../../../../services_API/ward.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";


@Component({
  selector: 'app-list-ward',
  templateUrl: './list-ward.component.html',
  styleUrls: ['./list-ward.component.scss']
})
export class ListWardComponent implements OnInit {

  resWard: LocationModel[]
  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  response: ResponsiveModel
  child: LocationModel
  type: string

  constructor(private wardService: WardService, private notificationService: NotificationService,
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
        this.resProvince[0].IdLocation = this.resProvince[0].Id
        this.districtService.GetDistrict(this.resProvince[0]).subscribe(res => {
          this.response = res

          if(this.response.notification.type == "Error")
          {
            this.notificationService.handleAlertObj(res.notification)
          }

          this.resDistrict = JSON.parse(this.response.content)


          if (this.resDistrict) {
            this.resDistrict[0].IdLocation =  this.resDistrict[0].Id
          this.wardService.GetWard(this.resDistrict[0]).subscribe(res => {
            this.response = res

            if(this.response.notification.type == "Error")
            {
              this.notificationService.handleAlertObj(res.notification)
            }

            this.resWard = JSON.parse(this.response.content)
          })
          }
        })
      }
    })
  }


  changeProvince(value){
    var data = JSON.parse(value)
    if (data) {
      data.IdLocation =  data.Id
      this.districtService.GetDistrict(data).subscribe(res => {
        this.response = res

        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }

        this.resDistrict = JSON.parse(this.response.content)

        if (this.resDistrict) {
          this.resDistrict.forEach(district => {

            district.IdLocation = district.Id
            this.wardService.GetWard(district).subscribe(res => {
              this.response = res

              if(this.response.notification.type == "Error")
              {
                this.notificationService.handleAlertObj(res.notification)
              }

              this.resWard = JSON.parse(this.response.content)

            })
          });
        }else{
          this.resWard = null
         }
      })
    }
  }

  changeDistrict(value){
    var data = JSON.parse(value)

   if(data){
    data.IdLocation =  data.Id
    this.wardService.GetWard(data).subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resWard = JSON.parse(this.response.content)

    })
   }
   else{
    this.resWard = null
   }
  }

  childData(data: LocationModel, type: string){
    this.child = data
    this.type = type

  }
}
