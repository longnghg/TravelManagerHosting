import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { RestaurantModel, ValidationRestaurantModel } from 'src/app/models/restaurant.model';
import { RestaurantService } from "src/app/services_API/restaurant.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { LocationModel} from 'src/app/models/location.model';
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { WardService } from "../../../../services_API/ward.service";

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-restaurant',
  templateUrl: './item-restaurant.component.html',
  styleUrls: ['./item-restaurant.component.scss']
})
export class ItemRestaurantComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  isLoading: boolean
  @Input() resRestaurant: RestaurantModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validateRestaurant: ValidationRestaurantModel = new ValidationRestaurantModel
  response: ResponseModel
  isChange: boolean = false
  resRestaurantTmp: RestaurantModel
  formData: any
  resProvince: LocationModel
  resDistrict: LocationModel
  resWard : LocationModel
  resProvinceTmp: LocationModel
  resDistrictTmp: LocationModel
  resWardTmp : LocationModel
  constructor(private restaurantService: RestaurantService,
    private configService: ConfigService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private wardService: WardService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.provinceService.views().then(response => this.resProvince = response)
    this.districtService.views().then(response => this.resDistrict = response)
    this.wardService.views().then(response => this.resWard = response)
  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resRestaurant = new RestaurantModel()
    }
    if(this.resRestaurant){
      this.resRestaurant.comboPrice = Number(this.resRestaurant.comboPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
      this.resRestaurant.modifyDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resRestaurant.modifyDate)

    }
    this.resRestaurantTmp = Object.assign({}, this.resRestaurant)
  }

  inputChange(){
    if (JSON.stringify(this.resRestaurant) != JSON.stringify(this.resRestaurantTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resRestaurant = Object.assign({}, this.resRestaurantTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  save(){
    this.validateRestaurant = new ValidationRestaurantModel
    this.validateRestaurant =  this.configService.validateRestaurant(this.resRestaurant, this.validateRestaurant)
    if (this.validateRestaurant.total == 0) {

      this.resRestaurant.IdUserModify = this.auth.id
      if(this.type == "create")
      {
          this.restaurantService.create(this.resRestaurant).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resRestaurant = Object.assign({}, new RestaurantModel)
            this.resRestaurantTmp = Object.assign({}, new RestaurantModel)
            this.validateRestaurant = new ValidationRestaurantModel
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
        this.restaurantService.update(this.resRestaurant, this.resRestaurant.idRestaurant).subscribe(res =>{
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
      this.resRestaurant = Object.assign({}, this.resRestaurantTmp)
      this.validateRestaurant = new ValidationRestaurantModel
      this.isChange = false
       this.parentType.emit(null);
    }

    getParentData(type?: string){
      this.parentType.emit(type);
      this.parentData.emit(this.resRestaurant);
    }

    locationChange(property: string, location?: string){
      var list = []

      if (property == 'province') {
          this.resRestaurant.districtId = null
          this.resRestaurant.wardId = null
          this.resDistrictTmp = null
          this.resWardTmp = null
      }
      else{
        this.resRestaurant.wardId = null
        this.resWardTmp = null
      }

      this["res"+location].forEach(item => {
        if (item[property+'Id'] == this.resRestaurant[property+'Id']) {
          list.push(item)
        }
      })
      this["res"+location+"Tmp"] = list
    }

    formatInput(input: HTMLInputElement, property: string) {
      input.value = input.value.replace(FILTER_PAG_REGEX, '');
      if (property == "phone") {
        this.resRestaurant[property] = input.value
      }
      else{
        if (input.value) {
          if (property.includes("Price")) {
            this.resRestaurant[property] = Number(input.value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace(".00", "")
          }
          else{
            this.resRestaurant[property] = Number(input.value)
          }
        }
      }
    }
  }
