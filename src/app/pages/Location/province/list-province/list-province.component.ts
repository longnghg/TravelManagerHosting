import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";

// signalr
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

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

  //signalr 
  private hubConnectionBuilder!: HubConnection;
  offers : any[] = [];

  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService){}
  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:44394/travelhub').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(()=> console.log("Da ket noi")).catch(err => console.log("error"));
    this.hubConnectionBuilder.on('SendOffersToUser', (result: any) => {
      this.offers.push(result);
    })

    this.provinceService.GetProvince().subscribe(res => {

      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resProvince = this.response.content

      console.log("finisheed");

    })
  }

  childData(data: LocationModel, type: string){
    this.child = data
    this.type = type
  }
  clickbtn(){
    this.provinceService.GetData().subscribe(res => {
    })
  };
}
