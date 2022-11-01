import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { PlaceModel ,ValidationPlaceModel} from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";

@Component({
  selector: 'app-item-place',
  templateUrl: './item-place.component.html',
  styleUrls: ['./item-place.component.scss']
})
export class ItemPlaceComponent implements OnInit {
  @Input() resPlace: PlaceModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  auth: AuthenticationModel
  validatePlace: ValidationPlaceModel = new ValidationPlaceModel
  response: ResponseModel
  isChange: boolean = false
  resPlaceTmp: PlaceModel
  formData: any
  constructor(private placeService: PlaceService, private configService: ConfigService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resPlace = new PlaceModel()
    }
    this.resPlaceTmp = Object.assign({}, this.resPlace)
  }
  backup(){
    this.resPlace = Object.assign({}, this.resPlaceTmp)

    this.isChange = false
  }

  inputChange(){
    if (JSON.stringify(this.resPlace) != JSON.stringify(this.resPlaceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }





  save(){
    this.validatePlace = new ValidationPlaceModel
    this.validatePlace =  this.configService.validatePlace(this.resPlace, this.validatePlace)

    if (this.validatePlace.total == 0) {

      if(this.type == "create")
      {
        this.placeService.create(this.resPlace).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
        if(this.response.notification.type == StatusNotification.Success)
              {
          this.close()
              }
              }, error => {
                var message = this.configService.error(error.status, error.error != null?error.error.text:"");
                this.notificationService.handleAlert(message, StatusNotification.Error)

              })
      }
      else{
        this.placeService.update(this.resPlace).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == StatusNotification.Success)
          {
		this.isChange = false
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)

        })
      }

      }
      // else{
      //   this.hotelService.update(file).subscribe(res =>{
      //     this.response = res
      //     if (res.notification.type == "Validation") {
      //       if (res.notification.description == "Phone") {
      //         this.validateEmployee.phone == res.notification.messenge
      //       }
      //       else{
      //         this.validateEmployee.email == res.notification.messenge
      //       }
      //     }
      //     else{
      //       this.notificationService.handleAlertObj(res.notification)
      //       if (res.notification.type == StatusNotification.Success) {
      //         this.close()
      //         this.isChange = true
      //       }
      //     }
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, StatusNotification.Error)
      //   })
      // }

    }


  close(){
     this.backup()
  }
  getDataDelete(){
    this.parentDelete.emit(this.resPlace);
  }
}
