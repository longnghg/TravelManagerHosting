import { Component, OnInit, Input } from '@angular/core';
import { RestaurantModel } from 'src/app/models/restaurant.model';
import { RestaurantService } from "src/app/services_API/restaurant.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-item-restaurant',
  templateUrl: './item-restaurant.component.html',
  styleUrls: ['./item-restaurant.component.scss']
})
export class ItemRestaurantComponent implements OnInit {
  @Input() resRestaurant: RestaurantModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resRestaurantTmp: RestaurantModel
  constructor(private restaurantService: RestaurantService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if(this.type == 'create'){
      this.resRestaurant = new RestaurantModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resRestaurantTmp = Object.assign({}, this.resRestaurant)
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
    if (JSON.stringify(this.resRestaurant) != JSON.stringify(this.resRestaurantTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resRestaurant = Object.assign({}, this.resRestaurantTmp)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.restaurantService.create(this.resRestaurant).subscribe(res =>{
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
