import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from "../../../services_API/schedule.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { CarModel } from 'src/app/models/car.model';
import { CarService } from 'src/app/services_API/car.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services_API/employee.service';
import { TourModel } from 'src/app/models/tour.model';
import { TourService } from 'src/app/services_API/tour.service';
import { PromotionModel } from 'src/app/models/promotion.model';
@Component({
  selector: 'app-item-tour-schedule',
  templateUrl: './item-tour-schedule.component.html',
  styleUrls: ['./item-tour-schedule.component.scss']
})
export class ItemTourScheduleComponent implements OnInit {
  @Input() resSchedule: ScheduleModel
  @Input() type: string
  resCar: CarModel[]
  resEmployee: EmployeeModel[]
  resTour: TourModel[]
  resPromotion: PromotionModel[]
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resScheduleTmp: ScheduleModel
  idTour: any

  constructor(private scheduleService: ScheduleService, private configService: ConfigService, private notificationService: NotificationService,
    private employeeService: EmployeeService, private carService: CarService, private tourService: TourService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.init()
    console.log(this.resSchedule);


    if(this.type == 'create'){
      this.resSchedule = new ScheduleModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resScheduleTmp = Object.assign({}, this.resSchedule)

    if(this.resScheduleTmp){

        this.resScheduleTmp.departureDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.departureDate))
        this.resScheduleTmp.returnDate = this.configService.formatFromUnixTimestampToFullDateView(Number.parseInt(this.resSchedule.returnDate))
        this.resScheduleTmp.beginDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.beginDate))
        this.resScheduleTmp.endDate = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.endDate))
        this.resScheduleTmp.timePromotion = this.configService.formatFromUnixTimestampToFullDate(Number.parseInt(this.resSchedule.timePromotion))


    }

  }

  init(e?){
    this.employeeService.views(e).then(response =>{
      this.resEmployee = response
    })
    this.carService.views().then(response =>{
      this.resCar = response
    })
    this.tourService.views().then(response =>{
      this.resTour = response
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
    if (JSON.stringify(this.resSchedule) != JSON.stringify(this.resScheduleTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resSchedule = Object.assign({}, this.resScheduleTmp)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.idTour = localStorage.getItem("idTour")
        this.resSchedule.tourId  = this.idTour
        this.scheduleService.create(this.resSchedule).subscribe(res =>{
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
