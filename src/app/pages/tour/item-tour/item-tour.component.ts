import { Component, OnInit, Input } from '@angular/core';
import { TourModel } from 'src/app/models/tour.model';
import { TourService } from "src/app/services_API/tour.service"
import { NotificationService } from "./../../../services_API/notification.service";
import { ColDef, GridConfig} from './../../../components/grid-data/grid-data.component';
import { ConfigService } from "./../../../services_API/config.service";
import { ResponseModel } from "./../../../models/responsiveModels/response.model";
import { HotelService } from 'src/app/services_API/hotel.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { PlaceService } from 'src/app/services_API/place.service';
import { PlaceModel } from 'src/app/models/place.model';
import { RestaurantService } from 'src/app/services_API/restaurant.service';
import { RestaurantModel } from 'src/app/models/restaurant.model';
import { CostTourService } from 'src/app/services_API/costtour.service';
import { CostTourModel } from 'src/app/models/costTour.model';

@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {

  @Input() resTour: TourModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resTourTmp: TourModel
  resHotel: HotelModel[]
  resPlace: PlaceModel[]
  resRestaurant: RestaurantModel[]
  resCostTour: CostTourModel
  isHoliday = this.configService.listStatus()
  constructor(private tourService: TourService, private configService: ConfigService, private notificationService: NotificationService,
      private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService, private costtourService: CostTourService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.init()

    if(this.type == 'create'){
      this.resTour = new TourModel()
      this.resCostTour = new CostTourModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resTourTmp = Object.assign({}, this.resTour)
  }

  init(){
    this.hotelService.views().then(response =>{
      this.resHotel = response
    })
    this.restaurantService.views().then(response =>{
      this.resRestaurant = response
    })
    this.placeService.views().then(response =>{
      this.resPlace = response
    })
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
    if (JSON.stringify(this.resTour) != JSON.stringify(this.resTourTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resTour = Object.assign({}, this.resTour)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.tourService.create(this.resTour).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == "Error")
          {
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })

          this.costtourService.create(this.resCostTour).subscribe(res =>{
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
