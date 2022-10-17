import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { DistrictService } from 'src/app/services_API/district.service';
import { WardService } from 'src/app/services_API/ward.service';
import { LocationModel } from "../../../models/location.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss'],
})
export class ListLocationComponent implements OnInit {
  dataChild: LocationModel
  typeChild: string
  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  resWard: LocationModel[]
  dataDelete: LocationModel
  response: ResponseModel
  child: LocationModel
  type: string
  public columnDefsProvince: ColDef[]
  public columnDefsDistrict: ColDef[]
  public columnDefsWard: ColDef[]
  public gridConfig: GridConfig

  constructor(private wardService: WardService, private districtService: DistrictService, private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService){}
  ngOnInit(): void {
  }

  getDataDelete(data: any){
    this.dataDelete = data
  }

  deleteProvince(){
   if (this.dataDelete) {
    this.provinceService.delete(this.dataDelete.idProvince).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
   }
  }

  deleteDistrict(){
    if (this.dataDelete) {
     this.districtService.delete(this.dataDelete.idDistrict).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, "Error")
     })
    }
   }

   deleteWard(){
    if (this.dataDelete) {
     this.wardService.delete(this.dataDelete.idWard).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, "Error")
     })
    }
   }
}
