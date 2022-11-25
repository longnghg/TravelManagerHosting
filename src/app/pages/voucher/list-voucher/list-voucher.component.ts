import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { VoucherService } from '../../../services_API/voucher.service'
import { VoucherModel } from '../../../models/voucher.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';


@Component({
  selector: 'app-list-voucher',
  templateUrl: './list-voucher.component.html',
  styleUrls: ['./list-voucher.component.scss']
})
export class ListVoucherComponent implements OnInit {
  resVoucher: VoucherModel[]
  resVoucherTmp: VoucherModel[]
  response: ResponseModel
  dataChild: VoucherModel
  typeChild: string
  isDelete: boolean = false
  auth: AuthenticationModel
  data: any
  constructor(private voucherService: VoucherService, private notificationService: NotificationService,
    private configService: ConfigService) { }

    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "restoreVoucherModalLabel",
      idModalDelete: "deleteVoucherModalLabel",
      idModal: "gridCar",
      radioBoxName: "Kho lưu trữ",
      disableApprove: true
    }
      ngOnInit(): void {
        this.auth = JSON.parse(localStorage.getItem("currentUser"))
        this.init(this.isDelete)
      }

      init(isDelete){
        this.voucherService.gets(isDelete).subscribe(res =>{
          this.response = res
          if(this.response.notification.type == StatusNotification.Success){
            this.resVoucher = this.response.content
            console.log(this.resVoucher);

          }
          else{
            this.resVoucher = null
            this.notificationService.handleAlertObj(res.notification)
          }
          this.columnDefs= [
            { field: 'code', headerName: "Mã Code", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'code'},
            { field: 'description', headerName: "Mô Tả", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'description'},
            { field: 'point', headerName: "Điểm", style: "width: 10%;", searchable: true, searchType: 'text', searchObj: 'point'},
            { field: 'startDate',headerName: "Từ ngày", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'startDate',filter: 'date'},
            { field: 'endDate',headerName: "Đến ngày", style: "width: 15%;", searchable: true, searchType: 'text', searchObj: 'endDate', filter: 'date'},
            { field: 'value',headerName: "Giá trị", style: "width: 10%;", searchable: true, searchType: 'number', searchObj: 'endDvalueate', },
             ];
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
      childData(e){
        this.dataChild = Object.assign({}, e)
      }

      childType(e){
        this.typeChild = e
      }
      getData(data: any){
        this.data = data
      }

      delete(){
        if (this.data) {
          this.voucherService.delete(this.data.idVoucher).subscribe(res =>{
           this.response = res
           this.notificationService.handleAlertObj(res.notification)
         }, error => {
           var message = this.configService.error(error.status, error.error != null?error.error.text:"");
           this.notificationService.handleAlert(message, StatusNotification.Error)
         })
        }
      }

}
