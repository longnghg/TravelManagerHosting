import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../../../services_API/config.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ProvinceService } from 'src/app/services_API/province.service';
import { ResponsiveModel } from "../../../models/responsiveModels/responsive.model";
import { LocationModel } from "../../../models/location.model";
import { ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
  resLocation: LocationModel[]
  responsive: ResponsiveModel

  public columnDefs: ColDef[] = [
    // set filters
    // { field: 'Index',headerName: "", filter: false,},
    { field: 'Id', headerName: "Mã số", filter: 'agTextColumnFilter',},
    { field: 'Name',headerName: "Tên", filter: 'agTextColumnFilter'},

  ];

  constructor(private provinceService: ProvinceService, private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.provinceService.GetProvince().subscribe(res => {
      this.responsive = res

      if(this.responsive.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resLocation = JSON.parse(this.responsive.content)
      for (let index = 0; index < this.resLocation.length; index++) {

      }
        console.log(this.resLocation);
    })

    // this.provinceService.InsertProvince().subscribe(res => {
    //   this.responsive = res

  }

}
