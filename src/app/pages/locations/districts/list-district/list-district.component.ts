import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from '../../../../services_API/district.service';
import { ProvinceService } from '../../../../services_API/province.service';
import { WardService } from '../../../../services_API/ward.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
@Component({
  selector: 'app-list-district',
  templateUrl: './list-district.component.html',
  styleUrls: ['./list-district.component.scss']
})
export class ListDistrictComponent implements OnInit {
  @Output() dataDistrict = new EventEmitter<LocationModel[]>()
  dataChild: LocationModel
  typeChild: string
  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  resWard: LocationModel[]
  response: ResponseModel
  child: LocationModel
  type: string
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModal: "gridDistrict",
    radioBox: false,
  }
  constructor(private provinceService: ProvinceService, private wardService: WardService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}
  ngOnInit(): void {
    this.init();

    this.provinceService.views().then(response => {
      this.resProvince = response
    })

    this.wardService.views().then(response => {
      this.resWard = response
    })
    setTimeout(() => {
      this.resDistrict.forEach(district => {
        district.total = 0
        this.resWard.forEach(ward => {
          if (district.idDistrict == ward.idDistrict) {
            district.total += 1
          }
        });
      });

      this.columnDefs= [
        { field: 'idDistrict', headerName: "Mã quận/huyện", searchable: true, searchType: 'text', searchObj: 'idDistrict'},
        { field: 'nameDistrict',headerName: "Tên quận/huyện", searchable: true, searchType: 'text', searchObj: 'nameDistrict'},
        { field: 'provinceName',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'section', searchObj: 'idProvince', multiple: true, closeOnSelect: false, bindLabel: 'nameProvince', bindValue: "idProvince", listSection: this.resProvince},
        { field: 'total',headerName: "Tổng số phường/xã", searchable: false},
      ];

    }, 200);
  }
  init(e?){
    this.districtService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resDistrict = this.response.content
      }
      else{
        this.resDistrict = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })

  }

  search(e?){
    if (e) {
      this.districtService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resDistrict = this.response.content
        }
        else{
          this.resDistrict = null
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
