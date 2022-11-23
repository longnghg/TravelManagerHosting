import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { TourBookingModel, TourBookingStatisticModel } from 'src/app/models/tourBooking.model';
import { TourookingService } from "../../../services_API/tourBooking.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';

@Component({
  selector: 'app-list-tour-booking',
  templateUrl: './list-tour-booking.component.html',
  styleUrls: ['./list-tour-booking.component.scss']
})
export class ListTourBookingComponent implements OnInit {
  @ViewChild('closeCalled') closeCalled: ElementRef
  resTourBookingStatistic: TourBookingStatisticModel = new TourBookingStatisticModel
  resTourBooking: TourBookingModel[]
  resTourBookingWaiting: TourBookingModel[]
  resStatistic:string
  response: ResponseModel
  child: TourBookingModel
  type: string
  dataChild: TourBookingModel
  typeChild: string
  data: TourBookingModel
  constructor(private tourookingService: TourookingService, private notificationService: NotificationService,
    private configService: ConfigService) { }
    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModal: "gridTourBooking",
      disableApprove: true,
      disableCreate: true,
      disableDelete: true,
      disableRadioBox: true,
      disableRestore: true
    }

  ngOnInit(): void {

    this.initStatistic()
    this.init()
  }
  search(e?){

    if (e) {
      this.tourookingService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resTourBooking = this.response.content
        }
        else{

          this.resTourBooking = this.resTourBooking
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
  init(){
    this.tourookingService.gets().subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resTourBooking = this.response.content
      }
      else{
        this.notificationService.handleAlertObj(res.notification)
      }

      this.columnDefs= [
        { field: 'idTourBooking',headerName: "Mã", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'idTourBooking'},
        { field: 'pincode',headerName: "Pin code", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'pincode'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'email',headerName: "Email", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'email'},
        { field: 'dateBooking',headerName: "Ngày đặt tour", style: "width: 15%;", filter: "date", searchable: true, searchType: 'date', searchObj: 'dateBooking'},
        { field: 'isCalled',headerName: "Gọi xác nhận", style: "width: 15%;", filter: "call",searchable: true, searchType: 'section', searchObj: 'isCalled' , multiple: false, closeOnSelect: true, bindLabel: 'name', bindValue: "id", listSection: this.configService.listCalled()},
      ];
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initStatistic(){
    this.tourookingService.statisticTourBooking().subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resStatistic = this.response.content
        var split = this.resStatistic.split(" && ")

        this.resTourBookingStatistic.paying = split[0].split("tourPaying: ")[1]
        this.resTourBookingStatistic.paid = split[1].split("tourPaid: ")[1]
        this.resTourBookingStatistic.cancel = split[2].split("tourCancel: ")[1]
      }
      else{
        this.notificationService.handleAlertObj(res.notification)
      }
    })
  }


  childData(e){
    this.dataChild = Object.assign({}, e)
  }

  childType(e){
    this.typeChild = e
  }
  getData(data: any){
    this.data = data
  }


  called(){
    this.tourookingService.checkCalled(this.data.idTourBooking).subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.data.isCalled = true
        this.closeCalled.nativeElement.click()
      }
      else{
        this.notificationService.handleAlertObj(res.notification)
      }
    })
  }
}
