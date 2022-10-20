import { Component, OnInit } from '@angular/core';
import { PromotionModel } from 'src/app/models/promotion.model';
import { PromotionService } from "../../../services_API/promotion.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit {

  resPromotion: PromotionModel[]
  resPromotionWaiting: PromotionModel[]
  response: ResponseModel
  dataChild: PromotionModel
  typeChild: string

  constructor(private promotionService: PromotionService, private configService: ConfigService, private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "",
    idModal: "gridPromotion",
    radioBox: true,
    radioBoxName: "Kho lưu trữ",
  }
  ngOnInit(): void {

    this.init()
    this.initWaiting();
    console.log(this.resPromotion);

    setTimeout(() => {
      this.columnDefs= [
        { field: 'idPrmotion', headerName: "Mã số", style: "width: 340px;", searchable: true, searchType: 'text', searchObj: 'idPrmotion'},
        { field: 'value', headerName: "Giá trị", style: "width: 300px;", searchable: true, searchType: 'text', searchObj: 'value'},
        { field: 'toDate', headerName: "Đến nay", style: "width: 270px;", searchable: true, searchType: 'text', searchObj: 'toDate'},
        { field: 'fromDate', headerName: "Từ ngày", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'fromDate'},
        // { field: 'idSchedule',headerName: "Mã số", style: "width: 200px;", filter: "avatar", searchable: true, searchType: 'date', searchObj: 'idSchedule'},
      ];
    }, 200);

  }

  init(){
    this.promotionService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resPromotion = this.response.content
      }
      else{
        this.resPromotion = null
      
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  initWaiting(){
    this.promotionService.getsWaiting().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
        this.resPromotionWaiting = this.response.content
        console.log(this.resPromotionWaiting);

      }
      else{
        this.resPromotionWaiting = null
      
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
