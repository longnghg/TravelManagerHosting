import { Component, OnInit } from '@angular/core';
import { TourBookingModel } from 'src/app/models/tourBooking.model';
import { TourookingService } from "../../../services_API/tourBooking.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
@Component({
  selector: 'app-list-tour-booking',
  templateUrl: './list-tour-booking.component.html',
  styleUrls: ['./list-tour-booking.component.scss']
})
export class ListTourBookingComponent implements OnInit {

  resTourBooking: TourBookingModel[]
  response: ResponseModel
  child: TourBookingModel
  type: string
  constructor(private tourookingService: TourookingService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.tourookingService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == StatusNotification.Error)
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      this.resTourBooking = this.response.content
      console.log(this.resTourBooking);
    })
  }
  public convertDate(unixString): string {
    return this.configService.formatFromUnixTimestampToFullDateView(unixString)

}

}
