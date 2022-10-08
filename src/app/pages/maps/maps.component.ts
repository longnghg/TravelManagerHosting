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
  resEmployee: EmployeeModel[]
  resRole: RoleModel[]
  response: ResponseModel
  constructor(private roleService: RoleService, private configService: ConfigService, private employeeService: EmployeeService, private notificationService: NotificationService) {}

  public columnDefs: ColDef[] = [
    // set filters
    // { field: 'Index',headerName: ""},
    { field: 'id', headerName: "Mã số", searchable: false, searchType: 'text'},
    { field: 'name',headerName: "Tên", filter: "avatar", searchable: true, searchType: 'date'},
    { field: 'email',headerName: "Email", searchable: true, searchType: 'email'},
    { field: 'phone',headerName: "Số điện thoại", searchable: true, searchType: 'text'},
    { field: 'roleName',headerName: "Chức vụ", searchable: true, searchType: 'section', bindLabel: 'name_vi', bindValue: "id", listSection: this.roleService.ViewAll()},
    { field: 'isActive',headerName: "Kích hoạt", filter: "status", searchable: true, searchType: 'section', bindLabel: 'name', bindValue: "id", listSection: [{id: 0, name: "Chưa kích hoạt"},{id: 1, name: "Đã kích hoạt"}]},
  ];

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.search()


  }

  search(pagination?){
  if (!pagination.isTrusted)
  {
    this.employeeService.GetEmployees(pagination).subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resEmployee = this.response.content
        for (let index = 0; index < this.resEmployee.length; index++) {
          this.resEmployee[index].roleName = RoleTitle[this.resEmployee[index].roleId]
        }
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


