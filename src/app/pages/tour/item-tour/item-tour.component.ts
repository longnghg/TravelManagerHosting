import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TourModel, ValidateTourModel } from 'src/app/models/tour.model';
import { TourService } from "src/app/services_API/tour.service"
import { NotificationService } from "./../../../services_API/notification.service";
import { ProvinceService } from "./../../../services_API/province.service";
import { ConfigService } from "./../../../services_API/config.service";
import { ResponseModel } from "./../../../models/responsiveModels/response.model";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { LocationModel } from 'src/app/models/location.model';
import { StatusNotification } from "../../../enums/enum";
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services_API/image.service';
@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {
  @ViewChild('tourImg') tourImg: ElementRef;
  resTour: TourModel
  type: string
  validateTourModel: ValidateTourModel = new ValidateTourModel
  response: ResponseModel
  isChange: boolean = false
  resProvince: LocationModel[]
  resImage: ImageModel[] = []
  resImageDelete: ImageModel[] = []
  isChangeStar: boolean = false
  resTourTmp: TourModel
  isHoliday = this.configService.listStatus()
  img: any
  imgDetail = []
  formData: any
  formDatas: any
  resAuth: AuthenticationModel
  active = 1;
  activePane = 0;
  listStar: any
  constructor(private provinceService: ProvinceService,private router: Router, private tourService: TourService, private configService: ConfigService, private notificationService: NotificationService,
      private activatedRoute: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit(): void {
    this.resAuth = JSON.parse(localStorage.getItem("currentUser"))
    this.listStar = this.configService.list10Star()
    this.provinceService.views().then(res => {
      this.resProvince = res
    })
    var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
    this.type = this.activatedRoute.snapshot.paramMap.get('id1')
    if(this.type == "create"){

      this.resTour = new TourModel
      this.resTourTmp = Object.assign({}, this.resTour)

      if(this.resTour){
        if (this.resTour.thumbnail) {
          this.img = this.configService.apiUrl + this.resTour.thumbnail
          // http://res.cloudinary.com/ddv2idi9d/image/upload/v1669909900/Uploads/Tour/GR-1669909897520/2022121/2022121225137_pvc11b.png
        }
        else{
          this.img = "../../../../assets/img/tours/cross-sign.jpg"

          this.imgDetail[0] = "../../../../assets/img/tours/cross-sign.jpg"
          this.imgDetail[1] = "../../../../assets/img/tours/cross-sign.jpg"
          this.imgDetail[2] = "../../../../assets/img/tours/cross-sign.jpg"
          this.imgDetail[3] = "../../../../assets/img/tours/cross-sign.jpg"
        }
      }

    }
    else{
      this.init(idTour)
      this.initImage(idTour)
    }
  }

  onTabChange($event: number) {
    this.activePane = $event;
    if (this.activePane == 1) {

    }
    // console.log('onTabChange', $event);
  }

  init(idTour){
    this.tourService.getTour(idTour).subscribe(res => {
      this.response = res

      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resTour = this.response.content
        if(this.resTour){
          if (this.resTour.thumbnail) {
            this.img = this.configService.apiUrl + this.resTour.thumbnail
          }
          else{
            this.img = "../../../../assets/img/tours/cross-sign.jpg"
          }
          this.resTour.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resTour.modifyDate)
          this.resTourTmp = Object.assign({}, this.resTour)
        }
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initImage(idTour){
    this.imageService.getsbyidTour(idTour).subscribe(res => {
      this.response = res

      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resImage = this.response.content

        this.resImage.forEach(image => {
          if (image.filePath) {
            this.imgDetail.push(image.filePath)
          }
        });
        if (this.resImage.length < 4) {
          for (let index = 0; index < 4 - this.resImage.length; index++) {
            this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
          }
        }
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  backup(){
    this.resTour = Object.assign({}, this.resTourTmp)
    if (this.resTour.thumbnail) {
      this.img = this.configService.apiUrl + this.resTour.thumbnail
    }
    else{
      this.img = "../../../../assets/img/tours/cross-sign.jpg"
    }
    this.resTour.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resTour.modifyDate)
    this.isChange = false
    this.isChangeStar = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  inputChange(){
    if (JSON.stringify(this.resTour) != JSON.stringify(this.resTourTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  startChange(){
    if (this.resTour.rating != this.resTourTmp.rating) {
      this.isChangeStar = true
    }
    else{
      this.isChangeStar = false
    }
  }

  changeImg(e: any){
    this.formData = e
    console.log(e);

    if (e.target.files[0].type == "image/jpg" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png") {
      if (e.target.files && e.target.files[0]){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.img = reader.result;
        reader.readAsDataURL(file)

        this.resTour.thumbnail = this.img
      }
    }
    else{
      this.notificationService.handleAlert("Không đúng định dạng hình ảnh !", StatusNotification.Error)
    }
  }

  btnTourImg(){
      this.tourImg.nativeElement.click()
  }

  changeTourImg(e: any){
    this.formDatas = e
    var files = Object.assign([], e.target.files);
    var filesTmp = Object.assign([], e.target.files);
    this.imgDetail = []
    var check = 0
    files.forEach(file => {
      if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
        const reader = new FileReader();
        reader.onload = e => this.imgDetail.push(reader.result);
        reader.readAsDataURL(file)
      }
      else{
        filesTmp.splice(filesTmp.indexOf(file), 1)
        check++
      }
   });


   if (check > 0) {
    files = filesTmp
    var dt = new DataTransfer();
    files.forEach(file => {
      dt.items.add(file );
    });

    this.formDatas.target.files = dt.files
    this.notificationService.handleAlert("Không đúng định dạng hình ảnh !", StatusNotification.Error)
   }
    setTimeout(() => {
      if (files.length < 4) {
        for (let index = 0; index < 4 - files.length; index++) {
          this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
        }
      }
    }, 100);
  }

  btnDeleteImg(i: number, listDelete: any){

    if(this.imgDetail){
      this.imgDetail.splice(i, 1);

      if(this.type == "create"){
        var files = this.formDatas.target.files;
        var a = Array.from(files)
        a.splice(i, 1)

        var dt = new DataTransfer();
        files.forEach(file => {
         dt.items.add(file );
         });

       console.log(this.formDatas.target.files);
       console.log(listDelete);

      }

      if(this.resImage){
        this.resImageDelete.push(Object.assign({}, listDelete))
      }

      if (this.imgDetail.length < 4) {
        for (let index = 0; index < 4 - this.imgDetail.length; index++) {
          this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
        }
      }

      this.notificationService.handleAlert("Xóa thành công !", StatusNotification.Warning)
    }
  }

  save(){
    this.validateTourModel = new ValidateTourModel
    this.validateTourModel =  this.configService.validateTour(this.resTour, this.validateTourModel)

    if (this.validateTourModel.total == 0) {
      this.resTour.idUserModify = this.resAuth.id


      var file = new FormData();
      var files = new FormData();
      file.append('data', JSON.stringify(this.resTour))

      if (this.formData) {
        file.append('file', this.formData.path[0].files[0])
      }

      if (this.formDatas) {
        for (let index = 0; index < this.formDatas.path[0].files.length; index++) {
          files.append('files', this.formDatas.path[0].files[index]);
        }
      }

      if(this.type == "create")
      {
        this.tourService.create(file).subscribe(res =>{
          this.response = res

          if (res.notification.type == StatusNotification.Success) {
            var idTour = this.response.content
            this.createImageTourdetail(files, idTour)

            this.router.navigate(['','list-tour']);
          }
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        this.resTour.idUserModify = this.resAuth.id

        var file = new FormData();
        var files = new FormData();
        file.append('data', JSON.stringify(this.resTour))

        if (this.formData) {
          file.append('file', this.formData.path[0].files[0])
        }

        if (this.formDatas) {
          for (let index = 0; index < this.formDatas.path[0].files.length; index++) {
            files.append('files', this.formDatas.path[0].files[index]);
          }
        }

        this.tourService.update(file, this.resTour.idTour).subscribe(res =>{
          this.response = res

          if (res.notification.type == StatusNotification.Success) {

            this.createImageTourdetail(files, this.resTour.idTour)


            if(this.resImageDelete.length > 0){
              this.deleteImageTourdetail(this.resImageDelete)
            }
            this.router.navigate(['','list-tour']);
          }
          else{
            this.notificationService.handleAlertObj(res.notification)
          }

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
    }
    else{
      if (this.validateTourModel.thumbnail) {
        this.notificationService.handleAlert(this.validateTourModel.thumbnail, StatusNotification.Warning)
      }
    }
  }



  delete(){
    if (this.resTour) {
     this.tourService.delete(this.resTour.idTour, this.resAuth.id).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
       if (res.notification.type == StatusNotification.Success) {
        this.router.navigate(['','list-tour']);
       }
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
   }

   restoreTour(){
    if (this.resTour) {
      this.tourService.restore(this.resTour.idTour, this.resAuth.id).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == StatusNotification.Success) {
          this.router.navigate(['','list-tour'], { state: { isDelete: true } });
         }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  approve(){
    if (this.resTour) {
      this.tourService.approve(this.resTour.idTour).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == StatusNotification.Success) {
          this.router.navigate(['','list-tour'], { state: { isDelete: false } });
         }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  refused(){
    if (this.resTour) {
      this.tourService.refused(this.resTour.idTour).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == StatusNotification.Success) {
          this.router.navigate(['','list-tour'], { state: { isDelete: false } });
         }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  ratingTour(){
    this.tourService.ratingTour(this.resTour.rating, this.resTour.idTour).subscribe(res =>{
      this.response = res

      if (res.notification.type == StatusNotification.Success) {
        this.router.navigate(['','list-tour']);
      }
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  createImageTourdetail(data, idTour){
    this.imageService.createImageIdTour(data, idTour).subscribe(res =>{
      this.response = res
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  deleteImageTourdetail(data){
    this.imageService.deleteImageIdTour(data).subscribe(res =>{
      this.response = res
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
