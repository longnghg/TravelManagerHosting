import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { WardService } from "../../../../services_API/ward.service";
import { DistrictService } from "../../../../services_API/district.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
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
  isEdit: boolean = false
  isChange: boolean = false
  resWardTmp: LocationModel
  resDistrict: LocationModel
  constructor(private districtService: DistrictService, private wardService: WardService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.districtService.views().then(response => this.resDistrict = response)
  }

  ngOnChanges(): void {
    if(this.type == "create"){
      this.resWard = new LocationModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resWardTmp = Object.assign({}, this.resWard)
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
    console.log(JSON.stringify(this.resWard));
    console.log(JSON.stringify(this.resWardTmp));

    if (JSON.stringify(this.resWard) != JSON.stringify(this.resWardTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resWard = Object.assign({}, this.resWardTmp)
    this.isChange = false
  }
  save(){
    var valid =  this.configService.validateWard(this.resWard)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.wardService.create(this.resWard).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == "Error")
          {
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{
        this.wardService.update(this.resWard).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == "Success")
          {
            this.resWardTmp = Object.assign({}, this.resWard)
          }
          else{
            this.resWard = Object.assign({},this.resWardTmp)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })

      }
     this.close()
    }

  }

  getDataDelete(){
    this.parentDel.emit(this.resWard);
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
     this.restore()
  }
}
