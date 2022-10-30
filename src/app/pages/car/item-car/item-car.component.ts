import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { CarService } from 'src/app/services_API/car.service';
import { CarModel, ValidationCarModel } from 'src/app/models/Car.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-car',
  templateUrl: './item-car.component.html',
  styleUrls: ['./item-car.component.scss']
})
export class ItemCarComponent implements OnInit {
  validateCar: ValidationCarModel = new ValidationCarModel
  response: ResponseModel
  @Input() resCar: CarModel
  @Input() type: string
  date: string
  dateView: string
  isChange: boolean = false
  resCarTmp: CarModel


  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.type == "create") {
      this.resCar = new CarModel()
     }

     this.resCarTmp = Object.assign({}, this.resCar)
  }


  inputChange(){
    console.log(JSON.stringify(this.resCar));
    console.log(JSON.stringify(this.resCarTmp));
    if (JSON.stringify(this.resCar) != JSON.stringify(this.resCarTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resCar = Object.assign({}, this.resCarTmp)
    this.isChange = false
  }

  save(){
    console.log(this.resCar);

    this.validateCar = new ValidationCarModel
    this.validateCar =  this.configService.validateCar(this.resCar, this.validateCar)
    console.log(this.validateCar);

    if (this.validateCar.total == 0) {
      if(this.type == "create"){
        this.carService.create(this.resCar).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      // else{
      //   this.carService.update(this.resRole).subscribe(res =>{
      //     this.response = res
      //     this.notificationService.handleAlertObj(res.notification)

      //     this.isChange = false
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, "Error")
      //   })
      // }
    }
  }

  close(){
     this.restore()
  }
}


