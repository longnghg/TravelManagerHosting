import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../../services_API/notification.service";
import { ConfigService } from "../../../../services_API/config.service";
import { WardService } from '../../../../services_API/ward.service';
import { LocationModel } from "../../../../models/location.model";
import { ResponsiveModel } from "../../../../models/responsiveModels/responsive.model";

@Component({
  selector: 'app-item-ward',
  templateUrl: './item-ward.component.html',
  styleUrls: ['./item-ward.component.scss']
})
export class ItemWardComponent implements OnInit {

  response: ResponsiveModel
  @Input() resParent: LocationModel
  @Input() type: string
  resWard: LocationModel
  constructor(private wardService: WardService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.resWard = this.resParent
    if (this.type == "insert") {
      this.resWard.Name = ""
    }
  }


  save(){
    if (this.type == "insert") {
      this.wardService.InsertWard(this.resWard).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    else{
      this.wardService.UpdateWard(this.resWard).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }


  }

}
