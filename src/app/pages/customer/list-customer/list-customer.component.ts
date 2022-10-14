import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  resCustomer: CustomerModel[]
  response: ResponseModel
  child: CustomerModel
  type: string
  constructor(private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }
  ngOnInit(): void {
    this.customerService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      this.resCustomer = this.response.content
    })
  }
  childData(data: CustomerModel, type: string){
    this.child = data
    this.type = type
  }
}

