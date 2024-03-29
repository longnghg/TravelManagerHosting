import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TourookingService } from "src/app/services_API/tourBooking.service"
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { TourBookingModel } from 'src/app/models/tourBooking.model';
import { StatusNotification } from "../../../enums/enum";
import { ListTourBookingComponent } from "../list-tour-booking/list-tour-booking.component";
@Component({
  selector: 'app-item-tour-booking',
  templateUrl: './item-tour-booking.component.html',
  styleUrls: ['./item-tour-booking.component.scss']
})
export class ItemTourBookingComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  @Input() resTourBooking: TourBookingModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  listStatusBooking: any
  isChange: boolean = false
  resTourBookingTmp: TourBookingModel
  isExpires: boolean = false
  constructor(private listTourBookingComponent: ListTourBookingComponent, private configService: ConfigService, private notificationService: NotificationService) { }
  url = this.configService.apiUrl
  ngOnInit(): void {
    this.listStatusBooking = this.configService.listStatusBooking()
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    this.resTourBookingTmp = Object.assign({}, this.resTourBooking)
    if (this.resTourBooking) {
      console.log(this.resTourBooking.customerId);

      // if (this.resTourBooking.status == 1 || this.resTourBooking.status == 2) {
      //   var date = new Date().getTime()
      //   if (this.resTourBooking.lastDate < date) {
      //     this.resTourBooking.status = 4
      //     this.isExpires = true
      //   }
      // }
    }
  }

  inputChange(){
    if (JSON.stringify(this.resTourBooking) != JSON.stringify(this.resTourBookingTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resTourBooking = Object.assign({}, this.resTourBookingTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  close(){
    this.resTourBooking = Object.assign({}, this.resTourBookingTmp)
    this.isChange = false
    this.parentType.emit(null);
  }

  getParentData(type?: string){
    this.parentType.emit(type);
    this.parentData.emit(this.resTourBooking);
  }
}
