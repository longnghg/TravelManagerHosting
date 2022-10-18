import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from 'src/app/models/restaurant.model';
import { RestaurantService } from "src/app/services_API/restaurant.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss']
})
export class ListRestaurantComponent implements OnInit {
  resRestaurant: RestaurantModel[]
  resRestaurantWaiting: RestaurantModel[]
  response: ResponseModel
  dataChild: ResponseModel
  typeChild: string
  constructor(private restaurantService: RestaurantService, private configService: ConfigService, private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "",
    idModal: "gridRestaurant",
    radioBox: true,
    radioBoxName: "Kho lưu trữ",
  }
  ngOnInit(): void {
    this.init()
    this.initWaiting();
    setTimeout(() => {

      this.columnDefs= [
        { field: 'idRestaurant', headerName: "Mã số", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'idRestaurant'},
        { field: 'contractId',headerName: "Mã hợp đồng", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'contractId'},
        { field: 'name',headerName: "Tên nhà hàng", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'phone'},
      ];
    }, 200);
  }

  initWaiting(){
    this.restaurantService.getwaiting().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resRestaurantWaiting = this.response.content
      }
      else{
        this.resRestaurantWaiting = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  init(){
    this.restaurantService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resRestaurant = this.response.content
      }
      else{
        this.resRestaurant = null
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
