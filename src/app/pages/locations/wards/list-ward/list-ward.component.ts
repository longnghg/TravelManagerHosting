import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from '../../../../services_API/district.service';
import { WardService } from '../../../../services_API/ward.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
@Component({
  selector: 'app-list-ward',
  templateUrl: './list-ward.component.html',
  styleUrls: ['./list-ward.component.scss']
})
export class ListWardComponent implements OnInit {
  @Output() dataDistrict = new EventEmitter<LocationModel[]>()
  dataChild: LocationModel
  typeChild: string
  resDistrict: LocationModel[]
  resWard: LocationModel[]
  response: ResponseModel
  child: LocationModel
  type: string
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModal: "gridWard",
    radioBox: false,
  }
  constructor( private wardService: WardService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}
  ngOnInit(): void {
    this.init();

    this.districtService.views().then(response => {
      this.resDistrict = response
    })
    setTimeout(() => {

      this.columnDefs= [
        { field: 'idWard', headerName: "Mã phường/xã", searchable: true, searchType: 'text', searchObj: 'idWard'},
        { field: 'nameWard',headerName: "Tên phường/xã", searchable: true, searchType: 'text', searchObj: 'nameWard'},
        { field: 'districtName',headerName: "Tên quận/huyện", searchable: true, searchType: 'section', searchObj: 'idDistrict', multiple: true, closeOnSelect: false, bindLabel: 'nameDistrict', bindValue: "idDistrict", listSection: this.resDistrict},
      ];

    }, 200);
  }
  init(e?){
    this.wardService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resWard = this.response.content
        console.log(this.resDistrict);

      }
      else{
        this.resWard = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
  }

  search(e?){
    if (e) {
      this.wardService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resWard = this.response.content
        }
        else{
          this.resWard = null
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
  }

  childData(e){
    if (e) {
      this.dataChild = e
    }

  }

  childType(e){
    if (e) {
      this.typeChild = e
    }
  }

}
