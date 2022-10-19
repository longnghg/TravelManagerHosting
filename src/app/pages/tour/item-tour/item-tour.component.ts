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
  isSuccess: boolean = false
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
      this.isSuccess = false
    }else{
      this.isSuccess = true
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
    this.resCostTour = Object.assign({}, this.resCostTour)
    this.isChange = false
  }

  save(){
    var valid =  this.configService.validateTour(this.resTour)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.tourService.create(this.resTour).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == "Success")
          {
            this.isSuccess = true
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
  }


  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
    this.isSuccess = false
     this.restore()
  }


}
