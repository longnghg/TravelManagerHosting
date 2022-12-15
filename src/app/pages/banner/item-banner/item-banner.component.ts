import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';


import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { BannerModel, ValidationBannerModel } from 'src/app/models/banner.model';
import { BannerService } from 'src/app/services_API/banner.service';
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services_API/image.service';

@Component({
  selector: 'app-item-banner',
  templateUrl: './item-banner.component.html',
  styleUrls: ['./item-banner.component.scss']
})
export class ItemBannerComponent implements OnInit {
  @ViewChild('bannerImg') tourImg: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef
  @Input() resBanner: BannerModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  response: ResponseModel
  resBannerTmp: BannerModel
  formData: any
  img = []
  imgDetail: any[]
  imgRoot: any
  imgDelete: any
  idbanner: string
  nameNotify: string
  fileNotify: string
  validateBanner: ValidationBannerModel = new ValidationBannerModel
  isLoading: boolean
  files: any[]
  formDatas: any
  formDatasTmp: any
  resImage: ImageModel[] = []
  resImageTmp: ImageModel[] = []
  imgCreate:  any
  constructor(private bannerService: BannerService, private notificationService: NotificationService,
    private configService: ConfigService, private imageService: ImageService) { }

  ngOnInit(): void {

  }

  // ngOnChanges(): void {


  // }
  ngOnChanges(): void {
    if (this.type == "create") {
      this.resBanner = new BannerModel()
      this.img = []
      this.resImage = []
      this.imgCreate = "../../../../assets/img/tours/cross-sign.jpg"

     }
     else{
      if(this.resBanner){
        this.initImage(this.resBanner.idBanner)
      }
     }

     this.resBannerTmp = Object.assign({}, this.resBanner)

  }
  initImage(idBanner: any){
    this.imageService.getsbyidBanner(idBanner).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resImage = this.response.content
        this.resImageTmp = Object.assign([], this.resImage)
        console.log(this.resImage);
        this.resImage.forEach(image => {
          if (image.filePath) {
            this.img.push(image.filePath)


          }

        });
        console.log(this.img);
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  changeImg(e: any) {
    if (e.target.files.length > 0) {
      var files =  Object.assign([], e.target.files)
      var filesTmp = Object.assign([],  e.target.files);
      var check = 0
      var dt = new DataTransfer();
      files.forEach(file => {
        if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
          if (this.img) {
            this.img = Object.assign([], this.img)
          }
          else{
            this.img = []
          }

          if (this.type == "create") {
            if (this.formDatas) {
              this.resImage=[]
              dt = new DataTransfer();
              var image = new ImageModel
              filesTmp = Object.assign([], this.formDatasTmp)
              filesTmp.forEach(_fileTmp => {
                image.nameImage = _fileTmp.name
                this.resImage.push(Object.assign({}, image))
                dt.items.add(_fileTmp);
              });

              if (filesTmp.length < 6) {
                image.nameImage = file.name
                this.resImage.push(Object.assign({}, image))
                dt.items.add(file);
              }
              this.formDatas.target.files = dt.files
              this.formDatasTmp = dt.files
            }
            else{
              var image = new ImageModel
              image.nameImage = file.name
              this.resImage.push(Object.assign({}, image))
              dt.items.add(file);
              this.formDatas = e
              this.formDatasTmp = dt.files
            }

          }else{
           if (this.formDatas) {
            filesTmp = Object.assign([], this.formDatasTmp)
            this.resImage = Object.assign([], this.resImageTmp)
            dt = new DataTransfer();
            filesTmp.forEach(_fileTmp => {
                dt.items.add(_fileTmp);
            });
            console.log(this.resImage);

            if (this.resImage.length < 6) {
               var image = new ImageModel
              image.nameImage = file.name
              this.resImage.push(Object.assign({}, image))
              this.resImageTmp.push(Object.assign({}, image))
              dt.items.add(file);
            }
            this.formDatas.target.files = dt.files
            this.formDatasTmp = dt.files
           }
           else{
            var image = new ImageModel
            image.nameImage = file.name
            this.resImage.push(Object.assign({}, image))
            this.resImageTmp.push(Object.assign({}, image))
            dt.items.add(file);
            this.formDatas = e
            this.formDatasTmp = dt.files
           }
          }

          const reader = new FileReader();
          reader.onload = e =>{
            var length = this.img.length
            if (length < 6) {
              this.img.push(reader.result)

            }
          };
          reader.readAsDataURL(file)
        }
        else{
          filesTmp.splice(filesTmp.indexOf(file), 1)
          check++
        }
      });

      if (check > 0) {
        this.notificationService.handleAlert("Đã xóa [" + check + "] file không đúng định dạng hình ảnh !", StatusNotification.Error)
      }

    }

  }

  btnBannerImg(){
    this.tourImg.nativeElement.click()
}

btnDeleteImg(i: number, listDelete: any){
  if(this.img){
    if (this.formDatas && this.type == "create") {
      var files = Object.assign([], this.formDatas.target.files)
      files.splice(i, 1)
      var dt = new DataTransfer();
      files.forEach(file => {
        dt.items.add(file);
      });
      this.formDatas.target.files = dt.files
      this.formDatasTmp = dt.files
    }
    else
    {
      if (this.formDatas) {
        var files = Object.assign([], this.formDatas.target.files)
        files.forEach(file => {
          files.splice(file.name.indexOf(this.resImage[i].nameImage), 1)
        });

        var dt = new DataTransfer();
        files.forEach(file => {
          dt.items.add(file);
        });
        this.formDatas.target.files = dt.files
        this.formDatasTmp = dt.files
      }


      console.log(this.resImage);

      this.imgDelete.push(Object.assign({}, listDelete))
    }
    this.resImage.splice(i, 1)
      this.resImageTmp = Object.assign([], this.resImage)
    //this.imgRoot.splice(i, 1)
    this.img.splice(i, 1);

    this.notificationService.handleAlert("Xóa thành công !", StatusNotification.Success)
  }
}

save() {
  this.validateBanner = new ValidationBannerModel
  this.validateBanner =  this.configService.validateBanner(this.resBanner, this.validateBanner)
  if (this.validateBanner.total == 0) {
    if(this.img.length >= 4 && this.img.length <= 6){
      var files = new FormData();
      if (this.formDatas) {

        for (let index = 0; index < this.formDatas.path[0].files.length; index++) {
          files.append('files', this.formDatas.path[0].files[index]);
        }
      }

        this.bannerService.UploadBanner(files, this.resBanner.nameBanner).subscribe(res => {
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if (this.response.notification.type == StatusNotification.Success) {
            this.closeModal.nativeElement.click()
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
    }
    else{
      this.isLoading = false
      this.notificationService.handleAlert("Bạn phải thêm ít nhất 4 banner hoặc nhiều nhất 6 banner !", StatusNotification.Warning)
    }

  }
  else{
    this.isLoading = false
  }
  }

  getDataDelete(){
    this.parentDelete.emit(this.resBanner);
  }
  delete (){
    this.bannerService.delete(this.idbanner).subscribe(res => {
      this.response = res

    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
