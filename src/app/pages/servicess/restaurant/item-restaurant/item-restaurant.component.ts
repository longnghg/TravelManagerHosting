import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestaurantModel, ValidationRestaurantModel } from 'src/app/models/restaurant.model';
import { RestaurantService } from "src/app/services_API/restaurant.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';

@Component({
  selector: 'app-item-restaurant',
  templateUrl: './item-restaurant.component.html',
  styleUrls: ['./item-restaurant.component.scss']
})
export class ItemRestaurantComponent implements OnInit {
  @Input() resRestaurant: RestaurantModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validateRestaurant: ValidationRestaurantModel = new ValidationRestaurantModel
  response: ResponseModel
  isChange: boolean = false
  resRestaurantTmp: RestaurantModel
  formData: any
  constructor(private restaurantService: RestaurantService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resRestaurant = new RestaurantModel()
    }
    this.resRestaurantTmp = Object.assign({}, this.resRestaurant)
  }

  inputChange(){
    if (JSON.stringify(this.resRestaurant) != JSON.stringify(this.resRestaurantTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resRestaurant = Object.assign({}, this.resRestaurantTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  save(){
    this.validateRestaurant = new ValidationRestaurantModel
    this.validateRestaurant =  this.configService.validateRestaurant(this.resRestaurant, this.validateRestaurant)

    if (this.validateRestaurant.total == 0) {

      this.resRestaurant.IdUserModify = this.auth.id
      if(this.type == "create")
      {
          this.restaurantService.create(this.resRestaurant).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
	    if(this.response.notification.type == StatusNotification.Success)
        {
		      this.close()
        }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }
      else{
        this.restaurantService.update(this.resRestaurant).subscribe(res =>{
          this.response = res
          console.log(this.resRestaurant.idRestaurant);

          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == StatusNotification.Success)
          {
		        this.isChange = false
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }

      }
    }

    close(){
      this.resRestaurant = Object.assign({}, this.resRestaurantTmp)
      this.isChange = false
       this.parentType.emit(null);
    }

    getParentData(type?: string){
      this.parentType.emit(type);
      this.parentData.emit(this.resRestaurant);
    }
  }
