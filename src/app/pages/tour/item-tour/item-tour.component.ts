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
import { RoleTitle, StatusNotification } from "../../../enums/enum";
import { ImageModel } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services_API/image.service';
@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {
  @ViewChild('tourImg') tourImg: ElementRef;
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  @ViewChild('closeModalLoadApprove') closeModalLoadApprove: ElementRef;
  @ViewChild('closeModalLoadRefused') closeModalLoadRefused: ElementRef;
  isLoading: boolean
  resTour: TourModel
  type: string
  validateTourModel: ValidateTourModel = new ValidateTourModel
  response: ResponseModel
  isChange: boolean = false
  resProvince: LocationModel[]
  resImage: ImageModel[] = []
  resImageTmp: ImageModel[] = []
  resImageBackup: ImageModel[] = []
  resImageDelete: ImageModel[] = []
  isChangeStar: boolean = false
  resTourTmp: TourModel
  isHoliday = this.configService.listStatus()
  img: any
  imgDetail = []
  imgDetailRoot = []
  imgDetailBackup = []
  formData: any
  formDatas: any
  formDatasTmp: any
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
            this.img = this.resTour.thumbnail
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
        this.resImageTmp = Object.assign([], this.resImage)
        this.resImageBackup = Object.assign([], this.resImage)
        this.resImage.forEach(image => {
          if (image.filePath) {
            this.imgDetail.push(image.filePath)
            this.imgDetailRoot.push(image.filePath)
            this.imgDetailBackup.push(image.filePath)
          }
        });
        if (this.imgDetail.length < 4) {
          var length = this.imgDetail.length
          for (let index = 0; index < 4 - length; index++) {
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
      this.img =  this.resTour.thumbnail
    }
    else{
      this.img = "../../../../assets/img/tours/cross-sign.jpg"
    }

    this.imgDetail = Object.assign([], this.imgDetailBackup)
    if (this.imgDetail.length < 4) {
      var length = this.imgDetail.length
      for (let index = 0; index < 4 - length; index++) {
        this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
      }
    }

    this.resImage = Object.assign([], this.resImageBackup)
    this.resImageTmp = Object.assign([], this.resImageBackup)

    this.resTour.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resTour.modifyDate)
    this.isChange = false
    this.isChangeStar = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  inputChange(){
    console.log(JSON.stringify(this.resImage));
    console.log(JSON.stringify(this.resImageBackup));
    if (JSON.stringify(this.resTour) != JSON.stringify(this.resTourTmp) ||
        JSON.stringify(this.resImage) != JSON.stringify(this.resImageBackup) ){
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
    if (e.target.files.length > 0) {
      var files =  Object.assign([], e.target.files)
      var filesTmp = Object.assign([],  e.target.files);
      var check = 0
      var dt = new DataTransfer();
      files.forEach(file => {
        if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
          if (this.imgDetail) {
            this.imgDetail = Object.assign([], this.imgDetailRoot)
          }
          else{
            this.imgDetail = []
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

              if (filesTmp.length < 4) {
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

            if (this.resImage.length < 4) {
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
            var length = this.imgDetail.length
            if (length < 4) {
              this.imgDetail.push(reader.result)
              this.imgDetailRoot.push(reader.result)
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
      setTimeout(() => {
        if (this.imgDetail.length < 4) {
          var length = this.imgDetail.length
          for (let index = 0; index < 4 - length; index++) {
            this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
          }
        }
      }, 100);
    }
  }

  btnDeleteImg(i: number, listDelete: any){
    if(this.imgDetail){
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

        this.resImageDelete.push(Object.assign({}, listDelete))
      }
      this.resImage.splice(i, 1)
        this.resImageTmp = Object.assign([], this.resImage)
      this.imgDetailRoot.splice(i, 1)
      this.imgDetail.splice(i, 1);
      if (this.imgDetail.length < 4) {
        var length = this.imgDetail.length
        for (let index = 0; index < 4 - length; index++) {
          this.imgDetail.push("../../../../assets/img/tours/cross-sign.jpg")
        }
      }
      this.notificationService.handleAlert("Xóa thành công !", StatusNotification.Success)
    }
  }

  save(){
    this.validateTourModel = new ValidateTourModel
    this.validateTourModel =  this.configService.validateTour(this.resTour, this.validateTourModel)

    if (this.validateTourModel.total == 0) {
      if(this.resImage.length == 4){
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
              }
            }, error => {
              var message = this.configService.error(error.status, error.error != null?error.error.text:"");
              this.notificationService.handleAlert(message, StatusNotification.Error)
              this.isLoading = false
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
              // this.configService.callNotyfSignalR(this.configService.listRole())
              // this.router.navigate(['','list-tour']);
            }
            else{
              this.notificationService.handleAlertObj(res.notification)
            }
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
            this.isLoading = false
          })
        }
      }
      else{
        this.notificationService.handleAlert("Hình ảnh chi tiết tour phải thêm 4 ảnh!", StatusNotification.Warning)
        this.isLoading = false
      }

    }
    else{
      if (this.validateTourModel.thumbnail) {
        this.notificationService.handleAlert(this.validateTourModel.thumbnail, StatusNotification.Warning)
      }
      this.isLoading = false
    }
  }



  delete(){
    if (this.resTour) {
     this.tourService.delete(this.resTour.idTour, this.resAuth.id).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
       this.isLoading = false
       if (res.notification.type == StatusNotification.Success) {
        this.configService.callNotyfSignalR(this.configService.listRole())
        setTimeout(() => {
          this.closeModalLoadDelete.nativeElement.click()
          this.router.navigate(['','list-tour']);
         }, 100);
       }
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
       this.isLoading = false
     })
    }
   }

   restoreTour(){
    if (this.resTour) {
      this.tourService.restore(this.resTour.idTour, this.resAuth.id).subscribe(res =>{
        this.response = res
        this.isLoading = false
        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == StatusNotification.Success) {
          this.configService.callNotyfSignalR(this.configService.listRole())
          setTimeout(() => {
            this.closeModalLoadRestore.nativeElement.click()
            this.router.navigate(['','list-tour'], { state: { isDelete: true } });
           }, 100);
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
  }

  approve(){
    if (this.resTour) {
      this.tourService.approve(this.resTour.idTour).subscribe(res =>{
        this.response = res
        this.isLoading = false
        this.notificationService.handleAlertObj(res.notification)
        console.log(res);

        if (res.notification.type == StatusNotification.Success) {
          this.configService.callNotyfSignalR(RoleTitle.TourManager.toString())
          setTimeout(() => {
            this.closeModalLoadApprove.nativeElement.click()
            this.router.navigate(['','list-tour'], { state: { isDelete: false } });
           }, 100);
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
      })
    }
  }

  refused(){
    if (this.resTour) {
      this.tourService.refused(this.resTour.idTour).subscribe(res =>{
        this.response = res
        this.isLoading = false

        this.notificationService.handleAlertObj(res.notification)
        if (res.notification.type == StatusNotification.Success) {
          this.configService.callNotyfSignalR(this.configService.listRole())
          setTimeout(() => {
            this.closeModalLoadRefused.nativeElement.click()
            this.router.navigate(['','list-tour'], { state: { isDelete: false } });
           }, 100);
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
        this.isLoading = false
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
      this.isLoading = false
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
      this.isLoading = false
    })
  }

  createImageTourdetail(data, idTour){
    this.imageService.createImageIdTour(data, idTour).subscribe(res =>{
      this.response = res
      this.isLoading = false

      if (res.notification.type == StatusNotification.Success) {
        this.configService.callNotyfSignalR(this.configService.listRole())
        this.router.navigate(['','list-tour']);
      }
      this.notificationService.handleAlertObj(res.notification)
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
      this.isLoading = false
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
