import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../services_API/notification.service";
import { ConfigService } from "../../../services_API/config.service";
import { CustomerService } from 'src/app/services_API/customer.service';
import { CustomerModel } from 'src/app/models/customer.model';
import { ResponseModel } from "../../../models/responsiveModels/response.model";
import { ColDef, GridConfig} from '../../../components/grid-data/grid-data.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {
  resCustomer: CustomerModel[]
  response: ResponseModel
  dataChild: CustomerModel
  typeChild: string
  constructor(private customerService: CustomerService, private notificationService: NotificationService,
    private configService: ConfigService) { }


    public columnDefs: ColDef[]
    public gridConfig: GridConfig = {
      idModalRestore: "",
      idModalDelete: "",
      idModal: "gridCustomer",
      radioBox: true,
      radioBoxName: "Kho lưu trữ",
    }
    ngOnInit(): void {

      this.init()

      setTimeout(() => {
        this.columnDefs= [
          // { field: 'idCustomer', headerName: "Mã số", style: "width: 350px;", searchable: true, searchType: 'text', searchObj: 'idCustomer'},
        { field: 'nameCustomer',headerName: "Tên", style: "width: 400px;", searchable: true, searchType: 'text', searchObj: 'nameCustomer'},
        { field: 'email',headerName: "Email", style: "width: 200px;", searchable: true, searchType: 'email', searchObj: 'email'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'password',headerName: "Mật khẩu", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'password'},
        { field: 'birthday',headerName: "Ngày sinh", style: "width: 160px;", searchable: true, searchType: 'date', searchObj: 'birthday'},
        { field: 'point',headerName: "Điểm", style: "width: 160px;", searchable: true, searchType: 'text', searchObj: 'point'},
        ];
      }, 200);
    }

    init(){
      this.customerService.gets().subscribe(res =>{
        this.response = res
        if(!this.response.notification.type){
          this.resCustomer = this.response.content
        }
        else{
          this.resCustomer = null
        }
      }, error => {
        var message = this.configService.error(error.status, error.error != null?error.error.text:"");
        this.notificationService.handleAlert(message, "Error")
      })
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
  }
