import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from 'src/app/services_API/district.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";

@Component({
  selector: 'app-list-districts',
  templateUrl: './list-districts.component.html',
  styleUrls: ['./list-districts.component.scss']
})
export class ListDistrictsComponent implements OnInit {

  resDistrict: LocationModel[]
  responses: ResponsiveModel
  child: LocationModel
  type: string

  constructor(private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}

  ngOnInit(): void {


  }

  childData(data: LocationModel, type: string){
    this.child = data
    this.type = type
  }

}
