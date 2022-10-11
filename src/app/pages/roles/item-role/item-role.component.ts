import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-item-role',
  templateUrl: './item-role.component.html',
  styleUrls: ['./item-role.component.scss']
})
export class ItemRoleComponent implements OnInit {

  response: ResponseModel
  @Input() roleRes: RoleModel
  @Input() type: string


  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.type == "create") {
     this.roleRes = new RoleModel()
    }
  }

  save(){

    this.roleService.create(this.roleRes).subscribe(res =>{
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

  restore(){
    this.roleService.restore(this.roleRes).subscribe(res =>{
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

  delete(){
    this.roleService.delete(this.roleRes).subscribe(res =>{
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
