import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel, ValidationRoleModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-item-role',
  templateUrl: './item-role.component.html',
  styleUrls: ['./item-role.component.scss']
})
export class ItemRoleComponent implements OnInit {
  response: ResponseModel
  validateRole: ValidationRoleModel = new ValidationRoleModel
  @Input() resRole: RoleModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  resRoleTmp: RoleModel
  isChange: boolean = false

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.type == "create") {
     this.resRole = new RoleModel()
    }

    this.resRoleTmp = Object.assign({}, this.resRole)
  }
  inputChange(){
    if (JSON.stringify(this.resRole) != JSON.stringify(this.resRoleTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }


  save(){
    this.validateRole = new ValidationRoleModel
    this.validateRole =  this.configService.validateRole(this.resRole, this.validateRole)
    if (this.validateRole.total == 0) {
      if(this.type == "create"){
        this.roleService.create(this.resRole).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.close()
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{
        this.roleService.update(this.resRole).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          this.isChange = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
    }

  }

  backup(){
    this.resRole = Object.assign({}, this.resRoleTmp)
    this.isChange = false
  }

  close(){
    this.resRole = new RoleModel()
  }

  getDataDelete(){
    this.parentDelete.emit(this.resRole);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resRole);
  }
}
