import { Component, Input,OnInit} from '@angular/core';
import { EmployeeService } from "./../../services_API/employee.service";
import { NotificationService } from "../../services_API/notification.service";
import { RoleModel } from "../../models/role.model";
import { EmployeeModel, ValidationEmployeeModel } from 'src/app/models/employee.model'
import { ConfigService } from "../../services_API/config.service";
import { RoleService } from "../../services_API/role.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { RoleTitle, StatusNotification } from "../../enums/enum";
import { HubConnection } from '@microsoft/signalr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  auth: AuthenticationModel
  dataChild: EmployeeModel
  typeChild: string
  resEmployee: EmployeeModel[]
  @Input() type: string
  resEmployeeTmp: EmployeeModel[]
  resRole: RoleModel[]
  formData: any
  validateEmployee: ValidationEmployeeModel = new ValidationEmployeeModel
  response: ResponseModel
  listGender =  this.configService.listGender()
  data: EmployeeModel
  isEdit: boolean = false
  isChange: boolean = false



    constructor(private roleService: RoleService,
       private configService: ConfigService,
        private employeeService: EmployeeService,
         private notificationService: NotificationService) {}

  ngOnInit() {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.listGender = this.configService.listGender()
    this.init()
  }

  inputChange(){
    if (JSON.stringify(this.resEmployee) != JSON.stringify(this.resEmployeeTmp)) {
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

  backup(){
    this.resEmployee = Object.assign({}, this.resEmployeeTmp)
    this.isChange = false
  }

  save(){
    this.validateEmployee = new ValidationEmployeeModel
    this.validateEmployee =  this.configService.validateEmployee(this.resEmployee, this.validateEmployee)

    if (this.validateEmployee.total == 0) {
      this.employeeService.update(this.resEmployee, this.auth.id).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isChange = false
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  init(e?){
    this.type = e
    this.employeeService.gets(this.type).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resEmployee = this.response.content
        this.resEmployeeTmp = Object.assign([], this.resEmployee)
      }
      else{
        this.resEmployee = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })



  }





}


