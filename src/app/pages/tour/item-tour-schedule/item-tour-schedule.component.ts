import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
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

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-tour-schedule',
  templateUrl: './item-tour-schedule.component.html',
  styleUrls: ['./item-tour-schedule.component.scss']
})

export class ItemTourScheduleComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  @ViewChild('fade') fade: ElementRef
  @ViewChild('card') card: ElementRef
  @ViewChild( 'editor' ) editorComponent: CKEditorComponent;
  isLoading: boolean
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
  resTimeline: TimeLineModel
  resTimelinelist: TimeLineModel[] = []
  resTimelineTmp: TimeLineModel
  timelineList: TimeLineModel[]
  resTimelinelistDelete: TimeLineModel[] = []
  resCar: CarModel[]
  scheduleOfCar: ScheduleModel[]
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
  resTimelinelistTmp: TimeLineModel[] = []
  isHoliday = this.configService.listStatus()
  isDelete: boolean = false
  active;
  isTimeline: boolean = false
  indexTimeline: number
  isChangeTimeline: boolean = false
  isChangeTimelineList: boolean = false
  isFirst: boolean = true

  pageCount: number
  pageSize: number = 7
  index: number = 0
  pageIndex: number = 1
  start: number = 0
  end: number = 0
  btnPrev: boolean = false
  btnNext: boolean = true

  public Editor = ClassicEditor;
  config = {
    placeholder: 'Nhập thông tin timeline',toolbar: ['heading', 'bold', 'italic', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList'],
    isReadOnly: true,
  }
  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private employeeService: EmployeeService, private carService: CarService, private promotionService: PromotionService, private activatedRoute: ActivatedRoute,
    private costtourService: CostTourService, private hotelService: HotelService, private placeService: PlaceService, private restaurantService: RestaurantService,
    private timelineService: TimelineService, private provinceService: ProvinceService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if (this.type == 'create' && this.isFirst) {
      this.resSchedule = new ScheduleModel()
      this.resCostTour = new CostTourModel()
      this.resTimeline = new TimeLineModel()
      this.resTimelinelist = []

      this.resScheduleTmp = Object.assign({}, this.resSchedule)
      this.resCostTourTmp = Object.assign({}, this.resCostTour)
      this.resTimelinelistTmp = Object.assign({}, this.resTimelinelist)
      this.isFirst = false
    }
    else {
      if (this.resSchedule) {
        this.resSchedule.isUpdate = true

        this.resSchedule.departureDateDisplay = this.configService.formatFromUnixTimestampToFullDateTime(this.resSchedule.departureDate)
        this.resSchedule.returnDateDisplay = this.configService.formatFromUnixTimestampToFullDateTime(this.resSchedule.returnDate)
        this.resSchedule.beginDateDisplay = this.configService.formatFromUnixTimestampToFullDateTime(this.resSchedule.beginDate)
        this.resSchedule.endDateDisplay = this.configService.formatFromUnixTimestampToFullDateTime(this.resSchedule.endDate)
        this.resSchedule.timePromotionDisplay = this.configService.formatFromUnixTimestampToFullDateTime(this.resSchedule.timePromotion)
        this.resSchedule.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.modifyDate)
        this.resScheduleTmp = Object.assign({}, this.resSchedule)


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
            this.resCostTour.maxCapacity = this.resSchedule.maxCapacity
            this.resCostTour.minCapacity = this.resSchedule.minCapacity
          }

          this.resCostTourTmp = Object.assign({}, this.resCostTour)
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

        this.resTimeline = new TimeLineModel()
        this.timelineService.getTimelineidSchedule(this.resSchedule.idSchedule).subscribe(res => {
          this.response = res
          this.resTimelinelist = this.response.content
          console.log(this.resTimelinelist);

          if (this.resTimelinelist) {
            this.resTimelinelist.forEach(timeline => {
              timeline.fromTimeDisplay = this.configService.formatFromUnixTimestampToFullDateTime(timeline.fromTime)
              timeline.toTimeDisplay = this.configService.formatFromUnixTimestampToFullDateTime(timeline.toTime)
            });
            this.resSchedule.isRemoveTimeLine = false
          }
          else{
            this.resSchedule.isRemoveTimeLine = true
          }
          this.resTimelinelistTmp = Object.assign([], this.resTimelinelist)

        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }

    this.init()
    this.initCost()
  }


  init(e?) {
    if (this.resSchedule) {
      // this.resSchedule.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resSchedule.modifyDate)

      if (this.type != "create") {
        this.carService.viewsUpdate(this.resSchedule.departureDate, this.resSchedule.returnDate, this.resSchedule.idSchedule).then(response => {
          this.resCar = response
        })

        this.employeeService.viewsUpdate(this.resSchedule.departureDate, this.resSchedule.returnDate, this.resSchedule.idSchedule).then(response => {
          this.resEmployee = response
        })
      } else {
        this.carService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {

          this.resCar = response

        })

        this.employeeService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {
          this.resEmployee = response
        })
      }
    }

    // this.employeeService.views2().then(response => {
    //   this.resEmployee = response
    // })

    // this.carService.views2().then(response => {
    //   this.resCar = response
    // })

    this.promotionService.views().then(response => {
      this.resPromotion = response
    })
    this.provinceService.views().then(response => {
      this.resProvince = response
    })
  }

  // carChangeDate(){
  //   if(this.resSchedule){
  //     if(this.resSchedule.departureDate > 0 && this.resSchedule.returnDate > 0){
  //       var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
  //       this.carService.getsCarByDate(this.resSchedule.departureDate, this.resSchedule.returnDate, idTour).subscribe(response => {
  //         this.response = response
  //         this.resCar = this.response.content
  //       })
  //     }
  //   }
  // }

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

  dateChange(property) {
    this.resSchedule[property] = new Date(this.resSchedule[property+'Display']).getTime()
    if (this.resSchedule.departureDate != this.resScheduleTmp.departureDate || this.resSchedule.returnDate != this.resScheduleTmp.returnDate) {
      this.resSchedule.isUpdateDR = true
      this.resSchedule.isUpdate = false
    }

    if (this.resSchedule.beginDate != this.resScheduleTmp.beginDate || this.resSchedule.endDate != this.resScheduleTmp.endDate) {
      this.resSchedule.isUpdate = false
    }

    if (property == "departureDate" || property == "returnDate"){
      // if (this.type != "create") {
      //   this.carService.viewsUpdate(this.resSchedule.departureDate, this.resSchedule.returnDate, this.resSchedule.idSchedule).then(response => {
      //     this.resCar = response
      //   })

      //   this.employeeService.viewsUpdate(this.resSchedule.departureDate, this.resSchedule.returnDate, this.resSchedule.idSchedule).then(response => {
      //     this.resEmployee = response
      //   })
      // } else {
      //   this.carService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {
      //     this.resCar = response
      //   })

      //   this.employeeService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {
      //     this.resEmployee = response
      //   })
      // }
      this.carService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {
        this.resCar = response
      })

      this.employeeService.views(this.resSchedule.departureDate, this.resSchedule.returnDate).then(response => {
        this.resEmployee = response
      })
    }

  }

  dateChangeTimeLine(property){
    this.resTimeline[property] = new Date(this.resTimeline[property+'Display']).getTime()
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

  inputChangeTimeline() {
    if (JSON.stringify(this.resTimeline) != JSON.stringify(this.resTimelineTmp)) {
      this.isChangeTimeline = true
    }
    else {
      this.isChangeTimeline = false
    }
  }

  save() {
    this.validateScheduleModel = new ValidateScheduleModel
    this.validateScheduleModel = this.configService.validateSchedule(this.resSchedule, this.validateScheduleModel, Object.assign([], this.resTimelinelist))
    this.resSchedule.idUserModify = this.auth.id
    this.resSchedule.tourId = this.activatedRoute.snapshot.paramMap.get('id2')
    if (this.validateScheduleModel.total == 0) {
        if (this.active == 2 || this.active == 3) {
          this.validateCostTourModel = new ValidateCostTourModel
          this.validateCostTourModel = this.configService.validateCostTour(this.resCostTour, this.validateCostTourModel)
          if (this.validateCostTourModel.total == 0 ) {
           if (this.active == 3) {
            if (this.resTimelinelist.length != 0) {
              if (this.type == "create") {
                this.scheduleService.create(this.resSchedule).subscribe(res => {
                  this.response = res
                  if (this.response.notification.type == StatusNotification.Success) {
                    this.resSchedule.idSchedule = res.content
                    this.saveCostTour(this.resSchedule)
                  }
                  else{
                    this.isLoading = false
                  }
                  this.notificationService.handleAlertObj(res.notification)
                }, error => {
                  var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
                  this.notificationService.handleAlert(message, StatusNotification.Error)
                  this.isLoading = false
                })
              }
              else {
                this.scheduleService.update(this.resSchedule, this.resSchedule.idSchedule).subscribe(res => {
                  this.response = res
                  if (this.response.notification.type == StatusNotification.Success) {
                    this.resCostTour.idScheduleTmp = this.response.content
                    this.saveCostTour(this.resSchedule)
                  }
                  else{
                    this.isLoading = false
                  }
                  this.notificationService.handleAlertObj(res.notification)
                }, error => {
                  var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
                  this.notificationService.handleAlert(message, StatusNotification.Error)
                  this.isLoading = false
                })
              }
            } else {
              this.notificationService.handleAlert("Bạn cần thêm ít nhất 1 timeline !", StatusNotification.Warning)
              this.active = 3
              this.isLoading = false
            }
           } else {
            this.active = 3
            this.isLoading = false
           }
          } else {
            this.notificationService.handleAlert("Bạn cần nhập đầy đủ chi phí !", StatusNotification.Warning)
            this.active = 2
            this.isLoading = false
          }
        }
        else{
          this.active = 2
          this.isLoading = false
        }
    }
    else {
      this.notificationService.handleAlert("Bạn cần nhập đầy đủ lịch trình !", StatusNotification.Warning)
      this.active = 1
      this.isLoading = false
    }
  }



  saveCostTour(schedule){
    this.resCostTour.cusExpected = schedule.maxCapacity
    this.resCostTour.departureDate = schedule.departureDateDisplay
    this.resCostTour.returnDate = schedule.returnDateDisplay
    this.resCostTour.idSchedule = schedule.idSchedule
    if (this.type == "create") {
      this.costtourService.create(this.resCostTour).subscribe(res => {
        this.response = res
        if (this.response.notification.type == StatusNotification.Success) {
          this.saveTimeline(schedule)
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
    else {
      this.costtourService.update(this.resCostTour, this.resCostTour.idSchedule).subscribe(res => {
        this.response = res
        if (this.response.notification.type == StatusNotification.Success) {
          this.saveTimeline(schedule)
        }else{
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
  }

  saveTimeline(schedule){
    var countDelete = this.resTimelinelistDelete.length;
    var listDelete = this.resTimelinelistDelete
    this.resTimelinelist.forEach(timeline => {
      timeline.idScheduleTmp = this.resCostTour.idScheduleTmp
      timeline.idSchedule = schedule.idSchedule
    });

    if (this.type == "create") {
      this.timelineService.create(this.resTimelinelist).subscribe(res => {
        this.response = res
        this.isLoading = false
        if (this.response.notification.type == StatusNotification.Success) {
          setTimeout(() => {
            this.closeModal.nativeElement.click()
          }, 100);
        }
        else{
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
    else {
      this.timelineService.update(this.resTimelinelist).subscribe(res => {
        this.response = res
        this.isLoading = false

        if (this.response.notification.type == StatusNotification.Success) {
          setTimeout(() => {
            this.closeModal.nativeElement.click()
          }, 100);
        }else{
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })

      if(countDelete > 0){
        this.timelineService.delete(listDelete).subscribe(res => {
          this.response = res
          if (this.response.notification.type == StatusNotification.Success) {}
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
    }
  }

  btnAddTimeline() {
    this.validateTimeline = new ValidateTimelineModel
    this.validateTimeline = this.configService.validateTimeline(this.resTimeline, this.validateTimeline, this.resSchedule, Object.assign([], this.timelineList))

    if (this.validateTimeline.total == 0) {
      if(!this.isTimeline){

      this.resTimelinelist.push(Object.assign({}, this.resTimeline))
      this.resTimeline = new TimeLineModel()

      this.isChangeTimeline = false
      this.isChangeTimelineList = true

      if (this.resTimelinelist.length > 0) {
        this.resSchedule.isRemoveTimeLine = true
      }
      this.editorComponent.editorInstance.setData("")
      this.notificationService.handleAlert("Thêm thành công !", StatusNotification.Success)
      }
      else{
        this.resTimelinelist[this.indexTimeline] = this.resTimeline

        this.resTimeline = new TimeLineModel()
       this.isTimeline = false
       this.isChangeTimeline = false
       this.isChangeTimelineList = true
       this.editorComponent.editorInstance.setData("")
       this.notificationService.handleAlert("Sửa thành công !", StatusNotification.Success)
      }
    }

  }

  btnBackup(){
    this.resTimeline = Object.assign({}, this.resTimelineTmp)
    this.validateTimeline = new ValidateTimelineModel
    this.isChangeTimeline = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  btnUpdateTimeline(i: number){
    if(this.resTimelinelist){
      this.resTimeline = Object.assign({}, this.resTimelinelist[i])
      this.indexTimeline = i
      this.isTimeline = true
      this.resTimelineTmp = Object.assign({}, this.resTimeline)
    }
  }

  btnDeleteTimeline(i: number, listDelete: any){
    if(this.resTimelinelist){
      this.resTimelinelist.splice(i, 1);
      if(this.type == "detail"){
        this.resTimelinelistDelete.push(Object.assign({}, listDelete))
      }

      if (this.resTimelinelist.length == 0) {
        this.resSchedule.isRemoveTimeLine = true
      }
      this.isChangeTimelineList = true
      this.notificationService.handleAlert("Xóa thành công !", StatusNotification.Warning)
    }
  }

  btnResetTimeline(){
    this.resTimeline = new TimeLineModel()
    this.resTimelineTmp = new TimeLineModel()
    this.validateTimeline = new ValidateTimelineModel
    this.isTimeline = false
    // this.isChangeTimelineList = false
  }

  promotionChange(id: number) {
    console.log("ádsads")
    this.resPromotion.forEach(promotion => {
      if (promotion.idPromotion == id) {
        this.resSchedule.timePromotion = promotion.fromDate
        this.resSchedule.valuePromotion = promotion.value
        this.resSchedule.timePromotionDisplay = promotion.fromDateDisplay
        this.resSchedule.endTimePromotion = promotion.toDate
        this.resSchedule.endTimePromotionDisplay = promotion.toDateDisplay
      }
    });
  }

  close() {
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.resCostTour = Object.assign({}, this.resCostTourTmp)
    this.resTimeline = Object.assign({}   , this.resTimeline)
    this.resTimelinelist = Object.assign([], this.resTimelinelistTmp)
    this.validateScheduleModel = new ValidateScheduleModel
    this.validateCostTourModel = new ValidateCostTourModel
    this.validateTimeline = new ValidateTimelineModel
    this.isChange = false
    this.isChangeTimeline = false
    this.isTimeline = false
    this.isChangeTimelineList = false
    this.resTimelinelistDelete = []
    this.isFirst = true
    this.editorComponent.editorInstance.setData("")
    this.active = 1
    // if (this.type == "detail") {
    //   this.validateScheduleModel.isUpdate = true
    // }
    // this.parentType.emit(null);
  }

  backup() {
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.resCostTour = Object.assign({}, this.resCostTourTmp)
    this.resTimelinelist = Object.assign([], this.resTimelinelistTmp)
    this.validateCostTourModel = new ValidateCostTourModel
    this.validateScheduleModel = new ValidateScheduleModel
    this.validateTimeline = new ValidateTimelineModel
    this.isChange = false
    this.isChangeTimelineList = false

    if (this.type == "detail") {
      this.resSchedule.isUpdate = true
    }

    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }


  // delete() {
  //   if (this.resSchedule) {
  //     this.scheduleService.delete(this.resSchedule.idSchedule, this.auth.id).subscribe(res => {
  //       this.response = res
  //       this.notificationService.handleAlertObj(res.notification)
  //     }, error => {
  //       var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
  //       this.notificationService.handleAlert(message, StatusNotification.Error)
  //     })
  //   }
  // }

  // restoreSchedule() {
  //   if (this.resSchedule) {
  //     this.scheduleService.restore(this.resSchedule.idSchedule, this.auth.id).subscribe(res => {
  //       this.response = res
  //       this.notificationService.handleAlertObj(res.notification)
  //     }, error => {
  //       var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
  //       this.notificationService.handleAlert(message, StatusNotification.Error)
  //     })
  //   }
  // }

  getParentData(type?: string) {
    this.parentType.emit(type);
    this.parentData.emit(this.resSchedule);
  }

  formatInput(input: HTMLInputElement, property?: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    if (input.value) {
      if (property) {
        if (property == "distance" || property == "profit" || property == "minCapacity" || property == "maxCapacity" || property == "vat") {
          this.resCostTour[property] = Number(input.value)
        }
        else{
          this.resCostTour[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
        }
      }
      else{
        this.pageIndex = Number(input.value)
      }
    }
    else{
      this.resCostTour[property] = 0
    }
  }
  initScheduleOfCar(){
    this.carService.scheduleOfCard(this.resSchedule.carId, this.pageIndex, this.pageSize).subscribe(res => {
      this.response = res
      this.scheduleOfCar = this.response.content
      this.calStartEnd()
      this.calTotalResult(this.response.totalResult)
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
  openInfo(){
    this.initScheduleOfCar()
    this.fade.nativeElement.style.display = "block"
    this.card.nativeElement.style.display = "block"
    this.card.nativeElement.setAttribute("class","card_open card-cus")
  }

  closeInfo(){
    this.fade.nativeElement.removeAttribute("style")
    this.card.nativeElement.setAttribute("class","card_close card-cus")
    setTimeout(() => {
      this.card.nativeElement.removeAttribute("style")
    }, 300);
  }
  calStartEnd(){
    this.start = ((this.pageIndex - 1) * this.pageSize) + 1
    this.end = this.start + this.pageSize - 1
    for (let index = 0; index < this.scheduleOfCar.length; index++) {
      this.scheduleOfCar[index].rowNum = this.start + index
    }

  }
  calTotalResult(totalResult){
    if(totalResult % this.pageSize == 0){
      this.pageCount = totalResult / this.pageSize
    }
    else{
      this.pageCount = Math.floor(totalResult / this.pageSize + 1)
    }

    if (this.pageCount == 1) {
       this.btnNext = false
    }
    else{
      this.btnNext = true
    }
    this.index = (this.pageIndex - 1) * this.pageSize

  }
  selectPage(page: string, type: string) {
    var index = parseInt(page)
    if (type == 'prev' && index > 1) {
      this.pageIndex = index - 1
    }
    else if(type == 'next' && index < this.pageCount){
      this.pageIndex = index + 1
    }
    else if(type == 'nextAll'){
      this.pageIndex = this.pageCount
    }
    else if (type == 'prevAll') {
      this.pageIndex = 1
    }
    else{
      if (index > this.pageCount) {
        this.pageIndex = this.pageCount
      }
      else if (index == 0){
        this.pageIndex = 1
      }
      else{
        this.pageIndex = index
      }
    }

    if (this.pageIndex == 1) {
      this.btnPrev = false
    }
    else{
      this.btnPrev = true
    }

    if (this.pageIndex == this.pageCount) {
      this.btnNext = false
    }
    else{
      this.btnNext = true
    }

    this.initScheduleOfCar()
  }
}
