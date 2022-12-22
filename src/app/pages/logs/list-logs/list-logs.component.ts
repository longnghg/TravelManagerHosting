import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { LogsService } from '../../../services_API/logs.service'
import { LogsModel } from '../../../models/logs.model';
import { TourModel } from '../../../models/tour.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.scss']
})
export class ListLogsComponent implements OnInit {

  @ViewChild('closeModalDeleteLoad') closeModalDeleteLoad: ElementRef;
    @ViewChild('closeModalRestoreLoad') closeModalRestoreLoad: ElementRef;
    isLoading: boolean
    resLog: LogsModel[]
    resLogtmp: LogsModel[]
    response: ResponseModel
    dataChild: LogsModel
    resRole: LogsModel[]
    typeChild: string
    resTour : TourModel
    isDelete: boolean = false
    auth: AuthenticationModel
    data: any
    pagination = new PaginationModel
  constructor(private logsService: LogsService, private notificationService: NotificationService,
    private configService: ConfigService) { }

    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
     // idModalRestore: "restoreVoucherModalLabel",
    //  idModalDelete: "deleteVoucherModalLabel",
      idModal: "gridLog",
      disableApprove: true,
      disableCreate: true,
      disableDelete: true,
      disableRestore: true,
      disableRadioBox: true,
      disableLog: true,
      disableSchedule: true
    }
    ngOnInit(): void {
      this.columnDefs= [
        { field: 'classContent',headerName: "Lớp nội dung", style: "width: 20%;",searchable: true, searchType: 'section', searchObj: 'classContent', multiple: true, closeOnSelect: false, bindLabel: 'name', bindValue: "id" , listSection: this.configService.listClassContent()},
        { field: 'emailCreator', headerName: "Tên người tạo", style: "width: 20%;", searchable: false, searchType: 'text', searchObj: 'emailCreator'},
        { field: 'type', headerName: "Loại ", style: "width: 20%;", searchable: false, searchType: 'text', searchObj: 'type'},
        { field: 'creationDate', headerName: "Ngày tạo ", style: "width: 20%;", searchable: false, searchType: 'date', searchObj: 'creationDate', filter: 'date'},
         ];

      this.auth = JSON.parse(localStorage.getItem("currentUser"))
      this.gridConfig.pageSize = this.pagination.pageSize
      this.search(this.pagination, true)
    }

    search(e, isNotShow?){

      this.logsService.gets(Object.assign({}, e)).subscribe(res =>{
        this.response = res

        if(this.response.notification.type == StatusNotification.Success){
          this.resLog = this.response.content
          console.log(this.resLog);


        }
        else{
          this.resLog = null
          this.notificationService.handleAlertObj(res.notification)
        }

      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }
    childData(e){
      this.dataChild = Object.assign({}, e)
      this.resTour = JSON.parse(this.dataChild.content)
    }

    childType(e){
      this.typeChild = e
    }
    getData(data: any){
      this.data = data
    }

}
