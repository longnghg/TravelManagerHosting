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





}
