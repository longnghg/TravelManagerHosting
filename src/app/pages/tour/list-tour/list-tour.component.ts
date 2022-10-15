import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { TourService } from "src/app/services_API/tour.service";
import { TourModel } from 'src/app/models/tour.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';

@Component({
  selector: 'app-list-tour',
  templateUrl: './list-tour.component.html',
  styleUrls: ['./list-tour.component.scss']
})
export class ListTourComponent implements OnInit {
  resTour: TourModel[]
  response: ResponseModel
  child: TourModel
  type: string
  constructor(private tourService: TourService, private notificationService: NotificationService,
    private configService: ConfigService) { }
    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "",
      idModalDelete: "",
      idModal: "gridSchedule",
      radioBox: true,
      radioBoxName: "Kho lưu trữ",
    }
    ngOnInit(): void {

      this.init()
      console.log(this.resTour);

      setTimeout(() => {
        this.columnDefs= [
        { field: 'idTour', headerName: "Mã số", style: "width: 350px;", searchable: true, searchType: 'text', searchObj: 'idTour'},
        { field: 'tourName',headerName: "Tên", style: "width: 400px;", filter: "avatar", searchable: true, searchType: 'text', searchObj: 'tourName'},
        { field: 'thumbsnail',headerName: "Thumbsnail", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'thumbsnail'},
        { field: 'fromPlace',headerName: "Từ", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'toPlace',headerName: "Đến", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'approveStatus',headerName: "ApproveStatus", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'approveStatus'},
        // { field: 'status: string',headerName: "Trạng thái", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'status'},
        // { field: 'createDate: string',headerName: "Ngày tạo", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'createDate'},
        ];
      }, 200);
    }

    init(){
      this.tourService.gets().subscribe(res =>{
        this.response = res
        if(!this.response.notification.type){
          this.resTour = this.response.content
        }
        else{
          this.resTour = null
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }

    // childData(e){
    //   if (e) {
    //     this.dataChild = e
    //   }
    // }
    // childType(e){
    //   if (e) {
    //     this.typeChild = e
    //   }
    // }
  }
