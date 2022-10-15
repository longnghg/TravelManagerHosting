import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CarService } from '../../../services_API/car.service'
import { CarModel } from '../../../models/car.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {

  resCar: CarModel[]
  response: ResponseModel
  child: CarModel
  type: string

  constructor(private carService: CarService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.carService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resCar = this.response.content
      // console.log(this.resCar);

    })
  }

  childData(data: CarModel, type: string){
    this.type = type
  }

  getsCar(){
    this.carService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resCar = this.response.content
      console.log(this.resCar);

    })
  }

}
