import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CarInforService } from '../../../services_API/car-infor.service'
import { CarInforModel } from '../../../models/car-infor.model';
import { ColDef, GridConfig } from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';
import { ScheduleModel } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-list-car-info',
  templateUrl: './list-car-info.component.html',
  styleUrls: ['./list-car-info.component.scss']
})
export class ListCarInfoComponent implements OnInit {
  resCar: CarInforModel[]
  resSchedule: ScheduleModel[]
  response: ResponseModel
  dataChild: CarInforModel
  typeChild: string
  isDelete: boolean = false
  auth: AuthenticationModel
  data: any
  pagination = new PaginationModel
  resCarHaveSchedule:  CarInforModel[]

  constructor(private carService: CarInforService,
    private notificationService: NotificationService,
    private configService: ConfigService) { }
    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
    idModal: "gridCarInfor",
    radioBoxName: "Kho lưu trữ",
    disableApprove: true
  }
  ngOnInit(): void {
    this.init()
    this.columnDefs= [
      { field: 'liscensePlate',headerName: "Biển số xe", style: 'width: 20%', searchable: true, searchType: 'section', multiple: false, closeOnSelect: true, searchObj: 'idCar', bindLabel: "liscensePlate", bindValue: "idCar"},
      { field: 'nameTour', headerName: "Tên tour", style: "width: 20%;", searchable: true, searchType: "text", typeDate: "range"},
      { field: 'departureDate', headerName: "Ngày đi", style: "width: 20%;", filter:"dateTime", searchable: true, typeDate: "range"},
      { field: 'returnDate',headerName: "Ngày về", style: "width: 20%;", filter:"dateTime", searchable: true, typeDate: "range"},
      { field: 'nameEmployee',headerName: "Tên hướng dẫn viên", style: "width: 20%;", searchable: true, searchType: 'text'},
    ];

    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.gridConfig.pageSize = this.pagination.pageSize
    //this.gridConfigWaiting.pageSize = this.pagination.pageSize
   // this.init(this.isDelete)
  //  this.search(this.pagination, true)
  }

  init(){
    this.carService.getsFullCar(false).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resCar = this.response.content
        this.columnDefs[0].listSection = this.resCar
        // this.resCar.forEach(car => {
        //   this.liscensePlateList.push(car.liscensePlate)
        // });
      }

      this.gridConfig.totalResult = this.response.totalResult
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  search(e?, isNotShow?){
    if (e) {
      this.carService.getsListScheduleOfCar(Object.assign({}, e).idCar).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {

            var carInfo = new CarInforModel
            var list = []
            this.resSchedule = this.response.content
            console.log(this.resSchedule);

            this.resSchedule.forEach(schedule => {
              carInfo.liscensePlate = schedule.car.liscensePlate
              carInfo.nameEmployee = schedule.employee.nameEmployee
              carInfo.nameTour = schedule.tour.nameTour
              carInfo.departureDate = schedule.departureDate
              carInfo.returnDate = schedule.returnDate
              list.push(carInfo)
            });
            this.resCarHaveSchedule = list
          console.log(this.resCarHaveSchedule);
        }
        else{

          this.resCarHaveSchedule = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
          //this.resCar = Object.assign([], this.resCarTmp)
        }
        this.gridConfig.totalResult = this.response.totalResult
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

}
