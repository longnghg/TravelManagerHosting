import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";

@Component({
  selector: 'app-item-province',
  templateUrl: './item-province.component.html',
  styleUrls: ['./item-province.component.scss']
})
export class ItemProvinceComponent implements OnInit {

  // nếu mà show item thôi thì LocationModel, còn nếu show danh sách thì LocationModel[] oke
  response: ResponsiveModel
  @Input() resProvince: LocationModel

  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    console.log(this.resProvince);

  }

  save(){
    console.log(this.resProvince);

    this.provinceService.InsertProvince(this.resProvince).subscribe(res =>{
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }
      alert("Thêm thành công")
      document.location.assign(this.configService.clientUrl + "/#/list-province")

    })
  }

}
