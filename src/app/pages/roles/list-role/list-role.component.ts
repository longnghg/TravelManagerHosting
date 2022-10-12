import { Component, OnInit } from '@angular/core';
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleModel } from "../../../models/role.model";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {

  response: ResponseModel
  type: string
  resRole: RoleModel[]
  child: RoleModel

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService ) { }

  ngOnInit(): void {
    // this.roleRes = this.roleService.ViewAll()

    this.roleService.gets().then(response => {
      this.resRole = response
    })

  }

  // getsRole(){
  //   this.roleService.gets().subscribe(res => {
  //     this.response = res

  //     if(this.response.notification.type == "Error")
  //     {
  //       this.notificationService.handleAlertObj(res.notification)
  //     }

  //     this.roleRes = this.response.content
  //     console.log(this.roleRes);

  //   })
  // }

  getDelete(){
    this.roleService.getsDelete().subscribe(res => {
      this.response = res

      if(this.response.notification.type == "Error")
      {
        this.notificationService.handleAlertObj(res.notification)
      }

      this.resRole = this.response.content

    })
  }

  changeProvince(value){
    var data = JSON.parse(value)

    if(data){
     data.IdProvince =  data.Id
     this.roleService.create(data).subscribe(res => {
       this.response = res

       if(this.response.notification.type == "Error")
       {
         this.notificationService.handleAlertObj(res.notification)
       }

       this.roleService = this.response.content
     })
    }
    else{
     this.roleService = null
    }
  }


  childData(data: RoleModel, type: string){
    this.child = data
    this.type = type

  }

}
