import { Component, OnInit } from '@angular/core';
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleModel } from "../../../models/role.model";
import { ColDef} from '../../../components/grid-data/grid-data.component';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  event: any
  response: ResponseModel
  type: string
  resRole: RoleModel[]
  child: RoleModel

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService ) { }
    public columnDefs: ColDef[]
  ngOnInit(): void {
    this.init()

    this.roleService.gets().then(response => {
      this.resRole = response
    })
    setTimeout(() => {

      this.columnDefs= [
      //  { field: 'idRole', headerName: "Mã số", searchable: true, searchType: 'text', searchObj: 'idRole'},
        { field: 'nameRole',headerName: "Chức Vụ", filter: "avatar", searchable: true, searchType: 'text', searchObj: 'nameRole'},
        { field: 'description',headerName: "Mô Tả", filter: "avatar", searchable: true, searchType: 'text', searchObj: 'description'},
      ];
    }, 200);

  }



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
  search(e?){
    if (e) {
      this.roleService.search(e).subscribe(res => {
        this.response = res
        if(!this.response.notification.type)
        {
          this.resRole = this.response.content
        }
        else{
          this.resRole = null
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
    this.event.getsDelete().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resRole = this.response.content
      }
      else{
        this.resRole = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
   }
   else{
    this.roleService.getRole().subscribe(res => {
      this.response = res
      if(!this.response.notification.type)
      {
        this.resRole = this.response.content
      }
      else{
        this.resRole = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
   }
  }
}
