import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild  } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { CarService } from 'src/app/services_API/car.service';
import { CarModel, ValidationCarModel } from 'src/app/models/Car.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-item-car',
  templateUrl: './item-car.component.html',
  styleUrls: ['./item-car.component.scss']
})
export class ItemCarComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  validateCar: ValidationCarModel = new ValidationCarModel
  auth: AuthenticationModel
  response: ResponseModel
  @Input() resCar: CarModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  date: string
  dateView: string
  isChange: boolean = false
  resCarTmp: CarModel
  isLoading: boolean


  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) {

     }

     listStatus = this.configService.listStatusCar()
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    console.log(this.auth);

  }

  ngOnChanges(): void {
    if (this.type == "create") {
      this.resCar = new CarModel()
     }
     if (this.resCar){
      this.resCar.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resCar.modifyDate)
     }
     this.resCarTmp = Object.assign({}, this.resCar)
  }


  inputChange(){
    if (JSON.stringify(this.resCar) != JSON.stringify(this.resCarTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

//check lat xoa
  backup(){
    this.resCar = Object.assign({}, this.resCarTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }
  save(){
    this.validateCar = new ValidationCarModel
    this.validateCar =  this.configService.validateCar(this.resCar, this.validateCar)
      if (this.validateCar.total == 0)
      {
        this.resCar.idUserModify = this.auth.id
          if(this.type == "create")
          {
            this.carService.create(this.resCar).subscribe(res =>{
              this.response = res
              this.notificationService.handleAlertObj(res.notification)
                if(this.response.notification.type == StatusNotification.Success)
                  {
                    this.resCar = Object.assign({}, new CarModel)
                    this.resCarTmp = Object.assign({}, new CarModel)
                    this.validateCar = new ValidationCarModel
                    this.isChange = false
                    this.isLoading = false
                  }
                  }, error => {
                    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
                    this.notificationService.handleAlert(message, StatusNotification.Error)
                    this.isLoading = false
                  })
          }
          else{
            this.carService.update(this.resCar, this.resCar.idCar).subscribe(res =>{
              this.response = res
              this.notificationService.handleAlertObj(res.notification)

              if(this.response.notification.type == StatusNotification.Success)
              {
                this.isChange = false
                this.isLoading = false
                this.closeModal.nativeElement.click()
              }
            }, error => {
              this.isLoading = false
              var message = this.configService.error(error.status, error.error != null?error.error.text:"");
              this.notificationService.handleAlert(message, StatusNotification.Error)
            })
          }
      }
      else{
        this.isLoading = false
      }
    }
      close(){
        this.resCar = Object.assign({}, this.resCarTmp)
        this.validateCar = new ValidationCarModel

        this.isChange = false
        this.parentType.emit(null);
     }
    }


