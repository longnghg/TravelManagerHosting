import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../models/location.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-location',
  templateUrl: './item-location.component.html',
  styleUrls: ['./item-location.component.scss']
})
export class ItemLocationComponent implements OnInit {
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
    this.resProvince = this.resParent
    if (this.type == "insert") {
      this.resProvince = new LocationModel()
    }
  }


  save(){
    // if (this.type == "insert") {
    //   this.provinceService.InsertProvince(this.resProvince).subscribe(res =>{
    //     this.response = res
    //     this.notificationService.handleAlertObj(res.notification)
    //   }, error => {
    //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //     this.notificationService.handleAlert(message, "Error")
    //   })
    // }
    // else{
    //   this.provinceService.UpdateProvince(this.resProvince).subscribe(res =>{
    //     this.response = res
    //     this.notificationService.handleAlertObj(res.notification)
    //   }, error => {
    //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //     this.notificationService.handleAlert(message, "Error")
    //   })
    // }
  }

}