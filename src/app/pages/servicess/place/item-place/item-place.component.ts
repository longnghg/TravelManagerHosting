import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { PlaceModel ,ValidationPlaceModel} from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";
import { LocationModel} from 'src/app/models/location.model';
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { WardService } from "../../../../services_API/ward.service";


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-place',
  templateUrl: './item-place.component.html',
  styleUrls: ['./item-place.component.scss']
})
export class ItemPlaceComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  isLoading: boolean
  @Input() resPlace: PlaceModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validatePlace: ValidationPlaceModel = new ValidationPlaceModel
  response: ResponseModel
  isChange: boolean = false
  resPlaceTmp: PlaceModel
  resProvince: LocationModel
  resDistrict: LocationModel
  resWard : LocationModel
  resProvinceTmp: LocationModel
  resDistrictTmp: LocationModel
  resWardTmp : LocationModel
  formData: any
  constructor(private placeService: PlaceService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private wardService: WardService,) { }


  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resPlace = new PlaceModel()
    }
    if (this.resPlace) {
      this.resPlace.priceTicket = Number(this.resPlace.priceTicket).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
      this.resPlace.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resPlace.modifyDate)
      this.provinceService.views().then(response => this.resProvince = response)
      this.districtService.views().then(response => this.resDistrict = response)
      this.wardService.views().then(response => this.resWard = response)
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
          if (res.notification.type == StatusNotification.Validation) {
            this.validatePlace[res.notification.description] == res.notification.messenge
          }
          else{
            this.notificationService.handleAlertObj(res.notification)
            if (this.response.notification.type == StatusNotification.Success) {
              this.resPlace = Object.assign({}, new PlaceModel)
              this.resPlaceTmp = Object.assign({}, new PlaceModel)
              this.validatePlace = new ValidationPlaceModel
              this.isChange = false
            }
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.placeService.update(this.resPlace, this.resPlace.idPlace).subscribe(res =>{
          this.response = res
          if (res.notification.type == StatusNotification.Validation) {
            this.validatePlace[res.notification.description] == res.notification.messenge
          }
          else
          {
            this.notificationService.handleAlertObj(res.notification)
            if (this.response.notification.type == StatusNotification.Success) {
              this.isChange = false
              this.closeModal.nativeElement.click()
            }
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
    }
    else{
      this.isLoading = false
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

  locationChange(property: string, location?: string){
    var list = []

    if (property == 'province') {
        this.resDistrict.districtId = null
        this.resPlace.wardId = null
        this.resDistrictTmp = null
        this.resWardTmp = null
    }
    else{
      this.resPlace.wardId = null
      this.resWardTmp = null
    }

    this["res"+location].forEach(item => {
      if (item[property+'Id'] == this.resPlace[property+'Id']) {
        list.push(item)
      }
    })
    this["res"+location+"Tmp"] = list
  }
  formatInput(input: HTMLInputElement, property: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    if (property == "phone") {
      this.resPlace[property] = input.value
    }
    else{
      if (input.value) {
        if (property.includes("priceTicket")) {
          this.resPlace[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
        }
        else{
          this.resPlace[property] = Number(input.value)
        }
      }
    }
  }
}
