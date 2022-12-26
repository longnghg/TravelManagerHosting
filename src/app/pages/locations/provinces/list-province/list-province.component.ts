import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ProvinceService } from '../../../../services_API/province.service';
import { DistrictService } from '../../../../services_API/district.service';

import { LocationModel } from "../../../../models/location.model";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { StatusNotification } from "../../../../enums/enum";
import { PaginationModel } from "../../../../models/responsiveModels/pagination.model";
@Component({
  selector: 'app-list-province',
  templateUrl: './list-province.component.html',
  styleUrls: ['./list-province.component.scss'],

})
export class ListProvinceComponent implements OnInit {
  @ViewChild('closeModalLoadDeleteProvince') closeModalLoadDeleteProvince: ElementRef;

  isLoading: boolean
  @Input() resDistrict: LocationModel[]
  dataChild: LocationModel
  typeChild: string
  resProvince: LocationModel[]
  pagination = new PaginationModel
  data: LocationModel
  response: ResponseModel
  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalDelete: "deleteProvinceModal",
    idModal: "gridProvince",
    disableRadioBox: true,
    disableApprove: true,
    disableLog: true,
    disableSchedule: true,
    disableDelete: true
  }

  constructor( private provinceService: ProvinceService, private districtService: DistrictService, private notificationService: NotificationService,
    private configService: ConfigService){}

  ngOnInit(): void {
    this.columnDefs= [
      // { field: 'idProvince', headerName: "Mã thành phố/tỉnh", searchable: true, searchType: 'text', searchObj: 'idProvince'},
      { field: 'nameProvince',headerName: "Tên thành phố/tỉnh", searchable: true, searchType: 'text', searchObj: 'nameProvince'},
      { field: 'total',headerName: "Tổng số quận/huyện", searchable: false},
    ];

    this.gridConfig.pageSize = this.pagination.pageSize
    this.search(this.pagination, true)
  }


  init(){
    this.provinceService.gets().subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resProvince = this.response.content

        this.districtService.views().then(response => {
          this.resDistrict = response
          if (this.resProvince) {
            this.resProvince.forEach(province => {
              province.total = 0
              if (this.resDistrict) {
                this.resDistrict.forEach(district => {
                  if (province.idProvince == district.provinceId) {
                    province.total += 1
                  }
                });
              }
            });
          }


        })

      }
      else{
        this.resProvince = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  search(e, isNotShow?){
    if (e) {
      this.provinceService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        console.warn(res);

        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resProvince = this.response.content
          this.totalDistrict()
        }
        else{
          this.resProvince = []
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
  totalDistrict(){
    this.districtService.views().then(response => {
      this.resDistrict = response
      if (this.resProvince) {
        this.resProvince.forEach(province => {
          province.total = 0
          if (this.resDistrict) {
            this.resDistrict.forEach(district => {
              if (province.idProvince == district.provinceId) {
                province.total += 1
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
    this.data = e
  }

  deleteProvince(){
    this.provinceService.delete(this.data.idProvince).subscribe(res =>{
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      this.isLoading = false
      this.ngOnInit()
      setTimeout(() => {
        this.closeModalLoadDeleteProvince.nativeElement.click()
       }, 100);
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
      this.isLoading = false
    })
   }
}
