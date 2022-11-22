import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from "../../../services_API/schedule.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ActivatedRoute } from '@angular/router';
import { RoleTitle, StatusApprove, StatusNotification, TypeAction } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from "../../../models/responsiveModels/pagination.model";
@Component({
  selector: 'app-view-tour-schedule',
  templateUrl: './view-tour-schedule.component.html',
  styleUrls: ['./view-tour-schedule.component.scss']
})
export class ViewTourScheduleComponent implements OnInit {
  auth: AuthenticationModel
  resSchedule: ScheduleModel[]
  resScheduleTmp: ScheduleModel[]
  resScheduleWaiting: ScheduleModel[]
  response: ResponseModel
  dataChild: ScheduleModel
  typeChild: string
  type: boolean = false
  data: any
  pagination = new PaginationModel

  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) { }

  idTour = this.activatedRoute.snapshot.paramMap.get('id2')
  public columnDefs: ColDef[]
  public columnDefsWaiting: ColDef[]
  public gridConfig: GridConfig  = {
    idModalRestore: "restoreScheduleModal",
    idModalDelete: "deleteScheduleModal",
    idModal: "gridSchedule1",
    disableRadioBox: false,
    radioBoxName: "Kho lưu trữ",
    disableApprove: true
  }

  public gridConfigWaiting: GridConfig = {
    idModal: "gridSchedule1",
    idModalApprove: "approveScheduleModal",
    disableDelete: true,
    disableRadioBox: true,
    disableCreate: true,
    disableRestore: true
  }
  ngOnInit(): void {
    this.columnDefs= [
      { field: 'idSchedule', headerName: "Mã số", style: "width: 26%;", searchable: true, searchType: 'text', searchObj: 'idSchedule'},
      { field: 'beginDate',headerName: "Ngày bán vé", style: "width: 17%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'beginDate'},
      { field: 'departureDate',headerName: "Ngày khởi hành", style: "width: 17%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'departureDate'},
      // { field: 'beginDate',headerName: "Ngày bắt đầu", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'beginDate'},
      // { field: 'endDate',headerName: "Ngày kết thúc", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'endDate'},
      { field: 'totalCostTourNotService',headerName: "Tổng chi phí", style: "width: 10%;", filter: 'price', searchable: true, searchType: 'price', searchObj: 'TotalCostTour'},
      { field: 'finalPrice',headerName: "Tổng tiền", style: "width: 10%;", searchable: true, filter: 'price', searchType: 'price', searchObj: 'FinalPrice'},
      { field: 'finalPriceHoliday',headerName: "Tổng tiền ngày lễ", style: "width: 10%;", filter: 'price', searchable: true, searchType: 'price', searchObj: 'FinalPriceHoliday'},

      // { field: 'status',headerName: "Trạng thái", style: "width: 180px;", filter: "status", searchable: true, searchType: 'section', searchObj: 'status', multiple: false, closeOnSelect: true, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
    ];

    this.columnDefsWaiting= [
      { field: 'idSchedule', headerName: "Mã số", style: "width: 25%;", searchable: false, searchType: 'text', searchObj: 'idSchedule'},
      { field: 'finalPrice',headerName: "Tổng tiền", style: "width: 10%;", filter: 'price', searchable: false, searchType: 'text', searchObj: 'FinalPrice'},
      { field: 'finalPriceHoliday',headerName: "Tổng tiền ngày lễ", style: "width: 10%;", filter: 'price', searchable: false, searchType: 'text', searchObj: 'FinalPrice'},
      { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 12%;", searchable: false, searchType: 'text', searchObj: 'modifyBy'},
      { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 20%;", filter: 'date', searchable: false, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
      { field: 'typeAction',headerName: "Loại phê duyệt", style: "width: 13%;", searchable: false, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
    ];

    this.gridConfig.pageSize = this.pagination.pageSize
    this.gridConfigWaiting.pageSize = this.pagination.pageSize
    this.auth = JSON.parse(localStorage.getItem("currentUser"))

    this.search(this.pagination)

    this.initWaiting(this.pagination)
  }

  ngOnChanges(): void {}


  init(isDelete){
    this.scheduleService.getsSchedulebyIdTour(this.idTour, isDelete).subscribe(res =>{
      this.response = res;

     if(this.response.notification.type == StatusNotification.Success){
      this.resSchedule = this.response.content
    }


    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

  }

  initWaiting(e){
    this.scheduleService.getsSchedulebyIdTourWaiting(this.idTour, this.auth.id, e.pageIndex, e.pageSize).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resScheduleWaiting = this.response.content

        this.resScheduleWaiting.forEach(schedule => {
          schedule.approveName = StatusApprove[schedule.approve]
          schedule.typeAction = TypeAction[schedule.typeAction]
        });
      }
      else{
        this.resScheduleWaiting = []
      }
      this.gridConfigWaiting.totalResult = this.response.totalResult
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  search(e?){
    if (e) {
      var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
      this.scheduleService.search(Object.assign({}, e,),idTour).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resSchedule = this.response.content
        }
        else{
          this.resSchedule = []
          this.notificationService.handleAlertObj(res.notification)
        }
        this.gridConfig.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  searchWaiting(e?){
    if (e) {
      var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
      this.scheduleService.searchWaiting(Object.assign({}, e,),idTour).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resScheduleWaiting = this.response.content
          this.resScheduleWaiting.forEach(schedule => {
            schedule.approveName = StatusApprove[schedule.approve]
            schedule.typeAction = TypeAction[schedule.typeAction]
          });
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
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
     this.scheduleService.delete(this.data.idSchedule, this.auth.id).subscribe(res =>{
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
      this.scheduleService.restore(this.data.idSchedule, this.auth.id).subscribe(res =>{
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
     this.scheduleService.approve(this.data.idSchedule).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)

     })
    }
   }

   refused(){
    if(this.data){
     this.scheduleService.refused(this.data.idSchedule).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
   }
}

