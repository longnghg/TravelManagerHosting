import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourService } from "src/app/services_API/tour.service";
import { TourModel } from 'src/app/models/tour.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
// signalr
import { HubConnection } from '@microsoft/signalr';

@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  resTour: TourModel[]
  resTourWaiting: TourModel[]
  response: ResponseModel
  dataChild: TourModel
  data: TourModel
  type: boolean
  typeChild: string
  private hubConnectionBuilder: HubConnection


  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "restoreTourModal",
    idModalDelete: "deleteTourModal",
    idModal: "gridTour",
    radioBox: true,
    radioBoxName: "Kho lưu trữ",
  }

  constructor(
    private configService: ConfigService,
     private tourService: TourService,
      private notificationService: NotificationService) {}

    ngOnInit(): void {

      this.init(this.type)
      this.initWaiting()
      this.hubConnectionBuilder = this.configService.signIR(this.init())
      this.hubConnectionBuilder.start();
      this.hubConnectionBuilder.on('Init', (result: any) => {
        this.init(this.type)
        this.initWaiting()
      })
    }

    initWaiting(){
      this.tourService.getwaiting().subscribe(res =>{
        this.response = res
        if(!this.response.notification.type){
          this.resTourWaiting = this.response.content
        }
        else{
          this.resTourWaiting = null
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }

    init(e?){
      this.tourService.gets().subscribe(res =>{
        this.response = res
        if(!this.response.notification.type){
          this.resTour = this.response.content
          console.log(this.resTour);
        }
        else{
          this.resTour = null
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })




      setTimeout(() => {
        this.columnDefs= [
        { field: 'idTour', headerName: "Mã số", style: "width: 350px;", searchable: true, searchType: 'text', searchObj: 'idTour'},
        { field: 'nameTour',headerName: "Tên", style: "width: 400px;", searchable: true, searchType: 'text', searchObj: 'tourName'},
        { field: 'thumbsnail',headerName: "Thumbsnail", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'thumbsnail'},
        { field: 'fromPlace',headerName: "Từ", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'toPlace',headerName: "Đến", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'rating',headerName: "Số sao", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'rating'},
        // { field: 'status: string',headerName: "Trạng thái", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'status'},
        // { field: 'createDate: string',headerName: "Ngày tạo", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'createDate'},
        ];
      }, 200);
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
       this.tourService.delete(this.data.idTour).subscribe(res =>{
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
        this.tourService.restore(this.data.idTour).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
    }
  }
