import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from "../../../services_API/schedule.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss']
})
export class ListScheduleComponent implements OnInit {
  resSchedule: ScheduleModel[]
  response: ResponseModel
  dataChild: ScheduleModel
  typeChild: string
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "",
    idModal: "gridSchedule",
    radioBoxName: "Kho lưu trữ",
  }
  ngOnInit(): void {

    this.init()

    setTimeout(() => {
      this.columnDefs= [
        // { field: 'idSchedule', headerName: "Mã số", style: "width: 340px;", searchable: true, searchType: 'text', searchObj: 'idSchedule'},
        { field: 'nameTour', headerName: "Tên tour", style: "width: 300px;", searchable: true, searchType: 'text', searchObj: 'nameTour'},
        { field: 'nameDriver', headerName: "Tên người lái", style: "width: 270px;", searchable: true, searchType: 'text', searchObj: 'nameDriver'},
        { field: 'liscensePlate', headerName: "Biển số xe", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'liscensePlate'},
        { field: 'departureDate',headerName: "Ngày khởi hành", filter: "date", style: "width: 200px;", searchable: true, searchType: 'date', searchObj: 'departureDate'},
        { field: 'beginDate',headerName: "Ngày bắt đầu", filter: "date", style: "width: 200px;", searchable: true, searchType: 'date', searchObj: 'beginDate'},
        { field: 'endDate',headerName: "Ngày kết thúc", filter: "date", style: "width: 200px;", searchable: true, searchType: 'date', searchObj: 'endDate'},
        { field: 'timePromotion',headerName: "Thời gian khuyến mãi", filter: "date", style: "width: 180px;", searchable: true, searchType: "date", searchObj: 'timePromotion'},
        { field: 'minCapacity',headerName: "Tối thiểu", style: "width: 130px;", searchable: true, searchType: 'number', searchObj: 'minCapacity'},
        { field: 'maxCapacity',headerName: "Tối đa", style: "width: 130px;", searchable: true, searchType: 'number', searchObj: 'maxCapacity'},
        { field: 'quantityAdult',headerName: "Số lượng người lớn", style: "width: 130px;", searchable: true, searchType: 'number', searchObj: 'quantityAdult'},
        { field: 'quantityChild',headerName: "Số lượng trẻ em", style: "width: 130px;", searchable: true, searchType: 'number', searchObj: 'quantityChild'},
        { field: 'quantityBaby',headerName: "Số lượng em bé", style: "width: 130px;", searchable: true, searchType: 'number', searchObj: 'quantityBaby'},
        { field: 'finalPrice',headerName: "Tổng tiền", style: "width: 150px;", searchable: true, filter: 'price', searchType: 'price', searchObj: 'finalPrice'},
        { field: 'status',headerName: "Trạng thái", style: "width: 180px;", filter: "status", searchable: true, searchType: 'section', searchObj: 'status', multiple: false, closeOnSelect: true, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];
    }, 200);
  }

  init(){
    this.scheduleService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resSchedule = this.response.content
      }
      else{
        this.resSchedule = null
        this.notificationService.handleAlertObj(res.notification)
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

}
