import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HotelModel ,ValidationHotelModel} from 'src/app/models/hotel.model';
import { NotificationService } from "../../../../services_API/notification.service";
import { HotelService } from "src/app/services_API/hotel.service"
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";
import { LocationModel} from 'src/app/models/location.model';
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { WardService } from "../../../../services_API/ward.service";
import { LogLevel } from '@microsoft/signalr';


const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-hotel',
  templateUrl: './item-hotel.component.html',
  styleUrls: ['./item-hotel.component.scss']
})
export class ItemHotelComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  isLoading: boolean
  @Input() resHotel: HotelModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validateHotel: ValidationHotelModel = new ValidationHotelModel
  response: ResponseModel
  isChange: boolean = false
  resHotelTmp: HotelModel
  listStar: any
  formData: any
  resProvince: LocationModel
  resDistrict: LocationModel
  resWard : LocationModel
  resProvinceTmp: LocationModel
  resDistrictTmp: LocationModel
  resWardTmp : LocationModel
  constructor(private hotelService: HotelService,
     private provinceService: ProvinceService,
     private districtService: DistrictService,
     private wardService: WardService,
     private configService: ConfigService,
     private notificationService: NotificationService
     ) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.listStar = this.configService.list5Star()
    this.provinceService.views().then(response => this.resProvince = response)
    this.districtService.views().then(response => this.resDistrict = response)
    this.wardService.views().then(response => this.resWard = response)
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resHotel = new HotelModel()
    }

    if (this.resHotel) {
      this.resHotel.doubleRoomPrice = Number(this.resHotel.doubleRoomPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
      this.resHotel.singleRoomPrice = Number(this.resHotel.singleRoomPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
      this.resHotel.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resHotel.modifyDate)
    }
    this.resHotelTmp = Object.assign({}, this.resHotel)
  }


  inputChange(){
    if (JSON.stringify(this.resHotel) != JSON.stringify(this.resHotelTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resHotel = Object.assign({}, this.resHotelTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  save(){
    this.validateHotel = new ValidationHotelModel
    this.validateHotel =  this.configService.validateHotel(this.resHotel, this.validateHotel)
    if (this.validateHotel.total == 0) {
      this.resHotel.IdUserModify = this.auth.id
      if(this.type == "create")
      {
        this.hotelService.create(this.resHotel).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resHotel = Object.assign({}, new HotelModel)
            this.resHotelTmp = Object.assign({}, new HotelModel)
            this.validateHotel = new ValidationHotelModel
            this.isChange = false
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.hotelService.update(this.resHotel, this.resHotel.idHotel).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == StatusNotification.Success)
          {
            this.isChange = false
            this.closeModal.nativeElement.click()
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
    this.resHotel = Object.assign({}, this.resHotelTmp)
    this.validateHotel = new ValidationHotelModel

    this.isChange = false
    this.parentType.emit(null);
  }

  getParentData(type?: string){
    this.parentType.emit(type);
    this.parentData.emit(this.resHotel);
  }

  locationChange(property: string, location?: string){
    var list = []

    if (property == 'province') {
        this.resHotel.districtId = null
        this.resHotel.wardId = null
        this.resDistrictTmp = null
        this.resWardTmp = null
    }
    else{
      this.resHotel.wardId = null
      this.resWardTmp = null
    }

    this["res"+location].forEach(item => {
      if (item[property+'Id'] == this.resHotel[property+'Id']) {
        list.push(item)
      }
    })
    this["res"+location+"Tmp"] = list
  }

  formatInput(input: HTMLInputElement, property: string) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
    if (property == "phone") {
      this.resHotel[property] = input.value
    }
    else{
      if (input.value) {
        if (property.includes("Price") || property.includes("price")) {
          this.resHotel[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
        }
        else{
          this.resHotel[property] = Number(input.value)
        }
      }
    }
  }
}
