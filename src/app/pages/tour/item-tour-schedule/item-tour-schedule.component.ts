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
import { AuthenticationModel } from "../../../models/authentication.model";
import { TimeLineModel, ValidateTimelineModel } from 'src/app/models/timeLine.model';
import { TimelineService } from 'src/app/services_API/timeline.service';
import { LocationModel } from 'src/app/models/location.model';
import { ProvinceService } from 'src/app/services_API/province.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

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
  validateTimeline: ValidateTimelineModel = new ValidateTimelineModel
  resCostTour: CostTourModel
  costtour: CostTourModel
  resTimeline: TimeLineModel
  resTimelinelist: TimeLineModel[] = []
  resTimelinelistTmp: TimeLineModel[] = []
  timelineList: TimeLineModel[]
  resCar: CarModel[]
  resEmployee: EmployeeModel[]
  resPromotion: PromotionModel[]
  resHotel: HotelModel[]
  resPlace: PlaceModel[]
  resRestaurant: RestaurantModel[]
  resProvince: LocationModel[]
  response: ResponseModel
  isChange: boolean = false
  auth: AuthenticationModel
  resScheduleTmp: ScheduleModel
  resCostTourTmp: CostTourModel
  isHoliday = this.configService.listStatus()
  isDelete: boolean = false
  active;
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private employeeService: EmployeeService, private carService: CarService, private promotionService: PromotionService, private activatedRoute: ActivatedRoute,
    private costtourService: CostTourService, private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService,
    private timelineService: TimelineService, private provinceService: ProvinceService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    this.init()
    this.initCost()



    if (this.type == 'create') {
      this.resSchedule = new ScheduleModel()
      this.resCostTour = new CostTourModel()
      this.resTimeline = new TimeLineModel()
      this.resTimelinelist = []
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
          if (this.resCostTour) {
            this.resCostTour.breakfast = Number(this.resCostTour.breakfast).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.water = Number(this.resCostTour.water).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.feeGas = Number(this.resCostTour.feeGas).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.distance = Number(this.resCostTour.distance).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.sellCost = Number(this.resCostTour.sellCost).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.depreciation = Number(this.resCostTour.depreciation).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.otherPrice = Number(this.resCostTour.otherPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.tolls = Number(this.resCostTour.tolls).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
            this.resCostTour.insuranceFee = Number(this.resCostTour.insuranceFee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

        if (this.resTimeline) {
          this.resTimeline.fromTimeDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resTimeline.fromTime)
          this.resTimeline.toTimeDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resTimeline.toTime)
        }
        this.resTimeline = new TimeLineModel()

        this.timelineService.getTimelineidSchedule(this.resSchedule.idSchedule).subscribe(res => {
          this.response = res
          this.resTimelinelist = this.response.content


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
    this.provinceService.views().then(response => {
      this.resProvince = response 
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

  dateChange() {
    this.resSchedule.beginDate = new Date(this.resSchedule.beginDateDisplay).getTime()
    this.resSchedule.endDate = new Date(this.resSchedule.endDateDisplay).getTime()
    this.resSchedule.departureDate = new Date(this.resSchedule.departureDateDisplay).getTime()
    this.resSchedule.returnDate = new Date(this.resSchedule.returnDateDisplay).getTime()
    this.resSchedule.timePromotion = new Date(this.resSchedule.timePromotionDisplay).getTime()

    this.resTimeline.fromTime = new Date(this.resTimeline.fromTimeDisplay).getTime()
    this.resTimeline.toTime = new Date(this.resTimeline.toTimeDisplay).getTime()
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
    this.costtour = new CostTourModel
    this.costtour = this.resCostTour
    this.timelineList = this.resTimelinelist

    this.validateScheduleModel = new ValidateScheduleModel
    this.validateScheduleModel = this.configService.validateSchedule(this.resSchedule, this.validateScheduleModel)
    this.validateCostTourModel = new ValidateCostTourModel
    this.validateCostTourModel = this.configService.validateCostTour(this.resCostTour, this.validateCostTourModel)

    if (this.validateScheduleModel.total == 0) {
      if (this.validateCostTourModel.total == 0) {
        if (this.timelineList.length != 0) {

          var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
          if (this.type == "create") {
            this.resSchedule.idUserModify = this.auth.id
            this.resSchedule.tourId = idTour
            
            this.scheduleService.create(this.resSchedule).subscribe(res => {
              this.response = res

              if (this.response.notification.type == StatusNotification.Success) {
                this.resSchedule.idSchedule = res.content

                if (this.costtour) {
                  this.costtour.idSchedule = this.resSchedule.idSchedule
                  this.costtourService.create(this.costtour).subscribe(res => {
                    this.response = res
                    if (this.response.notification.type == StatusNotification.Success) {

                    }
                  }, error => {
                    var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
                    this.notificationService.handleAlert(message, StatusNotification.Error)
                  })
                }

                if (this.timelineList) {
                  this.timelineList.forEach(timeline => {
                    timeline.idSchedule = this.resSchedule.idSchedule

                    console.log(timeline);

                  });
                  
                  this.timelineService.create(this.timelineList).subscribe(res => {
                    this.response = res
                    if (this.response.notification.type == StatusNotification.Success) {

                    }
                  }, error => {
                    var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
                    this.notificationService.handleAlert(message, StatusNotification.Error)
                  })
                }


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

              if (this.response.notification.type == StatusNotification.Success) {
                this.resSchedule.idSchedule = res.content
              }
              else {
                this.notificationService.handleAlertObj(res.notification)
              }
            }, error => {
              var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
              this.notificationService.handleAlert(message, StatusNotification.Error)
            })

          }
          this.close()
        } else {
          this.notificationService.handleAlert("Bạn cần thêm ít nhất 1 timeline !", StatusNotification.Info)
          this.active = 3
        }
      } else {
        this.notificationService.handleAlert("Bạn cần nhập đầy đủ chi phí !", StatusNotification.Info)
        this.active = 2
      }
    }
    else {
      this.notificationService.handleAlert("Bạn cần nhập đầy đủ lịch trình !", StatusNotification.Info)
      this.active = 1
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


  btnAddTimeline() {
    this.validateTimeline = new ValidateTimelineModel
    this.validateTimeline = this.configService.validateTimeline(this.resTimeline, this.validateTimeline)
    console.log(this.validateTimeline);
    
    if (this.validateTimeline.total == 0) {
      this.resTimelinelist.push(Object.assign({}, this.resTimeline))
      this.resTimeline = new TimeLineModel()
    }
    
  }

  btnDeleteTimeline(){
    // this.resTimelinelist.(Object.assign({}, this.resTimeline))
    //   this.resTimeline = new TimeLineModel()
  }

  promotionChange(id: number) {
    this.resPromotion.forEach(promotion => {
      if (promotion.idPromotion == id) {
        this.resSchedule.timePromotion = promotion.fromDate
        this.resSchedule.valuePromotion = promotion.value

        this.resSchedule.timePromotionDisplay = promotion.fromDateDisplay
      }
    });
  }

  close() {
    if (this.type == 'detail') {
    }
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.resTimelinelist  = Object.assign({}, this.resTimelinelistTmp)
    this.isChange = false
    this.parentType.emit(null);
  }

  backup() {
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

  getParentData(type?: string) {
    this.parentType.emit(type);
    this.parentData.emit(this.resSchedule);
  }

  formatInput(input: HTMLInputElement, property: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    this.resCostTour[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")

  }
}
