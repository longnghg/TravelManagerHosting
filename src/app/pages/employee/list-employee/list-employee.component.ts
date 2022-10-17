import { Component, OnInit} from '@angular/core';
import { EmployeeService } from "../../../services_API/employee.service";
import { NotificationService } from "../../../services_API/notification.service";
import { EmployeeModel } from "../../../models/employee.model";
import { RoleTitle, RoleModel } from "../../../models/role.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";


// signalr
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-maps',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  dataChild: EmployeeModel
  typeChild: string
  resEmployee: EmployeeModel[]
  resRole: RoleModel[]
  response: ResponseModel
  data: EmployeeModel
  type: boolean
     //signalr
  private hubConnectionBuilder: HubConnection


  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "restoreEmployeeModal",
    idModalDelete: "deleteEmployeeModal",
    idModal: "gridEmployee",
    radioBox: true,
    radioBoxName: "Kho lưu trữ",
  }


    constructor(private roleService: RoleService,
       private configService: ConfigService,
        private employeeService: EmployeeService,
         private notificationService: NotificationService) {}

  ngOnInit() {


    this.init(this.type)
    this.hubConnectionBuilder = this.configService.signIR(this.init())
    this.hubConnectionBuilder.start();
    this.hubConnectionBuilder.on('Init', (result: any) => {
      this.init(this.type)
    })



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
  }

  init(e?){
    this.type = e
    this.employeeService.gets(this.type).subscribe(res => {
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

    this.roleService.views().then(response => {
      this.resRole = response
    })

    setTimeout(() => {

      this.columnDefs= [
        { field: 'idEmployee', headerName: "Mã số", style: "width: 350px;", searchable: true, searchType: 'text', searchObj: 'idEmployee'},
        { field: 'nameEmployee',headerName: "Tên", style: "width: 400px;", searchable: true, searchType: 'text', searchObj: 'nameEmployee'},
        { field: 'email',headerName: "Email", style: "width: 200px;", searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'roleName',headerName: "Chức vụ", style: "width: 250px;", searchable: true, searchType: 'section', searchObj: 'roleId', searchStyle: "width: 200px;", multiple: true, closeOnSelect: false, bindLabel: 'nameRole', bindValue: "idRole", listSection: this.resRole},
        { field: 'isActive',headerName: "Kích hoạt", style: "width: 200px;", filter: "status", searchable: true, searchType: 'section', searchStyle: "width: 150px;", multiple: false, closeOnSelect: true, searchObj: 'isActive', bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];
    }, 200);
  }

  childData(e){
    if (e) {
      this.dataChild = e
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
     this.employeeService.delete(this.data.idEmployee).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, "Error")
     })
    }
   }

   restore(){
    if (this.data) {
      this.employeeService.restore(this.data.idEmployee).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
    }
  }
}


