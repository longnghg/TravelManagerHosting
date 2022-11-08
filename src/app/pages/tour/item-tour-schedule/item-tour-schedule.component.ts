import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleModel, ValidateScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from "../../../services_API/schedule.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig } from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services_API/car.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services_API/employee.service';
import { PromotionModel } from 'src/app/models/promotion.model';
import { PromotionService } from 'src/app/services_API/promotion.service';
import { ActivatedRoute } from '@angular/router';
import { CostTourModel, ValidateCostTourModel } from 'src/app/models/costTour.model';
import { CostTourService } from 'src/app/services_API/costtour.service';
import { HotelService } from 'src/app/services_API/hotel.service';
import { HotelModel } from 'src/app/models/hotel.model';
import { PlaceService } from 'src/app/services_API/place.service';
import { PlaceModel } from 'src/app/models/place.model';
import { RestaurantService } from 'src/app/services_API/restaurant.service';
import { RestaurantModel } from 'src/app/models/restaurant.model';
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel} from "../../../models/authentication.model";
@Component({
  selector: 'app-item-tour-schedule',
  templateUrl: './item-tour-schedule.component.html',
  styleUrls: ['./item-tour-schedule.component.scss']
})
export class ItemTourScheduleComponent implements OnInit {
  @Input() resSchedule: ScheduleModel
  @Input() type: string
  // @Output() parentDelete = new EventEmitter<any>()
  // @Output() parentRestore = new EventEmitter<any>()
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  validateScheduleModel: ValidateScheduleModel = new ValidateScheduleModel
  validateCostTourModel: ValidateCostTourModel = new ValidateCostTourModel
  resCostTour: CostTourModel
  resCar: CarModel[]
  resEmployee: EmployeeModel[]
  resPromotion: PromotionModel[]
  resHotel: HotelModel[]
  resPlace: PlaceModel[]
  resRestaurant: RestaurantModel[]
  response: ResponseModel
  isChange: boolean = false
  isAdd: boolean = false
  auth: AuthenticationModel
  resScheduleTmp: ScheduleModel
  resCostTourTmp: CostTourModel
  isHoliday = this.configService.listStatus()
  isDelete: boolean = false
  active;
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
private employeeService: EmployeeService, private carService: CarService, private promotionService: PromotionService, private activatedRoute: ActivatedRoute,
    private costtourService: CostTourService, private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    this.init()
    this.initCost()

    // this.resCostTour.breakfast = Number(this.resCostTour.breakfast).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.water = Number(this.resCostTour.water).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.feeGas = Number(this.resCostTour.feeGas).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.distance = Number(this.resCostTour.distance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.sellCost = Number(this.resCostTour.sellCost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.depreciation = Number(this.resCostTour.depreciation).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.otherPrice = Number(this.resCostTour.otherPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.tolls = Number(this.resCostTour.tolls).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
    // this.resCostTour.insuranceFee = Number(this.resCostTour.insuranceFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")

    if (this.type == 'create') {
      this.resSchedule = new ScheduleModel()
      this.resCostTour = new CostTourModel()
      this.resScheduleTmp = Object.assign({}, this.resSchedule)
      this.resCostTourTmp = Object.assign({}, this.resCostTour)
    } 
    else {
      if (this.resSchedule) {
        this.resSchedule.departureDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.departureDate)
        this.resSchedule.returnDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.returnDate)
        this.resSchedule.beginDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.beginDate)
        this.resSchedule.endDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.endDate)
        this.resSchedule.timePromotionDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.timePromotion)

        this.resScheduleTmp = Object.assign({}, this.resSchedule)
        this.resCostTourTmp = Object.assign({}, this.resCostTour)
    

        this.costtourService.getCostbyidSchedule(this.resSchedule.idSchedule).subscribe(res => {
          this.response = res
          this.resCostTour = this.response.content
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }
  }


  init(e?) {
    this.employeeService.views(e).then(response => {
      this.resEmployee = response
    })
    this.carService.views().then(response => {
      this.resCar = response
    })
    this.promotionService.views(this.isDelete).then(response => {
      this.resPromotion = response
    })
  }

  initCost() {
    this.hotelService.views().then(response => {
      this.resHotel = response
    })
    this.restaurantService.views().then(response => {
      this.resRestaurant = response
    })
    this.placeService.views().then(response => {
      this.resPlace = response
    })
  }

  dateChange(){
    this.resSchedule.beginDate = new Date(this.resSchedule.beginDateDisplay).getTime()
    this.resSchedule.endDate = new Date(this.resSchedule.endDateDisplay).getTime()
    this.resSchedule.departureDate = new Date(this.resSchedule.departureDateDisplay).getTime()
    this.resSchedule.returnDate = new Date(this.resSchedule.returnDateDisplay).getTime()
    this.resSchedule.timePromotion = new Date(this.resSchedule.timePromotionDisplay).getTime()
  }

  inputChange() {
    if (JSON.stringify(this.resSchedule) != JSON.stringify(this.resScheduleTmp) || 
       JSON.stringify(this.resCostTour) != JSON.stringify(this.resCostTourTmp)) {
      this.isChange = true
    }
    else {
      this.isChange = false
    }
  }

  save() {
    this.validateScheduleModel = new ValidateScheduleModel
    this.validateScheduleModel = this.configService.validateSchedule(this.resSchedule, this.validateScheduleModel)
    this.validateCostTourModel = new ValidateCostTourModel
    this.validateCostTourModel = this.configService.validateCostTour(this.resCostTour, this.validateCostTourModel)

    if (this.validateScheduleModel.total == 0) {
      if (this.validateCostTourModel.total == 0) {
      var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
      if (this.type == "create") {
        this.resSchedule.idUserModify = this.auth.id
        this.resSchedule.tourId = idTour
 
        this.scheduleService.create(this.resSchedule).subscribe(res => {
          this.response = res
          
          if(this.response.notification.type == StatusNotification.Success){
            this.resSchedule.idSchedule = res.content

            this.resCostTour.idSchedule = this.resSchedule.idSchedule
            this.costtourService.create(this.resCostTour).subscribe(res => {
              this.response = res
              if(this.response.notification.type == StatusNotification.Success){

              }
            }, error => {
              var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
              this.notificationService.handleAlert(message, StatusNotification.Error)
            })
          }
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else {
        // this.resSchedule.tourId = idTour
         this.resSchedule.idUserModify = this.auth.id
         console.log(this.resSchedule);

        this.scheduleService.update(this.resSchedule).subscribe(res => {
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if (this.response.notification.type == StatusNotification.Success) {
            this.resSchedule.idSchedule = res.content
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

      }
      this.close()
    }else{
      this.notificationService.handleAlert("Bạn cần nhập chi phí !", StatusNotification.Info)
    }
    }
  }

  saveCostTour() {
    this.validateCostTourModel = new ValidateCostTourModel
    this.validateCostTourModel = this.configService.validateCostTour(this.resCostTour, this.validateCostTourModel)

    if (this.validateCostTourModel.total == 0) {
      if (this.type == "create") {
        this.resCostTour.idSchedule = this.resSchedule.idSchedule
        this.costtourService.create(this.resCostTour).subscribe(res => {
          this.response = res
        this.notificationService.handleAlertObj(res.notification)
          console.log(this.response.content);
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else { 
          this.resCostTour.idSchedule = this.resSchedule.idSchedule
          this.costtourService.update(this.resCostTour).subscribe(res => {
            this.response = res
            this.notificationService.handleAlertObj(res.notification)

            if (this.response.notification.type == StatusNotification.Success) {
            }
            console.log(this.response.content);
          }, error => {
            var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
            this.notificationService.handleAlert(message, StatusNotification.Error)
          })
        }
      }
  }


  close() {
    if (this.type == 'detail') {
      this.isAdd = false
    }
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.isChange = false
     this.parentType.emit(null);
  }

  backup(){
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.resCostTour = Object.assign({}, this.resCostTourTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }


  delete() {
    if (this.resSchedule) {
      this.scheduleService.delete(this.resSchedule.idSchedule, this.auth.id).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  restoreSchedule() {
    if (this.resSchedule) {
      this.scheduleService.restore(this.resSchedule.idSchedule, this.auth.id).subscribe(res => {
this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  getParentData(type?: string){
    this.parentType.emit(type);
    this.parentData.emit(this.resSchedule);
  }
}