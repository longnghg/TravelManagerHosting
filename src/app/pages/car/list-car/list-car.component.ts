import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CarService } from '../../../services_API/car.service'
import { CarModel } from '../../../models/car.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {

  resCar: CarModel[]
  response: ResponseModel
  dataChild: CarModel
  typeChild: string

  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "",
      idModalDelete: "",
      idModal: "gridSchedule",
      radioBoxName: "Kho lưu trữ",
    }
  ngOnInit(): void {
    this.init()
    console.log(this.resCar);

    setTimeout(() => {
      this.columnDefs= [
        { field: 'idCar', headerName: "Mã số", style: "width: 340px;", searchable: true, searchType: 'text', searchObj: 'idCar'},
        { field: 'nameDriver', headerName: "Tên người lái", style: "width: 270px;", searchable: true, searchType: 'text', searchObj: 'nameDriver'},
        { field: 'liscensePlate', headerName: "Biển số xe", style: "width: 200px;", searchable: true, searchType: 'number', searchObj: 'liscensePlate'},
        { field: 'amountSeat',headerName: "Số lượng chỗ ngồi", style: "width: 200px;", searchable: true, searchType: 'number', searchObj: 'amountSeat'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 200px;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'status',headerName: "Trạng thái", style: "width: 180px;", filter: "status", searchable: true, searchType: 'section', searchObj: 'status', multiple: false, closeOnSelect: true, bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];
    }, 200);

  }

  init(){
    this.carService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resCar = this.response.content
      }
      else{
        this.resCar = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
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
