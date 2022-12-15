import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerModel, ValidationBannerModel } from 'src/app/models/banner.model';
import { ResponseModel } from 'src/app/models/responsiveModels/response.model';
import { BannerService } from "../../services_API/banner.service";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { StatusNotification } from "../../enums/enum";
import { ColDef, GridConfig} from '../../components/grid-data/grid-data.component';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  constructor(private _bannerService: BannerService, private notificationService: NotificationService,
    private configService: ConfigService) { }
  @ViewChild('filesImg') filesImg: ElementRef;
  files: any
  @ViewChild('closeModalDeleteLoad') closeModalDeleteLoad: ElementRef;
  nameBanner: string
  resListBanner: BannerModel[]
  resBanner: BannerModel
  response: ResponseModel
  type: string
  formData: any
  img: any
  idbanner: string
  nameNotify: string
  fileNotify: string
  validateBanner: ValidationBannerModel = new ValidationBannerModel
  isLoading: boolean
  pagination = new PaginationModel
  dataChild: BannerModel
  typeChild: string
  data: any
  public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "restoreCarModal",
      idModalDelete: "deleteCarModal",
      idModal: "gridCar",
      disableRadioBox: true,
      disableApprove: true
    }
  ngOnInit(): void {
    this.columnDefs= [
      { field: 'nameBanner', headerName: "Tên banner", style: "width: 45%;", searchable: true, searchType: 'text', searchObj: 'nameBanner'},
      { field: 'total', headerName: "Tổng hình", style: "width: 45%;"},
       ];

    this.gridConfig.pageSize = this.pagination.pageSize
    this.init(this.pagination, true)
  }

  init(e?, isNotShow?){
    if (e) {
      this._bannerService.search(Object.assign({}, e)).subscribe(res => {

        this.response = res
        if (this.response.notification.type == StatusNotification.Success) {
          this.resListBanner = this.response.content
        }
        else {

          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }





childData(e){
  this.dataChild = Object.assign({}, e)
}

childType(e){
  this.typeChild = e
}
getData(data: any){
  this.data = data
}

// getData(idBanner: string){
//   this.idbanner = idBanner
// }
delete(){
  console.log(this.data);
  if (this.data) {

    this._bannerService.delete(this.data.idBanner).subscribe(res => {
      this.response = res
      this.notificationService.handleAlertObj(res.notification)
      this.isLoading = false
      setTimeout(() => {
       this.closeModalDeleteLoad.nativeElement.click()
      }, 100);
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
      this.isLoading = false
    })
  }

}
}
