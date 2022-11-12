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
  idTour = this.activatedRoute.snapshot.paramMap.get('id2')
  isDelete: boolean = false
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) { }

  public columnDefs: ColDef[]
  public columnDefsWaiting: ColDef[]
  public gridConfig: GridConfig = {
    // idModalRestore: "restoreScheduleModal",
    // idModalDelete: "deleteScheduleModal",
    // idModal: "gridSchedule1",
    // disableRadioBox: false,
    // radioBoxName: "Kho lưu trữ",
    // disableApprove: true
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
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    if(this.auth.roleId == RoleTitle.Admin || this.auth.roleId == RoleTitle.TourManager)
    {
      this.gridConfig = {
        idModalRestore: "restoreScheduleModal",
        idModalDelete: "deleteScheduleModal",
        idModal: "gridSchedule1",
        disableRadioBox: false,
        radioBoxName: "Kho lưu trữ",
        disableApprove: true
      }
    }
    else{
      this.gridConfig = {
        idModalRestore: "restoreScheduleModal",
         idModalDelete: "deleteScheduleModal",
        idModal: "gridSchedule1",
        disableRadioBox: true,
         disableCreate: true,
         disableDelete: true,
         disableRestore: true,
        disableApprove: true
      }
    }
    if (this.isDelete) {
      this.gridConfig.isRestore = this.isDelete
      this.init(this.isDelete)
    }
    else{
      this.init(this.isDelete)
    }
  }

  ngOnChanges(): void {}


  init(isDelete){
    var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
    this.scheduleService.getsSchedulebyIdTour(idTour, isDelete).subscribe(res =>{
      this.response = res;

     if(this.response.notification.type == StatusNotification.Success){
      this.resSchedule = this.response.content
    }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

    setTimeout(() => {
      this.columnDefs= [
        { field: 'idSchedule', headerName: "Mã số", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'idSchedule'},
        { field: 'beginDate',headerName: "Ngày bán vé", style: "width: 15%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'beginDate'},
        { field: 'departureDate',headerName: "Ngày khởi hành", style: "width: 15%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'departureDate'},
        // { field: 'beginDate',headerName: "Ngày bắt đầu", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'beginDate'},
        // { field: 'endDate',headerName: "Ngày kết thúc", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'endDate'},
        { field: 'totalCostTourNotService',headerName: "Tổng chi phí", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'TotalCostTour'},
        { field: 'finalPrice',headerName: "Tổng tiền", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'FinalPrice'},
        { field: 'finalPriceHoliday',headerName: "Tổng tiền ngày lễ", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'FinalPriceHoliday'},

        // { field: 'status',headerName: "Trạng thái", style: "width: 180px;", filter: "status", searchable: true, searchType: 'section', searchObj: 'status', multiple: false, closeOnSelect: true, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];


      this.columnDefsWaiting= [
        { field: 'idSchedule', headerName: "Mã số", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'idSchedule'},
        { field: 'beginDate',headerName: "Ngày bắt đầu", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'beginDate'},
        { field: 'endDate',headerName: "Ngày kết thúc", filter: "date", style: "width: 15%;", searchable: true, searchType: 'date', searchObj: 'endDate'},
        { field: 'finalPrice',headerName: "Tổng tiền", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'FinalPrice'},
        { field: 'finalPriceHoliday',headerName: "Tổng tiền ngày lễ", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'FinalPriceHoliday'},
        { field: 'typeAction',headerName: "Loại phê duyệt", style: "width: 10%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
        { field: 'approveName',headerName: "Trạng thái phê duyệt", style: "width: 10%;"}
      ];
    }, 200);

    var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
    this.scheduleService.getsSchedulebyIdTourWaiting(idTour).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resScheduleWaiting = this.response.content
        this.resScheduleWaiting.forEach(schedule => {
          schedule.approveName = StatusApprove[schedule.approve]
          schedule.typeAction = TypeAction[schedule.typeAction]
        });
      }
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
          this.resSchedule = this.resScheduleTmp
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

