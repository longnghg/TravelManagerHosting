import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { DistrictService } from "../../../../services_API/district.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";

@Component({
  selector: 'app-item-district',
  templateUrl: './item-district.component.html',
  styleUrls: ['./item-district.component.scss']

})
export class ItemDistrictComponent implements OnInit {
  @Input() resDistrict: LocationModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resDistrictTmp: LocationModel
  resProvince: LocationModel
  constructor(private districtService: DistrictService, private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.provinceService.views().then(response => this.resProvince = response)
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resDistrict = new LocationModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resDistrictTmp = Object.assign({}, this.resDistrict)
  }

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.restore()

    }
    else{
      this.isEdit = true
    }
  }
  inputChange(){
    if (JSON.stringify(this.resDistrict) != JSON.stringify(this.resDistrictTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resDistrict = Object.assign({}, this.resDistrictTmp)
    this.isChange = false
  }
  save(){
    var valid =  this.configService.validateDistrict(this.resDistrict)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, StatusNotification.Error)
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.districtService.create(this.resDistrict).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()

        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        this.districtService.update(this.resDistrict).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resDistrictTmp = Object.assign({}, this.resDistrict)
          }
          else{
            this.resDistrict = Object.assign({},this.resDistrictTmp)
          }

          if (this.type == 'detail') {
            this.isEdit = false
          }
          this.isChange = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Success)
        })

      }
    }

  }

  getDataDelete(){
    this.parentDel.emit(this.resDistrict);
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
     this.restore()
  }
}
