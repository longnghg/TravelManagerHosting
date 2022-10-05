import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services_API/employee.service";
import { NotificationService } from "../../services_API/notification.service";
import { EmployeeModel } from "../../models/employee.model";
import { RoleTitle } from "../../models/role.model";
import { ResponsiveModel } from "../../models/responsiveModels/responsive.model";
import { ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  resEmployee: EmployeeModel[]
  responsive: ResponsiveModel

  public columnDefs: ColDef[] = [
    // set filters
    { field: 'Index',headerName: "", filter: false,},
    { field: 'Id', headerName: "Mã số", filter: 'agTextColumnFilter',},
    { field: 'Name',headerName: "Tên", filter: 'agTextColumnFilter'},
    { field: 'Email',headerName: "Email", filter: 'agTextColumnFilter'},
    { field: 'Phone',headerName: "Số điện thoại", filter: 'agTextColumnFilter'},
    { field: 'RoleName',headerName: "Chức vụ", filter: 'agTextColumnFilter'},
    { field: 'IsActive',headerName: "Kích hoạt", filter: 'agTextColumnFilter'},

  ];

  constructor(private employeeService: EmployeeService, private notificationService: NotificationService) {}
  ngOnInit() {
    this.employeeService.GetEmployees().subscribe(res => {
      this.responsive = res

      if(this.responsive.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resEmployee = JSON.parse(this.responsive.content)
      for (let index = 0; index < this.resEmployee.length; index++) {
        this.resEmployee[index].Index = index+1
        this.resEmployee[index].RoleName = RoleTitle[this.resEmployee[index].RoleId]
      }
        console.log(this.resEmployee);
    })

  }


}


