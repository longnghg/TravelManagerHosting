import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { PlaceModel ,ValidationPlaceModel} from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-place',
  templateUrl: './item-place.component.html',
  styleUrls: ['./item-place.component.scss']
})
export class ItemPlaceComponent implements OnInit {
  @Input() resPlace: PlaceModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validatePlace: ValidationPlaceModel = new ValidationPlaceModel
  response: ResponseModel
  isChange: boolean = false
  resPlaceTmp: PlaceModel
  formData: any
  constructor(private placeService: PlaceService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resPlace = new PlaceModel()
    }
    this.resPlaceTmp = Object.assign({}, this.resPlace)
  }


  inputChange(){
    if (JSON.stringify(this.resPlace) != JSON.stringify(this.resPlaceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resPlace = Object.assign({}, this.resPlaceTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  save(){
    this.validatePlace = new ValidationPlaceModel
    this.validatePlace =  this.configService.validatePlace(this.resPlace, this.validatePlace)

    if (this.validatePlace.total == 0) {
      this.resPlace.IdUserModify = this.auth.id
      if(this.type == "create")
      {
        this.placeService.create(this.resPlace).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
	    if(this.response.notification.type == StatusNotification.Success)
        {
		      this.resPlace = Object.assign({}, new PlaceModel)
          this.resPlaceTmp = Object.assign({}, new PlaceModel)
          this.validatePlace = new ValidationPlaceModel
          this.isChange = false
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
    }

  close(){
    this.resPlace = Object.assign({}, this.resPlaceTmp)
    this.validatePlace = new ValidationPlaceModel

    this.isChange = false
     this.parentType.emit(null);
  }

  getParentData(type?: string){
    this.parentType.emit(type);
    this.parentData.emit(this.resPlace);
  }
  formatInput(input: HTMLInputElement, property: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    if (property == "phone") {
      this.resPlace[property] = input.value
    }
    else{
      if (input.value) {
        if (property.includes("Price")) {
          this.resPlace[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
        }
        else{
          this.resPlace[property] = Number(input.value)
        }
      }
    }
  }
}
