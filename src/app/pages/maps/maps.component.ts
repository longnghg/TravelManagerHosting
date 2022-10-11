import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services_API/employee.service";
import { NotificationService } from "../../services_API/notification.service";
import { EmployeeModel } from "../../models/employee.model";
import { RoleTitle, RoleModel } from "../../models/role.model";
import { ColDef} from '../../components/grid-data/grid-data.component';
import { ConfigService } from "../../services_API/config.service";
import { RoleService } from "../../services_API/role.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  event: any
  resEmployee: EmployeeModel[]
  resRole: RoleModel[]
  response: ResponseModel
  constructor(private roleService: RoleService, private configService: ConfigService, private employeeService: EmployeeService, private notificationService: NotificationService) {}

  public columnDefs: ColDef[]

  ngOnInit() {
    this.search()
    this.roleService.ViewAll().then(response => {
      this.resRole = response
    })
    setTimeout(() => {
      this.columnDefs= [
        { field: 'idEmployee', headerName: "Mã số", searchable: true, searchType: 'text', searchObj: 'idEmployee'},
        { field: 'nameEmployee',headerName: "Tên", filter: "avatar", searchable: true, searchType: 'text', searchObj: 'nameEmployee'},
        { field: 'email',headerName: "Email", searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'roleName',headerName: "Chức vụ", searchable: true, searchType: 'section', searchObj: 'idRole', multiple: true, bindLabel: 'nameRole', bindValue: "idRole", listSection: this.resRole},
        { field: 'isActive',headerName: "Kích hoạt", filter: "status", searchable: true, searchType: 'section', multiple: false, searchObj: 'isActive', bindLabel: 'name', bindValue: "id", listSection: [{id: false, name: "Chưa kích hoạt"},{id: true, name: "Đã kích hoạt"}]},
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
}


