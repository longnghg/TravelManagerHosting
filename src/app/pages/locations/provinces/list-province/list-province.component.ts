import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from '../../../../services_API/province.service';
import { DistrictService } from '../../../../services_API/district.service';

import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


@Component({
  selector: 'app-list-province',
  templateUrl: './list-province.component.html',
  styleUrls: ['./list-province.component.scss']
})
export class ListProvinceComponent implements OnInit {
  @Output() parentLocationDel = new EventEmitter<any>()
  dataChild: LocationModel
  typeChild: string
  resProvince: LocationModel[]
  resDistrict: LocationModel[]
  response: ResponseModel
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalDelete: "deleteProvinceModal",
    idModal: "gridProvince",
    radioBox: false,
  }

  private hubConnectionBuilder!: HubConnection;
  constructor(private provinceService: ProvinceService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}

  ngOnInit(): void {
    this.init();
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:44394/travelhub').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(()=> console.log("Da ket noi")).catch(err => console.log("error"));
    this.hubConnectionBuilder.on('Insert', (result: any) => {
      this.provinceService.views().then(response => {
        this.resProvince = response
      })
      console.log("finisheed");
    })

    this.districtService.views().then(response => {
      this.resDistrict = response
    })

    setTimeout(() => {
      this.columnDefs= [
        { field: 'idProvince', headerName: "Mã thành phố/tỉnh", searchable: true, searchType: 'text', searchObj: 'idProvince'},
        { field: 'nameProvince',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'text', searchObj: 'nameProvince'},
        { field: 'total',headerName: "Tổng số quận/huyện", searchable: false},
      ];
      if (this.resProvince) {
        this.resProvince.forEach(province => {
          province.total = 0
          if (this.resDistrict) {
            this.resDistrict.forEach(district => {
              if (province.idProvince == district.idProvince) {
                province.total += 1
              }
            });
          }
        });
      }

    }, 200);
  }
  init(e?){
    this.provinceService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resProvince = this.response.content
      }
      else{
        this.resProvince = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })


  }

  search(e?){
    if (e) {
      this.provinceService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resProvince = this.response.content
        }
        else{
          this.resProvince = null
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
      this.dataChild = Object.assign({}, e)
    }

  }

  childType(e){
    if (e) {
      this.typeChild = e
    }
  }

  parentDelete(e){
    this.parentLocationDel.emit(e);
  }

}
