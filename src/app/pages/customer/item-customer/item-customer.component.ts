import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { Config } from 'protractor';

@Component({
  selector: 'app-item-customer',
  templateUrl: './item-customer.component.html',
  styleUrls: ['./item-customer.component.scss']
})
export class ItemCustomerComponent implements OnInit {
  response: ResponseModel
  @Input()   resCustomer: CustomerModel
  @Input() type: string

  constructor(private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.type = "create"){
      this.resCustomer = new CustomerModel()
    }
    console.log((this.resCustomer));
  }

  save(){
   this.customerService.create(this.resCustomer).subscribe(res =>{
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
}
