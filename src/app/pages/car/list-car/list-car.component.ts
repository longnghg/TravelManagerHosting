import { Component, OnInit } from '@angular/core';
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
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {

  resCar: CarModel[]
  resCarTmp: CarModel[]
  response: ResponseModel
  dataChild: CarModel
  typeChild: string
  isDelete: boolean = false
  auth: AuthenticationModel
  data: any
  pagination = new PaginationModel
  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "restoreCarModalLabel",
      idModalDelete: "deleteCarModalLabel",
      idModal: "gridCar",
      radioBoxName: "Kho lưu trữ",
      disableApprove: true
    }
  ngOnInit(): void {
    this.columnDefs= [
      { field: 'nameDriver', headerName: "Tên người lái", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'nameDriver'},
      { field: 'liscensePlate', headerName: "Biển số xe", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'liscensePlate'},
      { field: 'amountSeat',headerName: "Số lượng chỗ ngồi", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'amountSeat'},
      { field: 'phone',headerName: "Số điện thoại", style: "width: 20%;", searchable: true, searchType: 'number', searchObj: 'phone'},
      { field: 'status',headerName: "Trạng thái", style: "width: 20%;", searchable: true, searchType: 'section', searchObj: 'status', multiple: true, closeOnSelect: false, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatusCar()},
    ];

    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.gridConfig.pageSize = this.pagination.pageSize
    //this.gridConfigWaiting.pageSize = this.pagination.pageSize
   // this.init(this.isDelete)
   this.search(this.pagination, true)
  }

  // init(isDelete){
  //   this.carService.gets(isDelete).subscribe(res =>{
  //     this.response = res
  //     if(this.response.notification.type == StatusNotification.Success){
  //       this.resCar = this.response.content
  //     }
  //     else{
  //       this.resCar = null
  //       this.notificationService.handleAlertObj(res.notification)
  //     }
  //     this.columnDefs= [
  //       { field: 'nameDriver', headerName: "Tên người lái", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'nameDriver'},
  //       { field: 'liscensePlate', headerName: "Biển số xe", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'liscensePlate'},
  //       { field: 'amountSeat',headerName: "Số lượng chỗ ngồi", style: "width: 20%;", searchable: true, searchType: 'number', searchObj: 'amountSeat'},
  //       { field: 'phone',headerName: "Số điện thoại", style: "width: 20%;", searchable: true, searchType: 'number', searchObj: 'phone'},
  //       { field: 'status',headerName: "Trạng thái", style: "width: 10%;", filter: "status", searchable: true, searchType: 'section', searchObj: 'status', multiple: false, closeOnSelect: true, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
  //     ];
  //   }, error => {
  //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
  //     this.notificationService.handleAlert(message, StatusNotification.Error)
  //   })
  // }

  search(e?, isNotShow?){
    if (e) {
      this.carService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resCar = this.response.content
        }
        else{

          this.resCar = []
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

  delete(){
    if (this.data) {
      this.carService.delete(this.data.idCar, this.auth.id).subscribe(res =>{
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
      this.carService.restore(this.data.idCar).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
  }
}
