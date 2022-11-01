import { Component, OnInit } from '@angular/core';
import { BannerModel } from 'src/app/models/banner.model';
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
    private configService: ConfigService) {  }
  files: any
  nameBanner: string

  resBanner: BannerModel[]
  response: ResponseModel
  type: string

  ngOnInit(): void {
    this._bannerService.gets().subscribe(res => {
    this.response = res
    if(!this.response.notification.type)
    {
      this.resBanner = this.response.content
    }
    else{
      this.notificationService.handleAlertObj(res.notification)
    }
  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, StatusNotification.Error)
  })

}
  changeImg(e){
    this.files = e
  }

  save(){
    var name = this.nameBanner;
    var files = this.files.path[0].files
    files[0].name = "kiet"
    console.log(files[0]);

    var file = new FormData();
                for (let index = 0; index < files.length; index++) {
                  file.append('files', files[index]);
                }
                file.append("nameBanner",name);
                // this._bannerService.UploadBanner(file).subscribe(res =>{
                // })
  }
}
