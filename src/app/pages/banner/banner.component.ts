import { Component, OnInit } from '@angular/core';
import { BannerService } from "../../services_API/banner.service";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(private _bannerService: BannerService) {  }
  files: any
  nameBanner: string
  ngOnInit(): void {
  }

  changeImg(e){
    this.files = e
  }

  save(){
    var name = this.nameBanner;
    var files = this.files.path[0].files
    var file = new FormData();
                for (let index = 0; index < files.length; index++) {
                  file.append('files', files[index]);
                }
                file.append("nameBanner",name);
                this._bannerService.UploadBanner(file).subscribe(res =>{
                })
  }

}
