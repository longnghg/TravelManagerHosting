import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BannerModel, ValidationBannerModel } from 'src/app/models/banner.model';
import { ResponseModel } from 'src/app/models/responsiveModels/response.model';
import { BannerService } from "../../services_API/banner.service";
import { NotificationService } from "../../services_API/notification.service";
import { ConfigService } from "../../services_API/config.service";
import { StatusNotification } from "../../enums/enum";
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
  ngOnInit(): void {


    this._bannerService.gets().subscribe(res => {
      console.log(res);

      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resListBanner = this.response.content
      }
      else {
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })

  }
  changeImg(e) {
    if (e.target.files[0].type == "image/jpg" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png") {
      this.files = e
    }
    else {
      this.notificationService.handleAlert("Không đúng định dạng hình ảnh !", StatusNotification.Error)
    }
  }

  save() {
    this.validateBanner = new ValidationBannerModel
    var files = this.files.path[0].files
    var file = new FormData();
      for (let index = 0; index < files.length; index++) {
        file.append('files', files[index]);
      }
      this._bannerService.UploadBanner(file, this.nameBanner).subscribe(res => {
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (this.response.notification.type == StatusNotification.Success) {
              this.files = null
              this.filesImg.nativeElement.value = null
              this.nameBanner = null
        }
        this.isLoading = false
      }, error => {
        var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
}

getData(idBanner: string){
  this.idbanner = idBanner
}
delete (){
  this._bannerService.delete(this.idbanner).subscribe(res => {
    this.response = res

  }, error => {
    var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
    this.notificationService.handleAlert(message, StatusNotification.Error)
  })
}
}
