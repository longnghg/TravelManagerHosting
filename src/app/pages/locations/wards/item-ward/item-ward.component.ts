import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { WardService } from "../../../../services_API/ward.service";
import { DistrictService } from "../../../../services_API/district.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel, ValidateLocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
@Component({
  selector: 'app-item-ward',
  templateUrl: './item-ward.component.html',
  styleUrls: ['./item-ward.component.scss']

})
export class ItemWardComponent implements OnInit {
  @Input() resWard: LocationModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  response: ResponseModel
  isChange: boolean = false
  resWardTmp: LocationModel
  resDistrict: LocationModel
  validateLocation: ValidateLocationModel = new ValidateLocationModel
  constructor(private districtService: DistrictService, private wardService: WardService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.districtService.views().then(response => this.resDistrict = response)
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resWard = new LocationModel()
    }
    this.resWardTmp = Object.assign({}, this.resWard)
  }


  inputChange(){
    if (JSON.stringify(this.resWard) != JSON.stringify(this.resWardTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resWard = Object.assign({}, this.resWardTmp)
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
    this.isChange = false
  }
  save(){
    this.validateLocation = new ValidateLocationModel
    this.validateLocation =  this.configService.validateWard(this.resWard, this.validateLocation)
    if (this.validateLocation.total == 0) {
      if(this.type == "create")
      {
        this.wardService.create(this.resWard).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        this.wardService.update(this.resWard, this.resWard.idWard).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resWardTmp = Object.assign({}, this.resWard)
          }
          else{
            this.resWard = Object.assign({},this.resWardTmp)
          }

          this.isChange = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })

      }
    }

  }

  getDataDelete(){
    this.parentDel.emit(this.resWard);
  }

  close(){
    this.validateLocation = new ValidateLocationModel
    this.resWard = Object.assign({}, this.resWardTmp)
    this.isChange = false
  }
}
