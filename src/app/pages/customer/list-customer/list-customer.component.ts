import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';
import { StatusNotification } from "../../../enums/enum";
import { PaginationModel } from 'src/app/models/responsiveModels/pagination.model';
@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  @ViewChild('closeModalBlockLoad') closeModalBlockLoad: ElementRef;
  resCustomer: CustomerModel[]
  response: ResponseModel
  dataChild: CustomerModel
  data: CustomerModel
  typeChild: string
  pagination = new PaginationModel
  isLoading: boolean
  constructor(private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }


    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModal: "gridCustomer",
      disableApprove: true,
      disableCreate: true,
      disableDelete: true,
      disableRestore: true,
      disableRadioBox: true
    }
    ngOnInit(): void {

      setTimeout(() => {
        this.columnDefs= [
          // { field: 'idCustomer', headerName: "Mã số", style: "width: 350px;", searchable: true, searchType: 'text', searchObj: 'idCustomer'},
        { field: 'nameCustomer',headerName: "Tên", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'nameCustomer'},
        { field: 'email',headerName: "Email", style: "width: 20%;", searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 20%;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'point',headerName: "Điểm", style: "width: 10%;", searchable: true, searchType: 'text', searchObj: 'point'},
        ];
      }, 200);

      this.gridConfig.pageSize = this.pagination.pageSize
      this.search(this.pagination, true)
    }

    init(){
      this.customerService.gets().subscribe(res =>{
        this.response = res
        if(this.response.notification.type == StatusNotification.Success){
          this.resCustomer = this.response.content
        }
        else{
          this.resCustomer = null
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, StatusNotification.Error)
      })
    }

    search(e, isNotShow?){
      if (e) {
        this.customerService.search(Object.assign({}, e)).subscribe(res => {
          this.response = res
          console.log(res);

          if(this.response.notification.type == StatusNotification.Success)
          {
            this.resCustomer = this.response.content
          }
          else{
            // this.resHotel = Object.assign([], this.resHotelTmp)
            this.resCustomer = []
            if (!isNotShow) {
              this.notificationService.handleAlertObj(res.notification)
            }
          }
          this.gridConfig.totalResult = this.response.totalResult
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, StatusNotification.Error)
        })
      }
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

    block(){
      if (this.data) {
        this.customerService.block(this.data.idCustomer, this.data.isBlock).subscribe(res =>{
         this.response = res
         this.notificationService.handleAlertObj(res.notification)
         this.isLoading = false
         setTimeout(() => {
          this.closeModalBlockLoad.nativeElement.click()
         }, 100);
       }, error => {
         var message = this.configService.error(error.status, error.error != null?error.error.text:"");
         this.notificationService.handleAlert(message, StatusNotification.Error)
         this.isLoading = false
       })
      }
    }
  }
