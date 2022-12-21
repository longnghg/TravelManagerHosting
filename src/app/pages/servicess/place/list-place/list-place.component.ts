import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../../enums/enum";
import { AuthenticationModel } from "../../../../models/authentication.model"
import { PaginationModel } from "../../../../models/responsiveModels/pagination.model";

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.scss']
})
export class ListPlaceComponent implements OnInit {
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  @ViewChild('closeModalLoadApprove') closeModalLoadApprove: ElementRef;
  isLoading: boolean
  auth: AuthenticationModel
  resPlace: PlaceModel[]
  resPlaceWaiting: PlaceModel[]
  respPlaceWaitingTmp: PlaceModel[]
  respPlaceTmp: PlaceModel[]
  response: ResponseModel
  dataChild: PlaceModel
  typeChild: string
  isDelete: boolean = false
  data: PlaceModel
  pagination = new PaginationModel

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
      this.columnDefs= [
        { field: 'name',headerName: "Tên điểm tham quan", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 12%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'priceTicket',headerName: "Giá vé", style: "width: 15%;", filter:"price", searchable: true, searchType: 'price', searchObj: 'priceTicket'},

      ];

      this.columnDefsWaiting= [
        { field: 'name',headerName: "Tên điểm tham quan ", style: "width: 30%;", searchable: true, searchType: "text", searchObj: 'name'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 12%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 20%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
        { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 13%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},

      ];

     this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.gridConfig.pageSize = this.pagination.pageSize
    this.gridConfigWaiting.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
    this.initWaiting(this.pagination)
    }
    searchWaiting(e?){
      if (e) {
        this.placeService.searchWaiting(Object.assign({}, e)).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resPlaceWaiting = this.response.content

            this.resPlaceWaiting.forEach(hotel => {
              hotel.approveName = StatusApprove[hotel.approve]
              hotel.typeActionName = TypeAction[hotel.typeAction]
            });
          }
          else{
            this.resPlaceWaiting = this.respPlaceWaitingTmp
            this.notificationService.handleAlertObj(res.notification)
          }

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }
    initWaiting(e){
      this.placeService.getsWaiting(this.auth.id, e.pageIndex, e.pageSize).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resPlaceWaiting = this.response.content
          this.resPlaceWaiting.forEach(place => {
            place.approveName = StatusApprove[place.approve]
            place.typeActionName = TypeAction[place.typeAction]
          });
        }else{
          this.resPlaceWaiting = []
        }
        this.gridConfigWaiting.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

    childData(e){
      this.dataChild = Object.assign({}, e)
    }

    search(e?, isNotShow?){
      if (e) {
        this.placeService.search(Object.assign({}, e)).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resPlace = this.response.content
          }
          else{
            // this.resPlace = Object.assign([], this.respPlaceTmp )
            this.resPlace = []
            if (!isNotShow) {
              this.notificationService.handleAlertObj(res.notification)
            }
          }
          this.gridConfig.totalResult = this.response.totalResult
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
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
         this.isLoading = false
         this.gridConfig.pageIndex = 1
        var data = {
          isDelete: this.gridConfig.isRestore,
          pageIndex: this.gridConfig.pageIndex,
          pageSize: this.gridConfig.pageSize
        }
        this.search(data)
        this.gridConfigWaiting.pageIndex = 1
        var dataWaiting = {
          pageIndex: this.gridConfigWaiting.pageIndex,
          pageSize: this.gridConfigWaiting.pageSize
        }
        this.initWaiting(dataWaiting)
         setTimeout(() => {
          this.closeModalLoadDelete.nativeElement.click()
          this.closeModalLoadApprove.nativeElement.click()
         }, 100);
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, StatusNotification.Error)
         this.isLoading = false
       })
      }
    }

    restore(){
      if (this.data) {
        this.placeService.restore(this.data.idPlace, this.auth.id).subscribe(res =>{
         this.response = res
         this.notificationService.handleAlertObj(res.notification)
         this.isLoading = false

         this.gridConfig.pageIndex = 1
         var data = {
           isDelete: true,
           pageIndex: this.gridConfig.pageIndex,
           pageSize: this.gridConfig.pageSize
         }
         this.search(data)
         this.gridConfigWaiting.pageIndex = 1
         var dataWaiting = {
           pageIndex: this.gridConfigWaiting.pageIndex,
           pageSize: this.gridConfigWaiting.pageSize
         }
         this.initWaiting(dataWaiting)

         setTimeout(() => {
          this.closeModalLoadRestore.nativeElement.click()
         }, 100);
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, StatusNotification.Error)
         this.isLoading = false
       })
      }
    }

    approve(){
     if(this.data){
      this.placeService.approve(this.data.idPlace).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isLoading = false

        this.gridConfig.pageIndex = 1
      var data = {
        isDelete: this.gridConfig.isRestore,
        pageIndex: this.gridConfig.pageIndex,
        pageSize: this.gridConfig.pageSize
      }
      this.search(data, true)
      this.gridConfigWaiting.pageIndex = 1
      var dataWaiting = {
        pageIndex: this.gridConfigWaiting.pageIndex,
        pageSize: this.gridConfigWaiting.pageSize
      }
      this.initWaiting(dataWaiting)

        setTimeout(() => {
          this.closeModalLoadApprove.nativeElement.click()
         }, 100);
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
     }
    }

    refuse(){
     if(this.data){
      this.placeService.refuse(this.data.idPlace).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isLoading = false

        this.gridConfig.pageIndex = 1
        var data = {
          isDelete: this.gridConfig.isRestore,
          pageIndex: this.gridConfig.pageIndex,
          pageSize: this.gridConfig.pageSize
        }
        this.search(data)
        this.gridConfigWaiting.pageIndex = 1
        var dataWaiting = {
          pageIndex: this.gridConfigWaiting.pageIndex,
          pageSize: this.gridConfigWaiting.pageSize
        }
        this.initWaiting(dataWaiting)

        setTimeout(() => {
          this.closeModalLoadApprove.nativeElement.click()
         }, 100);
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
     }
    }
  }
