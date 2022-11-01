import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
import { AuthenticationModel } from "../../../../models/authentication.model"

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {
  auth: AuthenticationModel
  resPlace: PlaceModel[]
  resPlaceWaiting: PlaceModel[]
  response: ResponseModel
  dataChild: PlaceModel
  typeChild: string
  data:PlaceModel
  constructor(private placeService: PlaceService, private configService: ConfigService, private notificationService: NotificationService)
  { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "deletePlaceModal",
    idModal: "gridPlace",
    radioBoxName: "Kho lưu trữ",
  }
  public gridConfigWaiting: GridConfig = {
    idModal: "gridPlace",
    disableDelete: true,
    disableRadioBox: true,
    disableCreate: true,
    disableRestore: true
  }
  ngOnInit(): void {
    this.init()
  }


  initWaiting(){
    this.placeService.getwaiting().subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resPlaceWaiting = this.response.content
      }
      else if(this.resPlace == null){
        // this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  init(){
    this.placeService.gets().subscribe(res =>{
      this.response = res
      if(this.response.notification.type){
        this.resPlace = this.response.content
      }
      else if(this.resPlace == null){
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

    setTimeout(() => {
      this.columnDefs= [
        { field: 'name',headerName: "Tên địa điểm ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'priceTicket',headerName: "Giá vé", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'priceTicket'},
        { field: 'modifyBy',headerName: "Người Sửa", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày Sửa", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'modifyDate'},
      ];
    }, 200);

    this.placeService.getwaiting().subscribe(res =>{
      this.response = res
      if(this.response.notification.type){

        this.resPlaceWaiting = this.response.content
      }
      else{
        this.resPlace = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })


}

childData(e){
  if (e) {
    this.dataChild = Object.assign({}, e)
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


   this.placeService.delete(this.data.idPlace).subscribe(res =>{
     this.response = res
     this.notificationService.handleAlertObj(res.notification)
   }, error => {
     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
     this.notificationService.handleAlert(message, "Error")

   })
  }
 }
}
