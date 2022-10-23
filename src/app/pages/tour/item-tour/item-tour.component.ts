import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {

  @Input() resTour: TourModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()

  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resTourTmp: TourModel
  resHotel: HotelModel[]
  resPlace: PlaceModel[]
  resRestaurant: RestaurantModel[]
  isHoliday = this.configService.listStatus()
  constructor(private tourService: TourService, private configService: ConfigService, private notificationService: NotificationService,
      private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.init()
    var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
    this.type = this.activatedRoute.snapshot.paramMap.get('id1')

    if(this.type == "detail"){
      this.isEdit = false
      this.tourService.getTour(idTour).subscribe(res => {
        this.response = res

        if(!this.response.notification.type)
        {
          this.resTour = this.response.content
          this.resTourTmp = Object.assign({}, this.resTour)

        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })

    }
    else{
      this.resTour = new TourModel
      this.resTourTmp = Object.assign({}, this.resTour)
      this.isEdit = true
    }
  }
  ngOnChanges(): void {
    
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
    var valid =  this.configService.validateTour(this.resTour)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.tourService.create(this.resTour).subscribe(res =>{
          this.response = res

          // this.resCostTour.idCostTour = this.response.content
          if(res.notification.type != "Error")
          {
            this.close()
          }
          this.notificationService.handleAlertObj(res.notification)
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

     this.restore()
  }

  getDataDelete(){
    this.parentDelete.emit(this.resTour);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resTour);
  }
}
