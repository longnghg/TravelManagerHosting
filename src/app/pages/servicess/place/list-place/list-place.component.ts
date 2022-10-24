import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {

  resPlace: PlaceModel[]
  resPlaceWaiting: PlaceModel[]
  response: ResponseModel
  dataChild: PlaceModel
  typeChild: string
  constructor(private placeService: PlaceService, private configService: ConfigService, private notificationService: NotificationService)
  { }
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "",
    idModal: "gridHotel",
    radioBoxName: "Kho lưu trữ",
  }
  ngOnInit(): void {
    this.init()
    this.initWaiting()
    setTimeout(() => {
      this.columnDefs= [
        { field: 'idPlace', headerName: "Mã số", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'idPlace'},
        { field: 'contractId',headerName: "Mã hợp đồng", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'contractId'},
        { field: 'name',headerName: "Tên địa điểm ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'priceTicket',headerName: "Giá vé", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'priceTicket'},
        { field: 'npm',headerName: "Người Sửa", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày Sửa", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'modifyDate'},
      ];
    }, 200);
  }


  initWaiting(){
    this.placeService.getwaiting().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resPlaceWaiting = this.response.content
        console.log(this.resPlaceWaiting);
      }
      else{
        this.resPlace = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }


  init(){
    this.placeService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resPlace = this.response.content
        console.log(this.resPlace);
      }
      else{
        this.resPlace = null
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

