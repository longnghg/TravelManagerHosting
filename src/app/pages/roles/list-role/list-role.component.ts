import { Component, OnInit } from '@angular/core';
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { RoleModel } from "../../../models/role.model";
import { AuthenticationModel } from "../../../models/authentication.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { HubConnection } from '@microsoft/signalr';
import { RoleTitle, StatusNotification } from "../../../enums/enum";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  auth: AuthenticationModel
  dataChild: RoleModel
  data: RoleModel
  dataNon: RoleModel
  typeChild: string
  response: ResponseModel
  type: boolean = false
  resRole: RoleModel[]
  resRoleTmp: RoleModel[]
  private hubConnectionBuilder!: HubConnection;

  public gridConfig: GridConfig = {
    idModalRestore: "restoreRoleModal",
    idModalDelete: "deleteRoleModal",
    idModal: "gridRole",
    radioBoxName: "Kho lưu trữ",
    disableApprove: true,
  }

  constructor(private roleService: RoleService, private notificationService: NotificationService,
    private configService: ConfigService ) { }
    public columnDefs: ColDef[]
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"));

    this.init(this.type)
    this.hubConnectionBuilder = this.configService.signIR()
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.init(this.type)
    })


  }

  search(e?){
    if (e) {
      this.roleService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resRole = this.response.content
        }
        else{
          this.resRole = Object.assign([], this.resRoleTmp)
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  init(e?){
   this.type = e
   this.roleService.gets(this.type).subscribe(res => {
    this.response = res
    if(this.response.notification.type == StatusNotification.Success)
    {
      this.resRole = this.response.content
      this.resRoleTmp = Object.assign([], this.resRole)

    }
    else{
      this.resRole = Object.assign([], this.resRoleTmp)
    }

  }, error => {
    var message = this.configService.error(error.status, error.error != null?error.error.text:"");
    this.notificationService.handleAlert(message, StatusNotification.Error)
  })

   setTimeout(() => {
    this.columnDefs= [
      // { field: 'idRole', headerName: "Mã số", searchable: true, searchType: 'text', searchObj: 'idRole'},
      { field: 'nameRole',headerName: "Chức Vụ", style: 'width: 45%', searchable: true, searchType: 'text', searchObj: 'nameRole'},
      { field: 'description',headerName: "Mô Tả", style: 'width: 45%', searchable: true, searchType: 'text', searchObj: 'description'},
    ];
  }, 200);
  }


  childData(e){
    if (e) {
      this.dataChild = Object.assign({}, e)
    }
  }

  childType(e){
    if (e) {
      this.typeChild = e
    }
  }

  getData(data: any){
    this.data = data
  }

  delete(){
    if (this.data) {
     this.roleService.delete(this.data.idRole).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)
     })
    }
   }

   restore(){
    if (this.data) {
      this.roleService.restore(this.data.idRole, this.dataNon).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }
}
