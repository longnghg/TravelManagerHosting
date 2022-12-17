import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { LogsService } from '../../../services_API/logs.service'
import { LogsModel } from '../../../models/logs.model';
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';
import { TourModel } from '../../../models/tour.model';


@Component({
  selector: 'app-item-logs',
  templateUrl: './item-logs.component.html',
  styleUrls: ['./item-logs.component.scss']
})
export class ItemLogsComponent implements OnInit {
  @Input() resLog: LogsModel
  @Input() resTour : TourModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
//validateVoucher: ValidationVoucherModel = new ValidationVoucherModel
  response: ResponseModel
  isChange: boolean = false
  resLogTmp: LogsModel
  formData: any
  data: any
  constructor(private logsService: LogsService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
  }

  ngOnChanges(): void {
    this.resLogTmp = Object.assign({}, this.resLog)

  }

  dateChange(property: string) {
    this.resLog[property] = new Date(this.resLog[property+"Display"]).getTime()

  }
  getDetail(){



      this.resLog = Object.assign({}, this.resLogTmp)
      this.logsService.getDetail(this.resLog.id).subscribe(res =>{
      this.response = res


    this.resTour= this.response.content;


     //  this.notificationService.handleAlertObj(res.notification)

     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, StatusNotification.Error)

     })

  }
  inputChange(){
    if (JSON.stringify(this.resLog) != JSON.stringify(this.resLogTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }


  // backup(){
  //   this.resVoucher = Object.assign({}, this.resVoucherTmp)
  //   this.isChange = false
  //   this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  // }
  // save(){
  //   this.validateVoucher = new ValidationVoucherModel
  //   this.validateVoucher =  this.configService.validateVoucher(this.resVoucher, this.validateVoucher)
  //   console.log(this.validateVoucher);

  //   if (this.validateVoucher.total == 0) {
  //     this.resVoucher.IdUserModify = this.auth.id
  //     if(this.type == "create")
  //     {
  //       console.log(this.resVoucher);

  //       this.voucherService.create(this.resVoucher).subscribe(res =>{
  //         this.response = res
  //         this.notificationService.handleAlertObj(res.notification)
	//       if(this.response.notification.type == StatusNotification.Success)
  //       {
	// 	      this.resVoucher = Object.assign({}, new VoucherModel)
  //         this.resVoucherTmp = Object.assign({}, new VoucherModel)
  //         this.validateVoucher = new ValidationVoucherModel
  //         this.isChange = false
  //       }
  //       }, error => {
  //         var message = this.configService.error(error.status, error.error != null?error.error.text:"aa");
  //         this.notificationService.handleAlert(message, StatusNotification.Error)

  //       })
  //     }
  //     else
  //     {
  //         this.voucherService.update(this.resVoucher, this.resVoucher.idVoucher).subscribe(res =>{
  //           this.response = res
  //           this.notificationService.handleAlertObj(res.notification)

  //           if(this.response.notification.type == StatusNotification.Success)
  //           {
  //             this.isChange = false
  //           }
  //         }, error => {
  //           var message = this.configService.error(error.status, error.error != null?error.error.text:"");
  //           this.notificationService.handleAlert(message, StatusNotification.Error)

  //         })
  //      }

  //     }
  //   }

    close(){
      this.resLog = Object.assign({}, this.resLogTmp)
     // this.validateVoucher = new ValidationVoucherModel
console.log(this.resLog);


      this.isChange = false
       this.parentType.emit(null);

    }

    getParentData(type?: string){
      this.parentType.emit(type);
      this.parentData.emit(this.resLog);
    }

  }
