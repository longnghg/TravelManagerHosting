import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { DistrictService } from 'src/app/services_API/district.service';
import { WardService } from 'src/app/services_API/ward.service';
import { LocationModel } from "../../../models/location.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
// signalr
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

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
  //signalr
  private hubConnectionBuilder!: HubConnection;
  offers : any[] = [];

  constructor(private wardService: WardService, private districtService: DistrictService, private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService){}
  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:44394/travelhub').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(()=> console.log("Da ket noi")).catch(err => console.log("error"));
    this.hubConnectionBuilder.on('Insert', (result: any) => {
      this.provinceService.views().then(response => {
        this.resProvince = response
      })
      console.log("finisheed");
    })

  }

  clickbtn(){
    this.provinceService.GetData().subscribe(res => {
    })
  };

  getDataDelete(data: any){
    this.dataDelete = data
  }

  deleteProvince(){
   if (this.dataDelete) {
    this.provinceService.delete(this.dataDelete).subscribe(res =>{
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
     this.districtService.delete(this.dataDelete).subscribe(res =>{
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
     this.wardService.delete(this.dataDelete).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, "Error")
     })
    }
   }
}
