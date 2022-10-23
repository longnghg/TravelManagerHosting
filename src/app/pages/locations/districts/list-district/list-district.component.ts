import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { DistrictService } from '../../../../services_API/district.service';
import { ProvinceService } from '../../../../services_API/province.service';
import { WardService } from '../../../../services_API/ward.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-list-district',
  templateUrl: './list-district.component.html',
  styleUrls: ['./list-district.component.scss']
})
export class ListDistrictComponent implements OnInit {
  @Output() parentLocationDel = new EventEmitter<any>()
  @Input() resProvince: LocationModel[]
  @Input() resWard: LocationModel[]
  dataChild: LocationModel
  typeChild: string
  resDistrict: LocationModel[]
  response: ResponseModel
  private hubConnectionBuilder: HubConnection
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalDelete: "deleteDistrictModal",
    idModal: "gridDistrict",
    radioBox: false,
  }
  constructor(private provinceService: ProvinceService, private wardService: WardService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}
  ngOnInit(): void {
    this.init()
    this.hubConnectionBuilder = this.configService.signIR()
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.init()
    })

  }

  init(){
    this.districtService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resDistrict = this.response.content
        this.totalWard()
      }
      else{
        this.resDistrict = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })


    this.provinceService.views().then(response => {
      this.resProvince = response
    })

     setTimeout(() => {


       this.columnDefs= [
        // { field: 'idDistrict', headerName: "Mã quận/huyện", searchable: true, searchType: 'text', searchObj: 'idDistrict'},
        { field: 'nameDistrict',headerName: "Tên quận/huyện", searchable: true, searchType: 'text', searchObj: 'nameDistrict'},
        { field: 'provinceName',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'section', searchObj: 'provinceId', multiple: true, closeOnSelect: false, bindLabel: 'nameProvince', bindValue: "idProvince", listSection: this.resProvince},
        { field: 'total',headerName: "Tổng số phường/xã", searchable: false},
      ];
    }, 200);
  }

  search(e?){
    if (e) {
      this.districtService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resDistrict = this.response.content
          this.totalWard()
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

  totalWard(){
    this.wardService.views().then(response => {
      this.resWard = response
      if (this.resDistrict) {
        this.resDistrict.forEach(district => {
          district.total = 0
          if (this.resWard) {
            this.resWard.forEach(ward => {
              if (district.idDistrict == ward.districtId) {
                district.total += 1
              }
            });
          }
        });
       }
    })
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

  parentDelete(e){
    this.parentLocationDel.emit(e);
  }

}
