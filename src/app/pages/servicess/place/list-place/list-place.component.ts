import { Component, OnInit } from '@angular/core';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../../enums/enum";
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
  isDelete: boolean = false
  data: PlaceModel
  constructor(private placeService: PlaceService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

    public columnDefs: ColDef[]
    public columnDefsWaiting: ColDef[]

    public gridConfig: GridConfig = {
      idModalRestore: "restorePlaceModal",
      idModalDelete: "deletePlaceModal",
      idModal: "gridPlace",
      radioBoxName: "Kho lưu trữ",
      disableApprove: true
    }
    public gridConfigWaiting: GridConfig = {
      idModal: "gridPlace",
      idModalApprove: "approvePlaceModal",
      disableDelete: true,
      disableRadioBox: true,
      disableCreate: true,
      disableRestore: true
    }
    ngOnInit(): void {
      this.auth = JSON.parse(localStorage.getItem("currentUser"))
      this.init(this.isDelete);
    }

    init(isDelete){
      this.placeService.gets(isDelete).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resPlace = this.response.content
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })

      setTimeout(() => {

        this.columnDefs= [
          { field: 'name',headerName: "Tên điểm tham quan", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'name'},
          { field: 'address',headerName: "Địa chỉ", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'address'},
          { field: 'phone',headerName: "Số điện thoại", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'phone'},
          { field: 'priceTicket',headerName: "Giá vé", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'priceTicket'},

        ];

        this.columnDefsWaiting= [
          { field: 'name',headerName: "Tên điểm tham quan", style: "width: 20%;", searchable: true, searchType: "text", searchObj: 'name'},
          { field: 'address',headerName: "Địa chỉ", style: "width: 25%;", searchable: true, searchType: 'text', searchObj: 'address'},
          { field: 'phone',headerName: "Số điện thoại", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'phone'},
          { field: 'approveName',headerName: "Trạng thái phê duyệt", style: "width: 15%;", searchable: true, searchType: 'section', searchObj: 'approve' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listApprove()},
          { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 15%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
        ];
      }, 200);

      this.placeService.getsWaiting(this.auth.id).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){

          this.resPlaceWaiting = this.response.content

          this.resPlaceWaiting.forEach(place => {
            place.approveName = StatusApprove[place.approve]
            place.typeActionName = TypeAction[place.typeAction]
          });
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
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
        this.placeService.delete(this.data.idPlace, this.auth.id).subscribe(res =>{
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
        this.placeService.restore(this.data.idPlace, this.auth.id).subscribe(res =>{
         this.response = res
         this.notificationService.handleAlertObj(res.notification)
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, StatusNotification.Error)
       })
      }
    }

    approve(){
     if(this.data){
      this.placeService.approve(this.data.idPlace).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)

      })
     }
    }

    refuse(){
     if(this.data){
      this.placeService.refuse(this.data.idPlace).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
     }
    }
  }
