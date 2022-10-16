import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
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


  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.resCar = this.resCar
    if(this.type == "create"){
      this.resCar = new CarModel()
    }
    console.log(this.resCar);
  }

  save(){
    this.carService.create(this.resCar).subscribe(res =>{
      this.response = res
      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  // save(){
  //   if(this.type == "create")
  //   {
  //     this.carService.create(this.resCar).subscribe(res =>{
  //       this.response = res
  //       if(this.response.notification.type == "Error")
  //       {
  //         this.notificationService.handleAlertObj(res.notification)
  //       }
  //     }, error => {
  //       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
  //       this.notificationService.handleAlert(message, "Error")
  //     })
  //   }
  //   else{

  //   }
  // }

}
