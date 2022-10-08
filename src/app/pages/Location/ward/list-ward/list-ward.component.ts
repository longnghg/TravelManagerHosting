import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { WardService } from "../../../../services_API/ward.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-list-ward',
  templateUrl: './list-ward.component.html',
  styleUrls: ['./list-ward.component.scss']
})
export class ListWardComponent implements OnInit {

  resWard: LocationModel[]
  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  response: ResponseModel
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

      this.resProvince = this.response.content

      if (this.resProvince) {
        this.resProvince[0].idProvince = this.resProvince[0].id
        this.districtService.GetDistrict(this.resProvince[0]).subscribe(res => {
          this.response = res

          if(this.response.notification.type == "Error")
          {
            this.notificationService.handleAlertObj(res.notification)
          }

          this.resDistrict = this.response.content


          if (this.resDistrict) {
            this.resDistrict[0].idDistrict =  this.resDistrict[0].id
          this.wardService.GetWard(this.resDistrict[0]).subscribe(res => {
            this.response = res

            if(this.response.notification.type == "Error")
            {
              this.notificationService.handleAlertObj(res.notification)
            }

            this.resWard = this.response.content
          })
          }
        })
      }
    })
  }


  changeProvince(value){
    var data = JSON.parse(value)
    if (data) {
      data.IdProvince =  data.Id
      this.districtService.GetDistrict(data).subscribe(res => {
        this.response = res

        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }

        this.resDistrict = this.response.content

        if (this.resDistrict) {
          this.resDistrict.forEach(district => {

            district.idDistrict = district.id
            this.wardService.GetWard(district).subscribe(res => {
              this.response = res

              if(this.response.notification.type == "Error")
              {
                this.notificationService.handleAlertObj(res.notification)
              }

              this.resWard = this.response.content

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

      this.resWard = this.response.content

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
