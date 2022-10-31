import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourModel, ValidateTourModel } from 'src/app/models/tour.model';
import { TourService } from "src/app/services_API/tour.service"
import { NotificationService } from "./../../../services_API/notification.service";
import { ColDef, GridConfig} from './../../../components/grid-data/grid-data.component';
import { ConfigService } from "./../../../services_API/config.service";
import { ResponseModel } from "./../../../models/responsiveModels/response.model";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StatusNotification } from "../../../enums/enum";
@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {

  @Input() resTour: TourModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  validateTourModel: ValidateTourModel = new ValidateTourModel
  response: ResponseModel
  isChange: boolean = false
  resTourTmp: TourModel
  isHoliday = this.configService.listStatus()
  img: any
  formData: any
  constructor(private router: Router, private tourService: TourService, private configService: ConfigService, private notificationService: NotificationService,
      private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    var idTour = this.activatedRoute.snapshot.paramMap.get('id2')
    this.type = this.activatedRoute.snapshot.paramMap.get('id1')

    if(this.type == "detail"){

      this.tourService.getTour(idTour).subscribe(res => {
        this.response = res

        if(!this.response.notification.type)
        {
          this.resTour = this.response.content
          this.resTourTmp = Object.assign({}, this.resTour)

          if(this.resTour){
            if (this.resTour.thumbnail) {
              this.img = this.configService.apiUrl + this.resTour.thumbnail
            }
            else{
              this.img = "../../../../assets/img/tours/cross-sign.jpg"
            }
          }
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })

    }
    else{
      this.resTour = new TourModel
      this.resTourTmp = Object.assign({}, this.resTour)

      if(this.resTour){
        if (this.resTour.thumbnail) {
          this.img = this.configService.apiUrl + this.resTour.thumbnail
        }
        else{
          this.img = "../../../../assets/img/tours/cross-sign.jpg"
        }
      }
    }
  }
  ngOnChanges(): void {

  }


  inputChange(){
    if (JSON.stringify(this.resTour) != JSON.stringify(this.resTourTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resTour = Object.assign({}, this.resTour)
    this.isChange = false
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

  save(){
    this.validateTourModel = new ValidateTourModel
    this.validateTourModel =  this.configService.validateTour(this.resTour, this.validateTourModel)

    if (this.validateTourModel.total == 0) {
      var file = new FormData();
      file.append('data', JSON.stringify(this.resTour))

      if (this.formData) {
        file.append('file', this.formData.path[0].files[0])
      }
      if(this.type == "create")
      {
        this.tourService.create(file).subscribe(res =>{
          this.response = res

          // this.resCostTour.idCostTour = this.response.content
          if (res.notification.type == StatusNotification.Success) {
            this.close()
          }
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        var file = new FormData();
        file.append('data', JSON.stringify(this.resTour))

        if (this.formData) {
          file.append('file', this.formData.path[0].files[0])
        }
        this.tourService.update(file).subscribe(res =>{
          this.response = res

          // this.resCostTour.idCostTour = this.response.content
          if (res.notification.type == StatusNotification.Success) {
            this.close()
          }
          this.notificationService.handleAlertObj(res.notification)
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      this.close()
    }
  }



  close(){
    if (this.type == 'detail') {

    }

     this.restore()
  }

  getDataDelete(){
    this.parentDelete.emit(this.resTour);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resTour);
  }

  delete(){
    if (this.resTour) {
     this.tourService.delete(this.resTour.idTour).subscribe(res =>{
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
      this.tourService.restore(this.resTour.idTour).subscribe(res =>{
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
}
