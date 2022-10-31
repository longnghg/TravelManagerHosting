import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../../enums/enum";
@Component({
  selector: 'app-item-province',
  templateUrl: './item-province.component.html',
  styleUrls: ['./item-province.component.scss']

})
export class ItemProvinceComponent implements OnInit {
  @Input() resProvince: LocationModel
  @Input() type: string
  @Output() parentDel = new EventEmitter<any>()
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resProvinceTmp: LocationModel
  constructor(private provinceService: ProvinceService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resProvince = new LocationModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resProvinceTmp = Object.assign({}, this.resProvince)
  }

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.backup()

    }
    else{
      this.isEdit = true
    }
  }
  inputChange(){
    if (JSON.stringify(this.resProvince) != JSON.stringify(this.resProvinceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  backup(){
    this.resProvince = Object.assign({}, this.resProvinceTmp)
    this.isChange = false
  }
  save(){
    var valid =  this.configService.validateProvince(this.resProvince)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, StatusNotification.Error)
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.provinceService.create(this.resProvince).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      else{
        this.provinceService.update(this.resProvince).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resProvinceTmp = Object.assign({}, this.resProvince)
          }
          else{
            this.resProvince = Object.assign({},this.resProvinceTmp)
          }

          if (this.type == 'detail') {
            this.isEdit = false
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
    this.parentDel.emit(this.resProvince);
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
     this.backup()
  }
}
