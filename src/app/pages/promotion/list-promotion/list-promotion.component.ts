import { Component, OnInit } from '@angular/core';
import { PromotionModel } from 'src/app/models/promotion.model';
import { PromotionService } from "../../../services_API/promotion.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification, StatusApprove, TypeAction } from "../../../enums/enum";
import { AuthenticationModel } from "../../../models/authentication.model";

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit {
  auth: AuthenticationModel
  resPromotion: PromotionModel[]
  resPromotionWaiting: PromotionModel[]
  response: ResponseModel
  dataChild: PromotionModel
  typeChild: string
  isDelete: boolean = false
  data: PromotionModel
  dataNon: PromotionModel
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
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.init(this.isDelete);
  }

  init(isDelete){
    this.promotionService.gets(isDelete).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resPromotion = this.response.content
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

    setTimeout(() => {

      this.columnDefs= [
        { field: 'value',headerName: "Mã giảm giá", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'value'},
        { field: 'toDate',headerName: "Từ ngày", style: "width: 30%;", searchable: true, searchType: 'text', searchObj: 'toDate',filter: 'date'},
        { field: 'fromDate',headerName: "Đến ngày", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'fromDate', filter: 'date'},
      ];

      this.columnDefsWaiting= [
        { field: 'value',headerName: "Mã giảm giá", style: "width: 20%;", searchable: true, searchType: "text", searchObj: 'name'},
        { field: 'toDate',headerName: "Từ ngày", style: "width: 25%;", searchable: true, searchType: 'text', searchObj: 'toDate', filter: 'date'},
        { field: 'fromDate',headerName: "Đến ngày", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'fromDate',filter: 'date'},
        { field: 'approveName',headerName: "Trạng thái phê duyệt", style: "width: 15%;", searchable: true, searchType: 'section', searchObj: 'approve' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listApprove()},
        { field: 'typeActionName',headerName: "Loại phê duyệt", style: "width: 15%;", searchable: true, searchType: 'section', searchObj: 'typeAction' , multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id", listSection: this.configService.listTypeAction()},
      ];
    }, 200);

    this.promotionService.getsWaiting(this.auth.id).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == StatusNotification.Success){
        this.resPromotionWaiting = this.response.content

        this.resPromotionWaiting.forEach(promotion => {
          promotion.approveName = StatusApprove[promotion.approve]
          promotion.typeActionName = TypeAction[promotion.typeAction]
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
      this.promotionService.delete(this.data.idPromotion, this.auth.id).subscribe(res =>{
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
      this.promotionService.restore(this.data.idPromotion, this.auth.id, this.dataNon).subscribe(res =>{
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
    this.promotionService.approve(this.data.idPromotion, this.dataNon).subscribe(res =>{
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
    this.promotionService.refuse(this.data.idPromotion, this.dataNon).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
   }
  }
}

