import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ProvinceService } from "../../../../services_API/province.service";
import { ConfigService } from "../../../../services_API/config.service";
import { LocationModel } from 'src/app/models/location.model';
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-item-province',
  templateUrl: './item-province.component.html',
  styleUrls: ['./item-province.component.scss']
})
export class ItemProvinceComponent implements OnInit {
  @Input() resProvince: LocationModel
  @Input() type: string
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
    }
    this.resProvinceTmp = Object.assign({}, this.resProvince)
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
    console.log(JSON.stringify(this.resProvinceTmp));
      console.log(JSON.stringify(this.resProvince));

    if (JSON.stringify(this.resProvince) != JSON.stringify(this.resProvinceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resProvince = Object.assign({}, this.resProvinceTmp)
    this.isChange = false
  }
  save(){
    var valid =  this.configService.validateProvince(this.resProvince)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
      if(this.type == "create")
      {
        this.provinceService.create(this.resProvince).subscribe(res =>{
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
        this.provinceService.update(this.resProvince).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == "Success")
          {
            this.resProvinceTmp = Object.assign({}, this.resProvince)
          }
          else{
            this.resProvince = Object.assign({},this.resProvinceTmp)
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })

      }
      this.isChange = false
    this.isEdit = false
    }

  }
  delete(){
    this.isChange = false
      this.isEdit = false
    // this.employeeService.delete(this.resEmployee).subscribe(res =>{
    //   this.response = res
    //   if(this.response.notification.type == "Error")
    //   {
    //     this.notificationService.handleAlertObj(res.notification)
    //   }
    // }, error => {
    //   var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    //   this.notificationService.handleAlert(message, "Error")
    // })
  }

  close(){
     this.isEdit = false
     this.restore()
  }
}
