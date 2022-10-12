import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../../services_API/employee.service";
import { NotificationService } from "../../../services_API/notification.service";
import { EmployeeModel } from "../../../models/employee.model";
import { RoleTitle, RoleModel } from "../../../models/role.model";
import { ColDef} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-maps',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  dataChild: EmployeeModel
  typeChild: string
  resEmployee: EmployeeModel[]
  resRole: RoleModel[]
  response: ResponseModel
  constructor(private roleService: RoleService, private configService: ConfigService, private employeeService: EmployeeService, private notificationService: NotificationService) {}

  public columnDefs: ColDef[]

  ngOnInit() {
    this.init()

    this.roleService.gets().then(response => {
      this.resRole = response
    })

    setTimeout(() => {

      this.columnDefs= [
        { field: 'idEmployee', headerName: "Mã số", searchable: true, searchType: 'text', searchObj: 'idEmployee'},
        { field: 'nameEmployee',headerName: "Tên", filter: "avatar", searchable: true, searchType: 'text', searchObj: 'nameEmployee'},
        { field: 'email',headerName: "Email", searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'roleName',headerName: "Chức vụ", searchable: true, searchType: 'section', searchObj: 'idRole', multiple: true, bindLabel: 'nameRole', bindValue: "idRole", listSection: this.resRole},
        { field: 'isActive',headerName: "Kích hoạt", filter: "status", searchable: true, searchType: 'section', multiple: false, searchObj: 'isActive', bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];
    }, 200);



  }

  search(e?){
    if (e) {
      this.employeeService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resEmployee = this.response.content
        }
        else{
          this.resEmployee = null
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
  }

  init(e?){
   if (e) {
    this.employeeService.getsDelete().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resEmployee = this.response.content
      }
      else{
        this.resEmployee = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
   }
   else{
    this.employeeService.gets().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resEmployee = this.response.content
      }
      else{
        this.resEmployee = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
   }
  }

  childData(e){
    console.log(e);
    if (e) {
      this.dataChild = e
    }

  }

  childType(e){
    if (e) {
      this.typeChild = e
    }
  }
}


