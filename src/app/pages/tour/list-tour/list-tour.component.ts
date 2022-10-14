import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourService } from "src/app/services_API/tour.service";
import { TourModel } from 'src/app/models/tour.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  resTour: TourModel[]
  response: ResponseModel
  child: TourModel
  type: string
  constructor(private tourService: TourService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.tourService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      this.resTour = this.response.content
      console.log(this.resTour);
    })
  }
  childData(data: TourModel, type: string){
    this.child = data
    this.type = type
  }
}
