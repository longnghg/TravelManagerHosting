import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../../enums/enum";
import { AuthenticationModel } from "../../../../models/authentication.model"

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})
export class ListHotelComponent implements OnInit {
  auth: AuthenticationModel
  resHotel: HotelModel[]
  resHotelWaiting: HotelModel[]
  resHotelTmp: HotelModel[]
  resHotelWaitingTmp: HotelModel[]
  response: ResponseModel
  dataChild: HotelModel
  typeChild: string
  isDelete: boolean = false
  data: HotelModel
  constructor(private hotelService: HotelService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public columnDefsWaiting: ColDef[]

  public gridConfig: GridConfig = {
    idModalRestore: "restoreHotelModal",
    idModalDelete: "deleteHotelModal",
    idModal: "gridHotel",
    radioBoxName: "Kho lưu trữ",
    disableApprove: true
  }
  public gridConfigWaiting: GridConfig = {
    idModal: "gridHotel",
    idModalApprove: "approveHotelModal",
    disableDelete: true,
    disableRadioBox: true,
    disableCreate: true,
    disableRestore: true
  }
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.init(this.isDelete);
    this.initWaiting()
  }

  search(e?){
    if (e) {
      this.hotelService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resHotel = this.response.content
        }
        else{
          this.resHotel = Object.assign([], this.resHotelTmp)
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  searchWaiting(e?){
    if (e) {
      this.hotelService.searchWaiting(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resHotelWaiting = this.response.content

          this.resHotelWaiting.forEach(hotel => {
            hotel.approveName = StatusApprove[hotel.approve]
            hotel.typeActionName = TypeAction[hotel.typeAction]
          });
        }
        else{
          this.resHotelWaiting = this.resHotelWaitingTmp
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  init(isDelete){
    this.hotelService.gets(isDelete).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resHotel = this.response.content
        this.resHotelTmp = Object.assign([], this.resHotel)

      }else{
        this.notificationService.handleAlertObj(res.notification)
      }

      this.columnDefs= [
        { field: 'name',headerName: "Tên khách sạn", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 15%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'star',headerName: "Số sao", style: "width: 15%;", filter: "star",searchable: true, searchType: 'section', searchObj: 'star' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.list5Star()},
      ];
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })



  }

  initWaiting(){
    this.hotelService.getsWaiting(this.auth.id).subscribe(res =>{
      this.response = res
      console.log(res);

      if(this.response.notification.type == StatusNotification.Success){

        this.resHotelWaiting = this.response.content

        this.resHotelWaiting.forEach(hotel => {
          hotel.approveName = StatusApprove[hotel.approve]
          hotel.typeActionName = TypeAction[hotel.typeAction]
        });

        this.resHotelWaitingTmp = Object.assign([], this.resHotelWaiting)

      }else{
        this.notificationService.handleAlertObj(res.notification)
      }

      this.columnDefsWaiting= [
        { field: 'name',headerName: "Tên khách sạn", style: "width: 30%;", searchable: true, searchType: "text", searchObj: 'name'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 12%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 20%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
        { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 13%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},

      ];
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
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

  delete(){
    if (this.data) {
      this.hotelService.delete(this.data.idHotel, this.auth.id).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
  }

  restore(){
    if (this.data) {
      this.hotelService.restore(this.data.idHotel, this.auth.id).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
  }

  approve(){
   if(this.data){
    this.hotelService.approve(this.data.idHotel).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)

    })
   }
  }

  refuse(){
   if(this.data){
    this.hotelService.refuse(this.data.idHotel).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
   }
  }
}
