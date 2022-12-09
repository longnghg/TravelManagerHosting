import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { EmployeeService } from "../../../services_API/employee.service";
import { NotificationService } from "../../../services_API/notification.service";
import { EmployeeModel } from "../../../models/employee.model";
import { RoleModel } from "../../../models/role.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ColDef2, GridConfig2} from '../../../components/grid2-data/grid2-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { RoleService } from "../../../services_API/role.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { PaginationModel } from "../../../models/responsiveModels/pagination.model";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { RoleTitle, StatusNotification } from "../../../enums/enum";
// signalr
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-maps',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  @ViewChild('closeModalLoadDelete') closeModalLoadDelete: ElementRef;
  @ViewChild('closeModalLoadRestore') closeModalLoadRestore: ElementRef;
  @ViewChild('closeModalLoadApprove') closeModalLoadApprove: ElementRef;
  isLoading: boolean
  auth: AuthenticationModel
  dataChild: EmployeeModel
  typeChild: string
  resEmployee: EmployeeModel[]
  resEmployeeTmp: EmployeeModel[]
  resRole: RoleModel[]
  response: ResponseModel
  data: EmployeeModel
  // type: boolean = false
  pagination = new PaginationModel
     //signalr
  private hubConnectionBuilder: HubConnection


  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "restoreEmployeeModal",
    idModalDelete: "deleteEmployeeModal",
    idModal: "gridEmployee",
    disableRadioBox: false,
    radioBoxName: "Kho lưu trữ",
    style: "height: 330px;"
  }

  public gridConfig2: GridConfig2 = {
    idModalRestore: "restoreEmployeeModal1",
    idModalDelete: "deleteEmployeeModal1",
    route: "item-employee",
    alias: "idEmployee",
    style: "height: 330px;",
    radioBoxName: "Kho lưu trữ",
    disableApprove: true
  }

    constructor(private roleService: RoleService,
       private configService: ConfigService,
        private employeeService: EmployeeService,
         private notificationService: NotificationService) {}

  ngOnInit() {
    this.roleService.views().then(response =>
      {
        this.resRole = response
        this.columnDefs = [
          { field: 'nameEmployee',headerName: "Tên", style: 'width: 20%',   searchable: true, searchType: 'text', searchObj: 'nameEmployee'},
          { field: 'email',headerName: "Email", style: 'width: 15%', searchable: true, searchType: 'email', searchObj: 'email'},
          { field: 'phone',headerName: "Số điện thoại", style: 'width: 15%', filter: "number",searchable: true, searchType: 'text', searchObj: 'phone'},
          { field: 'roleName',headerName: "Chức vụ", style: 'width: 25%', searchable: true, searchType: 'section', searchObj: 'roleId', multiple: true, closeOnSelect: false, bindLabel: 'nameRole', bindValue: "idRole", listSection: this.resRole},
          { field: 'isActive',headerName: "Kích hoạt", style: 'width: 15%',  filter: "status", searchable: true, searchType: 'section', multiple: false, closeOnSelect: true, searchObj: 'isActive', bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
        ];
      }
    )

    this.gridConfig2.pageSize = this.pagination.pageSize
    this.auth = JSON.parse(localStorage.getItem("currentUser"));
    if (history.state.isDelete) {
      this.gridConfig2.isRestore = history.state.isDelete
      this.pagination.isDelete = history.state.isDelete
      this.search(this.pagination, true)
    }
    else{
      this.search(this.pagination, true)
    }
  }

  search(e?, isNotShow?){
    if (e) {
      this.employeeService.search(Object.assign({}, e)).subscribe(res => {
        this.response = res
        if(this.response.notification.type == StatusNotification.Success)
        {
          this.resEmployee = this.response.content
          // this.resEmployeeTmp = Object.assign([], this.resEmployee)
        }
        else{
          // this.resEmployee = this.resEmployeeTmp
          this.resEmployee = []
          if (!isNotShow) {
            this.notificationService.handleAlertObj(res.notification)
          }
        }
        this.gridConfig2.totalResult = this.response.totalResult

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

  init(e?){
    this.pagination.isDelete = e
    this.employeeService.gets(this.pagination.isDelete).subscribe(res => {
      this.response = res
      if(this.response.notification.type == StatusNotification.Success)
      {
        this.resEmployee = this.response.content
        this.resEmployeeTmp = Object.assign([], this.resEmployee)
      }
      else{
        this.resEmployee = null
        this.notificationService.handleAlertObj(res.notification)
      }

    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })


    this.roleService.views().then(response =>
      {
        this.resRole = response
      this.columnDefs = [
        { field: 'nameEmployee',headerName: "Tên", style: 'width: 20%',   searchable: true, searchType: 'text', searchObj: 'nameEmployee'},
        { field: 'email',headerName: "Email", style: 'width: 15%', searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", style: 'width: 15%', filter: "number",searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'roleName',headerName: "Chức vụ", style: 'width: 25%', searchable: true, searchType: 'section', searchObj: 'roleId', multiple: true, closeOnSelect: false, bindLabel: 'nameRole', bindValue: "idRole", listSection: this.resRole},
        { field: 'isActive',headerName: "Kích hoạt", style: 'width: 15%',  filter: "status", searchable: true, searchType: 'section', multiple: false, closeOnSelect: true, searchObj: 'isActive', bindLabel: "name", bindValue: "id", listSection: this.configService.listStatus()},
      ];
      }
    )
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
      if (this.data.idEmployee != this.auth.id) {
        this.employeeService.delete(this.data.idEmployee).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          this.isLoading = false
          setTimeout(() => {
            this.closeModalLoadDelete.nativeElement.click()
           }, 100);
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false
        })
      }
      else{
        this.isLoading = false
        this.notificationService.handleAlert("Bạn không thể xóa tài khoản đang đăng nhập !", StatusNotification.Error)
      }
    }
   }

   restore(){
    if (this.data) {
      this.employeeService.restore(this.data.idEmployee).subscribe(res =>{
        this.response = res
        this.notificationService.handleAlertObj(res.notification)
        this.isLoading = false
        setTimeout(() => {
          this.closeModalLoadRestore.nativeElement.click()
         }, 100);
      }, error => {
        this.isLoading = false
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
  }

}


