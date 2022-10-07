import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services_API/employee.service";
import { NotificationService } from "../../services_API/notification.service";
import { EmployeeModel } from "../../models/employee.model";
import { RoleTitle, RoleModel } from "../../models/role.model";
import { ColDef} from '../../components/grid-data/grid-data.component';
import { ConfigService } from "../../services_API/config.service";
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

  public columnDefs: ColDef[] = [
    // set filters
    // { field: 'Index',headerName: ""},
    { field: 'Id', headerName: "Mã số", searchable: false, searchType: 'text'},
    { field: 'Name',headerName: "Tên", filter: "avatar", searchable: true, searchType: 'date'},
    { field: 'Email',headerName: "Email", searchable: true, searchType: 'email'},
    { field: 'Phone',headerName: "Số điện thoại", searchable: true, searchType: 'text'},
    { field: 'RoleName',headerName: "Chức vụ", searchable: true, searchType: 'section', bindLabel: 'Name_vi', bindValue: "Id"},
    { field: 'IsActive',headerName: "Kích hoạt", filter: "status", searchable: true, searchType: 'section', bindLabel: 'Name', bindValue: "Id", listSection: [{Id: 0, Name: "Chưa kích hoạt"},{Id: 1, Name: "Đã kích hoạt"}]},
  ];

  constructor(private configService: ConfigService, private employeeService: EmployeeService, private notificationService: NotificationService) {}
  ngOnInit() {
    this.employeeService.Test().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resRole = JSON.parse(this.response.content)
        this.resRole.forEach(role => {
          role.Name_vi = RoleTitle[role.Id]
        });
        this.columnDefs[4].listSection = this.resRole
      }
      else{
        this.notificationService.handleAlertObj(res.notification)

      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
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
        this.resEmployee = JSON.parse(this.response.content)
        for (let index = 0; index < this.resEmployee.length; index++) {
          this.resEmployee[index].RoleName = RoleTitle[this.resEmployee[index].RoleId]
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


