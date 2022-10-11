import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  resEmployee: EmployeeModel[]
  response: ResponseModel
  child: EmployeeModel
  type: string
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.employeeService.gets().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resEmployee = this.response.content
      console.log(this.resEmployee);

    })
  }

  childData(data: EmployeeModel, type: string){
    this.child = data
    this.type = type
  }
}
