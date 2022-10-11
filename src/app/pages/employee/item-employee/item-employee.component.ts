import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss']
})
export class ItemEmployeeComponent implements OnInit {

  response: ResponseModel
  @Input()   resEmployee: EmployeeModel

  @Input() type: string
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if(this.type == "create"){
      this.resEmployee = new EmployeeModel()
    }
    console.log(this.resEmployee);

  }

  save(){
    if(this.type == "create")
    {
      this.employeeService.create(this.resEmployee).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
    else{
      this.employeeService.update(this.resEmployee).subscribe(res =>{
        this.response = res
        if(this.response.notification.type == "Error")
        {
          this.notificationService.handleAlertObj(res.notification)
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }

  }

}
