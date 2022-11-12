import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HotelModel ,ValidationHotelModel} from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../../enums/enum";
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-item-hotel',
  templateUrl: './item-hotel.component.html',
  styleUrls: ['./item-hotel.component.scss']
})
export class ItemHotelComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
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
  constructor(private hotelService: HotelService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.listStar = this.configService.list5Star()
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
      //var file = new FormData();
      //file.append('data', JSON.stringify(this.resHotel))

      //if (this.formData) {
        //file.append('file', this.formData.path[0].files[0])
      //}

      // this.resHotel.IdUserModify = this.auth.id
      // if(this.type == "create")
      // {
      //   this.hotelService.create(this.resHotel).subscribe(res =>{
      //     this.response = res
      //     this.notificationService.handleAlertObj(res.notification)
	    // if(this.response.notification.type == StatusNotification.Success)
      //   {
		  //     this.resHotel = Object.assign({}, new HotelModel)
      //     this.resHotelTmp = Object.assign({}, new HotelModel)
      //     this.validateHotel = new ValidationHotelModel
      //     this.isChange = false
      //   }
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, StatusNotification.Error)
      //   })
      // }
      // else{
      //   this.hotelService.update(this.resHotel).subscribe(res =>{
      //     this.response = res
      //     this.notificationService.handleAlertObj(res.notification)

      //     if(this.response.notification.type == StatusNotification.Success)
      //     {
      //       this.isChange = false
      //       this.closeModal.nativeElement.click()
      //     }
      //   }, error => {
      //     var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      //     this.notificationService.handleAlert(message, StatusNotification.Error)

      //   })
      // }

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
