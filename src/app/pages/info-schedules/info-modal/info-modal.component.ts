import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ConfigService } from "../../../services_API/config.service";
import { NotificationService } from "../../../services_API/notification.service";
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';
import { ScheduleModel, InfoScheduleModel } from 'src/app/models/schedule.model';
import { ColDef, GridConfig } from '../../../components/grid-data/grid-data.component';
import { ScheduleService } from "../../../services_API/schedule.service";
import { StatusNotification } from "../../../enums/enum";
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {
  // @ViewChild('fade') fade: ElementRef
  // @ViewChild('card') card: ElementRef
  @Input() data: any

  resSchedule: ScheduleModel[]
  response: ResponseModel
  resInfoSchedule:  InfoScheduleModel[]
  pagination: PaginationModel = new PaginationModel
  columnDefs: ColDef[]
  gridConfig: GridConfig = {
    disableApprove: true,
    disableCreate: true,
    disableDelete: true,
    disableDetail: true,
    disableLog: true,
    disableRestore: true,
    disableSchedule: true,
    disableRadioBox: true,
  }
  constructor(private scheduleService: ScheduleService, private notificationService: NotificationService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.columnDefs= [
      { field: 'liscensePlate',headerName: "Biển số xe", style: 'width: 10%', searchable: false, searchType: 'section', multiple: false, closeOnSelect: true, searchObj: 'idCar', bindLabel: "liscensePlate", bindValue: "idCar"},
      { field: 'nameEmployee',headerName: "Tên hướng dẫn viên", style: "width: 25%;", searchable: false, searchType: 'text'},
      { field: 'nameTour', headerName: "Tên tour", style: "width: 25%;", searchable: false, searchType: "text", typeDate: "range"},
      { field: 'departureDate', headerName: "Ngày đi", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
      { field: 'returnDate',headerName: "Ngày về", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
    ];
    this.gridConfig.pageSize = this.pagination.pageSize
  }

  ngOnChanges(): void {
    if (this.data) {
      var data = {
        idCar: this.data.idCar,
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      this.initInfo(data)
    }
  }

  initInfo(e){
    var info = Object.assign({}, e)
    this.scheduleService.getsListInfoOfSchedule(info.idCar, info.pageIndex, info.pageSize).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
          var info = new InfoScheduleModel
          var list = []
          this.resSchedule = this.response.content
          this.resSchedule.forEach(schedule => {
            info.liscensePlate = schedule.car.liscensePlate
            info.nameEmployee = schedule.employee.nameEmployee
            info.nameTour = schedule.tour.nameTour
            info.departureDate = schedule.departureDate
            info.returnDate = schedule.returnDate
            list.push(info)
          });
          this.resInfoSchedule = list
      }
      else{
        this.resInfoSchedule = []
      }
      this.gridConfig.totalResult = this.response.totalResult
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  openInfo(){
    document.getElementById("fade").style.display = "block"
    document.getElementById("card").style.display = "block"
    document.getElementById("card").setAttribute("class","card_open card-cus")
  }


  closeInfo(){
    this.resInfoSchedule = []
    document.getElementById("fade").removeAttribute("style")
    document.getElementById("card").setAttribute("class","card_close card-cus")
    setTimeout(() => {
      document.getElementById("card").removeAttribute("style")
    }, 300);

  }
}
