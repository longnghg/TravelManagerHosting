import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { DistrictService } from 'src/app/services_API/district.service';
import { WardService } from 'src/app/services_API/ward.service';
import { LocationModel } from "../../../models/location.model";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';

import { StatusNotification } from "../../../enums/enum";
@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss'],
})
export class ListLocationComponent implements OnInit {
  constructor(private wardService: WardService, private districtService: DistrictService, private provinceService: ProvinceService, private notificationService: NotificationService,
     private configService: ConfigService){}
  ngOnInit(): void {
  }
}
