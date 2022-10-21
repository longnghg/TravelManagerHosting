import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { CarService } from 'src/app/services_API/car.service';
import { CarModel } from 'src/app/models/Car.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-car',
  templateUrl: './item-car.component.html',
  styleUrls: ['./item-car.component.scss']
})
export class ItemCarComponent implements OnInit {

  response: ResponseModel
  @Input() resCar: CarModel
  @Input() type: string
  date: string
  dateView: string
  isEdit: boolean = false
  isChange: boolean = false
  resCarTmp: CarModel


  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resCar = new CarModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resCarTmp = Object.assign({}, this.resCar)
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

      if(this.type == "create")
      {
        this.carService.create(this.resCar).subscribe(res =>{
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

