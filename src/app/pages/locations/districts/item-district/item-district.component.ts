import { Component, OnInit, Input, Output, EventEmitter,ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel, ValidateLocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";

@Component({
  selector: 'app-item-district',
  templateUrl: './item-district.component.html',
  styleUrls: ['./item-district.component.scss']

})
export class ItemDistrictComponent implements OnInit {
  isLoading: boolean
  @ViewChild('closeModal') closeModal: ElementRef
  @Input() resDistrict: LocationModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  response: ResponseModel
  isChange: boolean = false
  resDistrictTmp: LocationModel
  validateLocation: ValidateLocationModel = new ValidateLocationModel
  resProvince: LocationModel
  constructor(private districtService: DistrictService, private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.provinceService.views().then(response => this.resProvince = response)
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resDistrict = new LocationModel()
    }
    this.resDistrictTmp = Object.assign({}, this.resDistrict)
  }

  inputChange(){
    if (JSON.stringify(this.resDistrict) != JSON.stringify(this.resDistrictTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resDistrict = Object.assign({}, this.resDistrictTmp)
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
    this.isChange = false
  }
  save(){
    this.validateLocation = new ValidateLocationModel
    this.validateLocation =  this.configService.validateDistrict(this.resDistrict, this.validateLocation)
    if (this.validateLocation.total == 0) {
      if(this.type == "create")
      {
        this.districtService.create(this.resDistrict).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.districtService.update(this.resDistrict, this.resDistrict.idDistrict).subscribe(res =>{
          this.response = res
          this.isLoading = false
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resDistrictTmp = Object.assign({}, this.resDistrict)
            this.isChange = false
            setTimeout(() => {
              this.closeModal.nativeElement.click()
            }, 100);
          }
          else{
            this.resDistrict = Object.assign({},this.resDistrictTmp)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Success)
          this.isLoading = false
        })

      }
    }
    else{
      this.isLoading = false
    }

  }

  getDataDelete(){
    this.parentDel.emit(this.resDistrict);
  }

  close(){
    this.validateLocation = new ValidateLocationModel
    this.resDistrict = Object.assign({}, this.resDistrictTmp)
    this.isChange = false
  }
}
