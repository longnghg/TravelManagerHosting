import { Component, OnInit, Input,Output,EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { ValidationVoucherModel, VoucherModel,  } from "src/app/models/voucher.model";
import { VoucherService } from "../../../services_API/voucher.service";
import { NotificationService } from "../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../services_API/config.service";
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { StatusNotification } from "../../../enums/enum";
import { AuthenticationModel } from 'src/app/models/authentication.model';
import { ListVoucherComponent } from "../list-voucher/list-voucher.component";
@Component({
  selector: 'app-item-voucher',
  templateUrl: './item-voucher.component.html',
  styleUrls: ['./item-voucher.component.scss']
})
export class ItemVoucherComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() resVoucher: VoucherModel
  @Input() type: string
  @Output() parentData = new EventEmitter<any>()
  @Output() parentType = new EventEmitter<any>()
  auth: AuthenticationModel
  validateVoucher: ValidationVoucherModel = new ValidationVoucherModel
  response: ResponseModel
  isChange: boolean = false
  resVoucherTmp: VoucherModel
  formData: any
  isLoading: boolean

  constructor(private voucherService: VoucherService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private listVoucherComponent: ListVoucherComponent) { }

  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))

  }

  ngOnChanges(): void {
    if(this.type == 'create'){
      this.resVoucher = new VoucherModel()
      this.resVoucherTmp = Object.assign({}, this.resVoucher)
    }
    else{
      if(this.resVoucher){
        this.resVoucher.endDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.endDate)
        this.resVoucher.startDateDisplay = this.configService.formatFromUnixTimestampToFullDate(this.resVoucher.startDate)
      }
    }
  }

  dateChange(property: string) {
    this.resVoucher[property] = new Date(this.resVoucher[property+"Display"]).getTime()
  }
  inputChange(){
    if (JSON.stringify(this.resVoucher) != JSON.stringify(this.resVoucherTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }


  backup(){
    this.resVoucher = Object.assign({}, this.resVoucherTmp)
    this.isChange = false
    this.notificationService.handleAlert("Khôi phục dữ liệu ban đầu thành công !", StatusNotification.Info)
  }

  save(){
    this.validateVoucher = new ValidationVoucherModel
    this.validateVoucher =  this.configService.validateVoucher(this.resVoucher, this.validateVoucher)
    if (this.validateVoucher.total == 0) {
      this.resVoucher.IdUserModify = this.auth.id
      if(this.type == "create")
      {
        this.voucherService.create(this.resVoucher).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)
          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resVoucher = Object.assign({}, new VoucherModel)
            this.resVoucherTmp = Object.assign({}, new VoucherModel)
            this.validateVoucher = new ValidationVoucherModel
            this.isChange = false
            this.listVoucherComponent.ngOnInit()
          }
          this.isLoading = false
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"aa");
          this.notificationService.handleAlert(message, StatusNotification.Error)
          this.isLoading = false

        })
      }
      else
      {
          this.voucherService.update(this.resVoucher, this.resVoucher.idVoucher).subscribe(res =>{
            this.response = res
            this.notificationService.handleAlertObj(res.notification)

            if(this.response.notification.type == StatusNotification.Success)
            {
              this.isChange = false
              this.listVoucherComponent.ngOnInit()
              setTimeout(() => {
                this.closeModal.nativeElement.click()
              }, 100);
            }

            this.isLoading = false
          }, error => {
            var message = this.configService.error(error.status, error.error != null?error.error.text:"");
            this.notificationService.handleAlert(message, StatusNotification.Error)
            this.isLoading = false
          })
       }

      }
    }

    close(){
      this.resVoucher = Object.assign({}, this.resVoucherTmp)
      this.validateVoucher = new ValidationVoucherModel

      this.isChange = false
       this.parentType.emit(null);
    }

    getParentData(type?: string){
      this.parentType.emit(type);
      this.parentData.emit(this.resVoucher);
    }
  }
