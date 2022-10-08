import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-province',
  templateUrl: './item-province.component.html',
  styleUrls: ['./item-province.component.scss']
})
export class ItemProvinceComponent implements OnInit {

  // nếu mà show item thôi thì LocationModel, còn nếu show danh sách thì LocationModel[] oke
  response: ResponseModel
  @Input() resParent: LocationModel
  @Input() type: string
  resProvince: LocationModel
  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {

    // this.resProvince = Object.assign({}, this.resParent)
    this.resProvince = this.resParent
    console.log(this.resProvince);
    console.log(this.type);
    if (this.type == "insert") {
      this.resProvince.name = ""
    }
  }


  save(){
    if (this.type == "insert") {
      this.provinceService.InsertProvince(this.resProvince).subscribe(res =>{
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
    else{
      this.provinceService.UpdateProvince(this.resProvince).subscribe(res =>{
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
    console.log(this.resProvince);


  }

}
