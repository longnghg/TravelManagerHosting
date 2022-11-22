import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from 'src/app/models/restaurant.model';
import { RestaurantService } from "src/app/services_API/restaurant.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../../enums/enum";
import { AuthenticationModel } from "../../../../models/authentication.model"
import { PaginationModel } from "../../../../models/responsiveModels/pagination.model";

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.scss']
})
export class ListRestaurantComponent implements OnInit {
  auth: AuthenticationModel
  resRestaurant: RestaurantModel[]
  resRestaurantWaiting: RestaurantModel[]
  resRestaurantTmp: RestaurantModel[]
  response: ResponseModel
  resRestaurantWaitingTmp: RestaurantModel[]
  dataChild: RestaurantModel
  typeChild: string
  data: RestaurantModel
  pagination = new PaginationModel

  constructor(private restaurantService: RestaurantService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

    public columnDefs: ColDef[]
    public columnDefsWaiting: ColDef[]

    public gridConfig: GridConfig = {
      idModalRestore: "restoreRestaurantModal",
      idModalDelete: "deleteRestaurantModal",
      idModal: "gridRestaurant",
      radioBoxName: "Kho lưu trữ",
      disableApprove: true
    }
    public gridConfigWaiting: GridConfig = {
      idModal: "gridRestaurant",
      idModalApprove: "approveRestaurantModal",
      disableDelete: true,
      disableRadioBox: true,
      disableCreate: true,
      disableRestore: true
    }
    ngOnInit(): void {
      this.columnDefsWaiting= [
        { field: 'name',headerName: "Tên khách sạn", style: "width: 30%;", searchable: true, searchType: "text", searchObj: 'name'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 12%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'modifyBy'},
        { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 20%;", filter: 'date', searchable: true, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
        { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 13%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},

      ];

      this.columnDefs= [
        { field: 'name',headerName: "Tên nhà hàng", style: "width: 25%;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 29%;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 12%;", searchable: true, searchType: 'number', searchObj: 'phone'},
        { field: 'comboPrice',headerName: "Giá", style: "width: 21%;",searchable: true, filter: 'price', searchType: 'price', searchObj: 'comboPrice'},
      ];

      this.auth = JSON.parse(localStorage.getItem("currentUser"))
      this.gridConfig.pageSize = this.pagination.pageSize
      this.gridConfigWaiting.pageSize = this.pagination.pageSize
      this.search(this.pagination)
      this.initWaiting(this.pagination)
    }

    initWaiting(e){
      this.restaurantService.getsWaiting(this.auth.id, e.pageIndex, e.pageSize).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){

          this.resRestaurantWaiting = this.response.content

          this.resRestaurantWaiting.forEach(hotel => {
            hotel.approveName = StatusApprove[hotel.approve]
            hotel.typeActionName = TypeAction[hotel.typeAction]
          });
          // this.resRestaurantWaitingTmp = Object.assign([], this.resRestaurantWaiting)
        }else{
          this.resRestaurantWaiting = []
        }
        this.gridConfigWaiting.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

    searchWaiting(e?){
      if (e) {
        this.restaurantService.searchWaiting(Object.assign({}, e)).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resRestaurantWaiting = this.response.content

            this.resRestaurantWaiting.forEach(hotel => {
              hotel.approveName = StatusApprove[hotel.approve]
              hotel.typeActionName = TypeAction[hotel.typeAction]
            });
          }
          else{
            this.resRestaurantWaiting = this.resRestaurantWaitingTmp
            this.notificationService.handleAlertObj(res.notification)
          }

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }
    search(e?){
      if (e) {
        this.restaurantService.search(Object.assign({}, e)).subscribe(res => {
          this.response = res
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resRestaurant = this.response.content
          }
          else{
            // this.resRestaurant = Object.assign([], this.resRestaurantTmp)
            this.resRestaurant = []
            this.notificationService.handleAlertObj(res.notification)
          }
          this.gridConfig.totalResult = this.response.totalResult
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }


    // init(isDelete){
    //   this.restaurantService.gets(isDelete).subscribe(res =>{
    //     this.response = res

    //     if(this.response.notification.type == StatusNotification.Success){
    //       this.resRestaurant = this.response.content
    //     }
    //   }, error => {
    //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //     this.notificationService.handleAlert(message, StatusNotification.Error)
    //   })

    //   this.restaurantService.getsWaiting(this.auth.id).subscribe(res =>{
    //     this.response = res
    //     if(this.response.notification.type == StatusNotification.Success){
    //       this.resRestaurantWaiting = this.response.content

    //       this.resRestaurantWaiting.forEach(restaurant => {
    //         restaurant.approveName = StatusApprove[restaurant.approve]
    //         restaurant.typeActionName = TypeAction[restaurant.typeAction]
    //       });
    //     }
    //   }, error => {
    //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //     this.notificationService.handleAlert(message, StatusNotification.Error)
    //   })
    // }

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
        this.restaurantService.delete(this.data.idRestaurant, this.auth.id).subscribe(res =>{
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
        this.restaurantService.restore(this.data.idRestaurant, this.auth.id).subscribe(res =>{
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
      this.restaurantService.approve(this.data.idRestaurant).subscribe(res =>{
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
      this.restaurantService.refuse(this.data.idRestaurant).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
     }
    }
  }
