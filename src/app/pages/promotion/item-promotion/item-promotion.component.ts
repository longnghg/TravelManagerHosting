import { Component, OnInit, Input } from '@angular/core';
import { PromotionModel } from "src/app/models/promotion.model";
import { PromotionService } from "../../../services_API/promotion.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-item-promotion',
  templateUrl: './item-promotion.component.html',
  styleUrls: ['./item-promotion.component.scss']
})
export class ItemPromotionComponent implements OnInit {

  @Input() resPromotion: PromotionModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resPromotiontTmp: PromotionModel

  constructor(private promotionService: PromotionService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if(this.type == 'create'){
      this.resPromotion = new PromotionModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resPromotiontTmp = Object.assign({}, this.resPromotion)
  }

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.restore()

    }
    else{
      this.isEdit = true
    }
  }

  inputChange(){
    if (JSON.stringify(this.resPromotion) != JSON.stringify(this.resPromotiontTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resPromotion = Object.assign({}, this.resPromotiontTmp)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.promotionService.create(this.resPromotion).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == "Error")
          {
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{


      }
      this.close()
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
     this.restore()
  }
}
