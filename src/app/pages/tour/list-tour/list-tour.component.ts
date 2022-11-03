import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourService } from "src/app/services_API/tour.service";
import { TourModel } from 'src/app/models/tour.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ColDef2, GridConfig2} from '../../../components/grid2-data/grid2-data.component';
// signalr
import { HubConnection } from '@microsoft/signalr';
import { StatusApprove, StatusNotification, TypeAction } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  resTour: TourModel[]
  resTourWaiting: TourModel[]
  restourTmp: TourModel[]
  response: ResponseModel
  dataChild: TourModel
  data: TourModel
  type: boolean = false
  typeChild: string
  auth: AuthenticationModel
  private hubConnectionBuilder: HubConnection


  public columnDefs: ColDef[]
  public columnDefsWaiting: ColDef[]

  public gridConfig2: GridConfig2 = {
    idModalRestore: "restoreTourModal",
    idModalDelete: "deleteTourModal",
    // isRestore: false,
    route: "item-tour",
    alias: "idTour",
    disableRadioBox: false,
    radioBoxName: "Kho lưu trữ",
    disableApprove: true

  }
  public gridConfigApprove: GridConfig2 = {
    idModalApprove: "approveTourModel",
    route: "item-tour",
    alias: "idTour",
    disableRadioBox: true,
    disableCreate: true,
    disableDelete: true,
    disableRestore: true
  }
  constructor(
    private configService: ConfigService,
     private tourService: TourService,
      private notificationService: NotificationService) {}

    ngOnInit(): void {
      this.auth = JSON.parse(localStorage.getItem("currentUser"))
      if (history.state.isDelete) {
        this.gridConfig2.isRestore = history.state.isDelete
        this.init(history.state.isDelete)
      }
      else{
        this.init(this.type)
      }


      // this.hubConnectionBuilder = this.configService.signIR()
      // this.hubConnectionBuilder.start();
      // this.hubConnectionBuilder.on('Init', (result: any) => {
      //   this.init(this.type)
      // })

      // this.initWaiting(this.type)
      // this.hubConnectionBuilder = this.configService.signIR()
      // this.hubConnectionBuilder.start();
      // this.hubConnectionBuilder.on('InitWaiting', (result: any) => {
      //   this.initWaiting(this.type)
      // })

    }

    init(e?){
      this.type = e
      this.tourService.gets(this.type).subscribe(res =>{
        this.response = res
        if(this.response.notification.type  == StatusNotification.Success){
          this.resTour = this.response.content
          this.restourTmp = Object.assign([], this.resTour)
        }
        else{
          this.resTour = null

        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })

      setTimeout(() => {
        this.columnDefs= [
        { field: 'idTour', headerName: "Mã số", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'idTour'},
        { field: 'nameTour',headerName: "Tên", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'tourName'},
        { field: 'thumbnail',headerName: "Thumbnail", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'thumbnail'},
        { field: 'toPlace',headerName: "Đến", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'rating',headerName: "Số sao", style: "width: 10%;", searchable: true, searchType: 'text', searchObj: 'rating'},
        // { field: 'status: string',headerName: "Trạng thái", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'status'},
        // { field: 'createDate: string',headerName: "Ngày tạo", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'createDate'},
        ];

        this.columnDefsWaiting= [
          { field: 'idTour', headerName: "Mã số", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'idTour'},
          { field: 'nameTour',headerName: "Tên", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'tourName'},
          { field: 'thumbnail',headerName: "Thumbnail", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'thumbnail'},
          { field: 'toPlace',headerName: "Đến", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'address'},
          { field: 'approveName',headerName: "Trạng thái phê duyệt", style: "width: 15%;", searchable: true, searchType: 'section', searchObj: 'approve' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listApprove()},
          { field: 'typeAction',headerName: "Loại phê duyệt", style: "width: 10%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
       ];
      }, 200);

      this.tourService.getwaiting(this.auth.id).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resTourWaiting = this.response.content
          this.resTourWaiting.forEach(tour => {
            tour.approveName = StatusApprove[tour.approveStatus]
            tour.typeAction = TypeAction[tour.typeAction]
          });
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    childData(e){
      if (e) {
        this.dataChild = e
      }
    }
    childType(e){
      if (e) {
        this.typeChild = e
      }
    }
     getData(data: any){
      this.data = data
    }

    delete(){
      if (this.data) {
       this.tourService.delete(this.data.idTour, this.auth.id).subscribe(res =>{
         this.response = res
         this.notificationService.handleAlertObj(res.notification)
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, "Error")
       })
      }
     }

     restore(){
      if (this.data) {
        this.tourService.restore(this.data.idTour, this.auth.id).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
    }
  }
