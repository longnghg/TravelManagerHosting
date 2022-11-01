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
@Component({
  selector: 'app-item-tour-schedule',
  templateUrl: './item-tour-schedule.component.html',
  styleUrls: ['./item-tour-schedule.component.scss']
})
export class ItemTourScheduleComponent implements OnInit {
  @Input() resSchedule: ScheduleModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
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
  resScheduleTmp: ScheduleModel
  isHoliday = this.configService.listStatus()
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private employeeService: EmployeeService, private carService: CarService, private promotionService: PromotionService, private activatedRoute: ActivatedRoute,
    private costtourService: CostTourService, private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.init()
    this.initCost()


    if (this.type == 'create') {
      this.resSchedule = new ScheduleModel()
      this.resCostTour = new CostTourModel()
    } else {
      this.isAdd = false
    }
    this.resScheduleTmp = Object.assign({}, this.resSchedule)
    if (this.resSchedule) {
      this.resScheduleTmp.departureDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.departureDate))
      this.resScheduleTmp.returnDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.returnDate))
      this.resScheduleTmp.beginDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.beginDate))
      this.resScheduleTmp.endDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.endDate))
      this.resScheduleTmp.timePromotion = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.timePromotion))

      this.costtourService.getCostbyidSchedule(this.resSchedule.idSchedule).subscribe(res => {
        this.response = res
        this.resCostTour = this.response.content
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })

      console.log(this.resSchedule.isDelete);
    }

  }


  init(e?) {
    this.employeeService.views(e).then(response => {
      this.resEmployee = response
    })
    this.carService.views().then(response => {
      this.resCar = response
    })
    this.promotionService.views().then(response => {
      this.resPromotion = response
    })
  }

  initCost() {
    this.hotelService.gets().subscribe(response => {
      this.response = response
      this.resHotel = this.response.content
    })
    this.restaurantService.gets().subscribe(response => {
      this.response = response
      this.resRestaurant = this.response.content
    })
    this.placeService.gets().subscribe(response => {
      this.response = response
      this.resPlace = this.response.content
    })
  }

  inputChange() {
    if (JSON.stringify(this.resSchedule) != JSON.stringify(this.resScheduleTmp)) {
      this.isChange = true
    }
    else {
      this.isChange = false
    }
  }

  restore() {
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.isChange = false
  }

  save() {
    this.validateScheduleModel = new ValidateScheduleModel
    this.validateScheduleModel = this.configService.validateSchedule(this.resSchedule, this.validateScheduleModel)

    if (this.validateScheduleModel.total == 0) {
      var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
      if (this.type == "create") {
        var idUser = localStorage.getItem("idUser")
        this.resSchedule.idUserModify = idUser
        this.resSchedule.typeAction = "insert"
        this.resSchedule.tourId = idTour
        this.scheduleService.create(this.resSchedule).subscribe(res => {
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.resSchedule.idSchedule = res.content

        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else {
        // this.resSchedule.tourId = idTour
        this.scheduleService.update(this.resSchedule).subscribe(res => {
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.resSchedule.idSchedule = res.content


          if (this.response.notification.type == StatusNotification.Success) {
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

      }
      this.close()
    }
  }

  saveCostTour() {
    // this.validateCostTourModel = new ValidateCostTourModel
    // this.validateCostTourModel = this.configService.validateCostTour(this.resSchedule, this.validateCostTourModel)

    // if (this.validateCostTourModel.total == 0) {
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
        if (this.isAdd == true) {
          this.resCostTour.idSchedule = this.resSchedule.idSchedule
          this.costtourService.create(this.resCostTour).subscribe(res => {
            this.response = res
            this.notificationService.handleAlertObj(res.notification)

            if (this.response.notification.type == StatusNotification.Success) {
              this.isAdd = false
            }
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

  btnAddCost() {
    this.resCostTour = new CostTourModel()
    this.isAdd = true
  }


  close() {
    if (this.type == 'detail') {
      this.isAdd = false
    }
    this.restore()
  }

  getDataDelete() {
    this.parentDelete.emit(this.resSchedule);
  }
  getDataRestore() {
    this.parentRestore.emit(this.resSchedule);
  }

  delete() {
    if (this.resSchedule) {
      this.scheduleService.delete(this.resSchedule.idSchedule).subscribe(res => {
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
      this.scheduleService.restore(this.resSchedule.idSchedule).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
}
