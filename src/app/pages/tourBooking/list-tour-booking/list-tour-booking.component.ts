import { Component, OnInit } from '@angular/core';
import { TourBookingModel, TourBookingStatisticModel } from 'src/app/models/tourBooking.model';
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
  resTourBookingStatistic: TourBookingStatisticModel = new TourBookingStatisticModel
  resTourBooking: TourBookingModel[]
  resStatistic:string
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

    })

    this.tourookingService.statisticTourBooking().subscribe (res => {
      this.response = res

      this.resStatistic = this.response.content
      var split = this.resStatistic.split(" && ")

      this.resTourBookingStatistic.paying = split[0].split("tourPaying: ")[1]
      this.resTourBookingStatistic.paid = split[1].split("tourPaid: ")[1]
      this.resTourBookingStatistic.cancel = split[2].split("tourCancel: ")[1]
      console.log(this.resTourBookingStatistic);

      if(this.response.notification.type == StatusNotification.Error)
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      console.log(this.resStatistic);
    })
  }
  public convertDate(unixString): string {
    return this.configService.formatFromUnixTimestampToFullDateView(unixString)

}

}
