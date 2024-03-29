import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel, ValidationRoleModel } from 'src/app/models/role.model';
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { StatusNotification } from "../../../enums/enum";
import { ListRoleComponent } from "../list-role/list-role.component";
@Component({
  selector: 'app-item-role',
  templateUrl: './item-role.component.html',
  styleUrls: ['./item-role.component.scss']
})
export class ItemRoleComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef
  isLoading: boolean
  response: ResponseModel
  auth: AuthenticationModel
  validateRole: ValidationRoleModel = new ValidationRoleModel
  @Input() resRole: RoleModel
  @Input() type: string
  @Output() parentDelete = new EventEmitter<any>()
  @Output() parentRestore = new EventEmitter<any>()
  resRoleTmp: RoleModel
  isChange: boolean = false

  constructor(private listRoleComponent: ListRoleComponent, private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
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
          this.isLoading = false
          if (res.notification.type == StatusNotification.Validation) {
            this.validateRole[res.notification.description] = res.notification.messenge
          }
          else{
            this.listRoleComponent.ngOnInit()
            this.notificationService.handleAlertObj(res.notification)
            this.close()
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.roleService.update(this.resRole, this.resRole.idRole).subscribe(res =>{
          this.response = res
          this.isLoading = false
          if (res.notification.type == StatusNotification.Validation) {
            this.validateRole[res.notification.description] = res.notification.messenge
          }
          else{
            this.listRoleComponent.ngOnInit()
            this.notificationService.handleAlertObj(res.notification)
            this.isChange = false
            setTimeout(() => {
              this.closeModal.nativeElement.click()
            }, 100);
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
    }
    else{
      this.isLoading = false
    }

  }

  backup(){
    this.resRole = Object.assign({}, this.resRoleTmp)
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
    this.isChange = false
  }

  close(){
    this.resRole = Object.assign({}, this.resRoleTmp)
    this.isChange = false
    this.validateRole = new ValidationRoleModel
  }

  getDataDelete(){
    this.parentDelete.emit(this.resRole);
  }
  getDataRestore(){
    this.parentRestore.emit(this.resRole);
  }
}
