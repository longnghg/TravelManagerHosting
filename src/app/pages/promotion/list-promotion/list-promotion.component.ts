import { Component, OnInit } from '@angular/core';
import { PromotionModel , PromotionStatisticModel } from 'src/app/models/promotion.model';
import { PromotionService } from "../../../services_API/promotion.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../enums/enum";
import { AuthenticationModel } from "../../../models/authentication.model";
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit {
  auth: AuthenticationModel
  resPromotion: PromotionModel[]
  resPromotionStatistic: PromotionStatisticModel = new PromotionStatisticModel
  resPromotionWaiting: PromotionModel[]
  response: ResponseModel
  dataChild: PromotionModel
  resStatistic:string
  typeChild: string
  isDelete: boolean = false
  data: PromotionModel
  pagination = new PaginationModel
  constructor(private promotionService: PromotionService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

    public columnDefs: ColDef[]
    public columnDefsWaiting: ColDef[]

    public gridConfig: GridConfig = {
      idModalRestore: "restorePromotionModal",
      idModalDelete: "deletePromotionModal",
      idModal: "gridPromotion",
      radioBoxName: "Kho lưu trữ",
      disableApprove: true
    }
    public gridConfigWaiting: GridConfig = {
      idModal: "gridPromotion",
      idModalApprove: "approvePromotionModal",
      disableDelete: true,
      disableRadioBox: true,
      disableCreate: true,
      disableRestore: true
    }
  ngOnInit(): void {
    this.columnDefs= [
      { field: 'value',headerName: "Giá trị giảm giá", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'value'},
      { field: 'fromDate',headerName: "Từ ngày", style: "width: 30%;", searchable: true, searchType: 'dateTime', searchObj: 'fromDate',filter: 'dateTime'},
      { field: 'toDate',headerName: "Đến ngày", style: "width: 30%;", searchable: true, searchType: 'dateTime', searchObj: 'toDate', filter: 'dateTime'},
    ];

    this.columnDefsWaiting= [
      { field: 'value',headerName: "Giá trị giảm giá", style: "width: 20%;"},
      { field: 'fromDate',headerName: "Từ ngày", style: "width: 15%;", filter: 'dateTime'},
      { field: 'toDate',headerName: "Đến ngày", style: "width: 15%;",filter: 'dateTime'},
      { field: 'modifyBy',headerName: "Người yêu cầu", style: "width: 15%;", searchable: false, searchType: 'text', searchObj: 'modifyBy'},
      { field: 'modifyDate',headerName: "Ngày yêu cầu", style: "width: 15%;", filter: 'date', searchable: false, searchType: 'date', typeDate: 'range', searchObj: 'modifyDate'},
      { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 10%;"},
    ];

    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.gridConfig.pageSize = this.pagination.pageSize
    this.gridConfigWaiting.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
    this.initWaiting(this.pagination);
    this.initStatistic()
  }

  initWaiting(e){
    // this.promotionService.gets(isDelete).subscribe(res =>{
    //   this.response = res
    //   if(this.response.notification.type == StatusNotification.Success){
    //     this.resPromotion = this.response.content
    //   }
    // }, error => {
    //   var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //   this.notificationService.handleAlert(message, StatusNotification.Error)
    // })
    this.promotionService.getsWaiting(this.auth.id, e.pageIndex, e.pageSize).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resPromotionWaiting = this.response.content
        console.log(this.resPromotionWaiting);

        this.resPromotionWaiting.forEach(promotion => {
          promotion.approveName = StatusApprove[promotion.approve]
          promotion.typeActionName = TypeAction[promotion.typeAction]
        });
      }else{
        this.resPromotionWaiting = []
      }
      this.gridConfigWaiting.totalResult = this.response.totalResult
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  search(e?, isNotShow?){
    if (e) {
      this.promotionService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resPromotion = this.response.content
        }
        else{

          this.resPromotion = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
          //this.resPromotion = Object.assign([], this.resCarTmp)
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
  initStatistic(){
    this.promotionService.statistic().subscribe (res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resStatistic = this.response.content
        var split = this.resStatistic.split(" && ")

        this.resPromotionStatistic.promotion = split[0].split("promotion: ")[1]
        this.resPromotionStatistic.promotionOfMonth = split[1].split("promotionOfMonth: ")[1]
        this.resPromotionStatistic.promotionOfTime = split[2].split("promotionOfTime: ")[1]
        this.resPromotionStatistic.unPromotionOfTime = split[3].split("unPromotionOfTime: ")[1]


      }
      else{
        this.notificationService.handleAlertObj(res.notification)
      }
    })
  }
  delete(){
    if (this.data) {

      if(this.data.idPromotion > 1){
        this.promotionService.delete(this.data.idPromotion, this.auth.id).subscribe(res =>{
            this.response = res
            this.gridConfig.pageIndex = 1
            this.ngOnInit()
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        this.notificationService.handleAlert("Không thể xóa !", StatusNotification.Warning)
      }

    }
  }

  restore(){
    if (this.data) {
      this.promotionService.restore(this.data.idPromotion, this.auth.id).subscribe(res =>{
       this.response = res

       this.gridConfig.pageIndex = 1
        var data = {
          isDelete: true,
          pageIndex: this.gridConfig.pageIndex,
          pageSize: this.gridConfig.pageSize
        }
        this.search(data)

       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
  }

  approve(){
   if(this.data){
    this.promotionService.approve(this.data.idPromotion).subscribe(res =>{
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
    this.promotionService.refuse(this.data.idPromotion).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
   }
  }
}

