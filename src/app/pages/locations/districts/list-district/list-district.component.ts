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
import { StatusNotification } from "../../../../enums/enum";
import { PaginationModel } from "../../../../models/responsiveModels/pagination.model";
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
  pagination = new PaginationModel
  private hubConnectionBuilder: HubConnection
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalDelete: "deleteDistrictModal",
    idModal: "gridDistrict",
    disableRadioBox: true,
    disableApprove: true,
  }
  constructor(private provinceService: ProvinceService, private wardService: WardService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}
  ngOnInit(): void {
    this.provinceService.views().then(response => {
      this.resProvince = response
      this.columnDefs= [
        // { field: 'idDistrict', headerName: "Mã quận/huyện", searchable: true, searchType: 'text', searchObj: 'idDistrict'},
        { field: 'nameDistrict',headerName: "Tên quận/huyện", searchable: true, searchType: 'text', searchObj: 'nameDistrict'},
        { field: 'provinceName',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'section', searchObj: 'provinceId', multiple: true, closeOnSelect: false, bindLabel: 'nameProvince', bindValue: "idProvince", listSection: this.resProvince},
        { field: 'total',headerName: "Tổng số phường/xã", searchable: false},
      ];
    })

    this.gridConfig.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
    this.hubConnectionBuilder = this.configService.signIR()
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.search(this.pagination, true)
    })

  }

  init(){
    this.districtService.gets().subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
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
      this.notificationService.handleAlert(message, StatusNotification.Error);
    })


    this.provinceService.views().then(response => {
      this.resProvince = response
      this.columnDefs= [
        // { field: 'idDistrict', headerName: "Mã quận/huyện", searchable: true, searchType: 'text', searchObj: 'idDistrict'},
        { field: 'nameDistrict',headerName: "Tên quận/huyện", searchable: true, searchType: 'text', searchObj: 'nameDistrict'},
        { field: 'provinceName',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'section', searchObj: 'provinceId', multiple: true, closeOnSelect: false, bindLabel: 'nameProvince', bindValue: "idProvince", listSection: this.resProvince},
        { field: 'total',headerName: "Tổng số phường/xã", searchable: false},
      ];
    })
  }

  search(e, isNotShow?){
    if (e) {
      this.districtService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resDistrict = this.response.content
          this.totalWard()
        }
        else{
          this.resDistrict = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
        }
        this.gridConfig.totalResult = this.response.totalResult
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
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
