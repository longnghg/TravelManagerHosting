import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from '../../../../services_API/district.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-item-districts',
  templateUrl: './item-districts.component.html',
  styleUrls: ['./item-districts.component.scss']
})
export class ItemDistrictsComponent implements OnInit {

  respon: ResponseModel
  @Input() resParent: LocationModel
  @Input() type: string
  resDistrict: LocationModel

  constructor(private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {


  }
  ngOnChanges(): void {
    this.resDistrict = this.resParent
    if (this.type == "insert") {
      this.resDistrict.name = ""
    }
  }

  save(){

    if (this.type == "insert") {
      this.districtService.InsertDistrict(this.resDistrict).subscribe(res =>{
        this.respon = res
        this.notificationService.handleAlertObj(res.notification)

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    else{
      this.districtService.UpdateDistrict(this.resDistrict).subscribe(res =>{
        this.respon = res
        this.notificationService.handleAlertObj(res.notification)

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }



  }


}
