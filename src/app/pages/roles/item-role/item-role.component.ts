import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() resRole: RoleModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  resRoleTmp: RoleModel
  isEdit: boolean = false
  isChange: boolean = false

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.type == "create") {
     this.resRole = new RoleModel()
     this.isEdit = true
    }else{
      this.isEdit = false
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

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.backup()

    }
    else{
      this.isEdit = true
    }
  }
  save(){
    var valid = this.configService.validateRole(this.resRole)
    valid.forEach(element => {
        this.notificationService.handleAlert(element, "Error")
    });
    if (valid.length == 0) {
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
          if (this.type == 'detail') {
            this.isEdit = false
          }
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
    if (this.type == 'detail') {
      this.isEdit = false
    }
    else{
      this.resRole = new RoleModel()
      this.isEdit = true
    }
  }

  getDataDelete(){
    this.parentDelete.emit(this.resRole);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resRole);
  }
}
