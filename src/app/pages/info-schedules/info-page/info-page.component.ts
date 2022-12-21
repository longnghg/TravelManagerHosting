import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CarService } from '../../../services_API/car.service'
import { CarModel } from '../../../models/car.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  isLoading: boolean
  // resCar: CarModel[]
  // resCarTmp: CarModel[]
  response: ResponseModel
  dataChild: CarModel
  typeChild: string
  isDelete: boolean = false
  auth: AuthenticationModel
  data: any
  pagination = new PaginationModel

  public columnDefs1: ColDef[]
  public columnDefs2: ColDef[]

  public gridConfig1: GridConfig = {
    disableApprove: true,
    disableCreate: true,
    disableDelete: true,
    disableDetail: true,
    disableLog: true,
    disableRestore: true,
    disableSchedule: true,
    disableRadioBox: true,
    style: "height: 650px;"
  }

  public gridConfig2: GridConfig = {
    disableApprove: true,
    disableCreate: true,
    disableDelete: true,
    disableDetail: true,
    disableLog: true,
    disableRestore: true,
    disableSchedule: true,
    disableRadioBox: true,
    style: "height: 650px;"
  }

  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.columnDefs1= [
      { field: 'liscensePlate',headerName: "Biển số xe", style: 'width: 25%', searchable: false, searchType: 'section', multiple: false, closeOnSelect: true, searchObj: 'idCar', bindLabel: "liscensePlate", bindValue: "idCar"},
      { field: 'nameTour', headerName: "Tên tour", style: "width: 25%;", searchable: false, searchType: "text", typeDate: "range"},
      { field: 'departureDate', headerName: "Ngày đi", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
      { field: 'returnDate',headerName: "Ngày về", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
    ];

    this.columnDefs2= [
      { field: 'nameEmployee',headerName: "Tên hướng dẫn viên", style: "width: 25%;", searchable: false, searchType: 'text'},
      { field: 'nameTour', headerName: "Tên tour", style: "width: 25%;", searchable: false, searchType: "text", typeDate: "range"},
      { field: 'departureDate', headerName: "Ngày đi", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
      { field: 'returnDate',headerName: "Ngày về", style: "width: 17%;", filter:"dateTime", searchType: "dateTime", searchable: false, typeDate: "range"},
    ];
    this.gridConfig1.pageSize = this.pagination.pageSize
    this.gridConfig2.pageSize = this.pagination.pageSize

    this.initCar()
    this.initEmployee()
  }


  initCar(){

  }

  initEmployee(){

  }

}
