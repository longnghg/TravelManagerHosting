import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { EmployeeService } from 'src/app/services_API/employee.service';
import { EmployeeModel } from 'src/app/models/employee.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services_API/role.service';

@Component({
  selector: 'app-item-employee',
  templateUrl: './item-employee.component.html',
  styleUrls: ['./item-employee.component.scss']
})
export class ItemEmployeeComponent implements OnInit {

  response: ResponseModel
  @Input()   resEmployee: EmployeeModel
  @Input() type: string
  listGender = this.configService.listGender()
  isEdit: boolean = true
  resRole: RoleModel[]
  formData: any
  img:any
  constructor(private employeeService: EmployeeService, private notificationService: NotificationService,
    private configService: ConfigService, private roleService: RoleService) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    this.roleService.gets().then(response =>{
      this.resRole = response
    })
    console.log(this.resRole);

    if(this.resEmployee){
      this.img = this.configService.apiUrl + this.resEmployee.image
    }

    if(this.type == "create"){
      this.resEmployee = new EmployeeModel()
      this.isEdit = false
    }
  }

  eventChangeImg(e: any){
    this.formData = e
    if (e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.img = reader.result;
      reader.readAsDataURL(file)
    }
  }

  save(){
    if(this.type == "create")
    {
      var file = new FormData();
      file.append('data', JSON.stringify(this.resEmployee))
      file.append('file', this.formData.path[0].files[0])

      this.employeeService.create(file).subscribe(res =>{
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
  delete(){
    this.employeeService.delete(this.resEmployee).subscribe(res =>{
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
