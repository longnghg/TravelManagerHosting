import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-item-customer',
  templateUrl: './item-customer.component.html',
  styleUrls: ['./item-customer.component.scss']
})
export class ItemCustomerComponent implements OnInit {
  response: ResponseModel
  @Input() resCustomer: CustomerModel
  @Input() type: string
  isEdit: boolean = false
  isChange: boolean = false
  resCustomerTmp: CustomerModel

  constructor(private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    
    if(this.type = 'create'){
      
    }else{
      this.isEdit = false
    }
    this.resCustomerTmp = Object.assign({}, this.resCustomer)
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
    if (JSON.stringify(this.resCustomer) != JSON.stringify(this.resCustomerTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resCustomer = Object.assign({}, this.resCustomer)
    this.isChange = false
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

    close(){
      if (this.type == 'detail') {
        this.isEdit = false
      }
       this.restore()
    }
}
