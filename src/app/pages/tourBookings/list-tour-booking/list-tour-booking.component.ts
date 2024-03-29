import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { TourBookingModel, TourBookingStatisticModel } from 'src/app/models/tourBooking.model';
import { TourookingService } from "../../../services_API/tourBooking.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ProvinceService } from "../../../services_API/province.service";
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { PaginationModel } from "../../../models/responsiveModels/pagination.model";
import { LocationModel } from "../../../models/location.model";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
@Component({
  selector: 'app-list-tour-booking',
  templateUrl: './list-tour-booking.component.html',
  styleUrls: ['./list-tour-booking.component.scss']
})
export class ListTourBookingComponent implements OnInit {
  @ViewChild('closeCalled') closeCalled: ElementRef
  @ViewChild('closeStatus') closeStatus: ElementRef
  resTourBookingStatistic: TourBookingStatisticModel = new TourBookingStatisticModel
  resTourBooking: TourBookingModel[]
  resTourBookingWaiting: TourBookingModel[]
  resStatistic:string
  response: ResponseModel
  child: TourBookingModel
  dataChild: TourBookingModel
  typeChild: string
  data: TourBookingModel
  pagination = new PaginationModel
  resProvince: LocationModel
  isloading: boolean = false
  constructor(private provinceService: ProvinceService,
    private tourookingService: TourookingService, private notificationService: NotificationService,
    private configService: ConfigService, private navbarComponent: NavbarComponent) { }
    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModal: "gridTourBooking",
      disableApprove: true,
      disableCreate: true,
      disableDelete: true,
      disableRadioBox: true,
      disableRestore: true,
      disableLog: true,
      disableSchedule: true
    }

  ngOnInit(): void {
    this.provinceService.views().then(response => {
      this.resProvince = response
      this.columnDefs= [
        // { field: 'idTourBooking',headerName: "Mã", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'idTourBooking'},
        { field: 'pincode',headerName: "Pin code", style: "width: 11%;", searchable: true, searchType: 'text', searchObj: 'pincode'},
        { field: 'bookingNo',headerName: "booking No", style: "width: 13%;", searchable: true, searchType: 'text', searchObj: 'pincode'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 8%;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'dateBooking',headerName: "Ngày đặt tour", style: "width: 16%;", filter: "dateTime" , searchable: true, searchType: 'dateTime', typeDate:"range", searchObj: 'dateBooking'},
        { field: 'paymentId',headerName: "Phương thức thanh toán", style: "width: 11%;", filter: "statusPayment",searchable: true, searchType: 'section', searchObj: 'payment' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listPayment()},
        { field: 'toPlace',headerName: "Tên thành phố/tỉnh", style: "width: 11%;"  , searchable: true, searchType: 'section', searchObj: 'toPlace', multiple: false, closeOnSelect: true, bindLabel: 'nameProvince', bindValue: "nameProvince", listSection: this.resProvince},
        { field: 'isCalled',headerName: "Gọi xác nhận", style: "width: 9%;", filter: "call",searchable: true, searchType: 'section', searchObj: 'isCalled' , multiple: false, closeOnSelect: true, bindLabel: 'name', bindValue: "id", listSection: this.configService.listCalled()},
        { field: 'status',headerName: "Trạng thái", style: "width: 15%;", filter: "statusTourBooking",searchable: true, searchType: 'section', searchObj: 'status' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listStatusBooking()},
      ];
    })

    this.initStatistic()
    this.gridConfig.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
    this.loadMessageSignalR()
  }

  loadMessageSignalR(){
    this.navbarComponent.hubConnectionBuilder.on('Message', (result: any) => {
      this.search(this.pagination, true)
    })
}


  search(e, isNotShow?){
    if (e) {
      this.pagination.pageSize = e.pageSize
      this.tourookingService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res

        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resTourBooking = this.response.content

        }
        else{
          this.resTourBooking = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
        }
        this.gridConfig.totalResult = this.response.totalResult

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
    console.log(this.data);

  }


  called(){
    this.tourookingService.checkCalled(this.data.idTourBooking).subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.data.isCalled = true
        this.ngOnInit()
        this.closeCalled.nativeElement.click()
      }
      this.notificationService.handleAlertObj(res.notification)
    })
  }


  updateStatus(){
    this.tourookingService.updateStatus(this.data.idTourBooking, this.data.status).subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.ngOnInit()
        this.closeStatus.nativeElement.click()
      }
      this.notificationService.handleAlertObj(res.notification)
    })
  }

  doPayment(){
    this.isloading = true
    this.tourookingService.doPayment(this.data.idTourBooking, this.data.customerId, this.data.phone).subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.ngOnInit()
        this.closeStatus.nativeElement.click()
        this.data.status = 3
      }
      this.isloading = false
      this.notificationService.handleAlertObj(res.notification)
    })
  }
}
