import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
import { AuthenticationModel } from "../../../../models/authentication.model"

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})
export class ListHotelComponent implements OnInit {
  auth: AuthenticationModel
  resHotel: HotelModel[]
  resHotelWaiting: HotelModel[]
  response: ResponseModel
  dataChild: HotelModel
  typeChild: string
  data: HotelModel
  constructor(private hotelService: HotelService,
    private configService: ConfigService,
    private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "deleteHotelModal",
    idModal: "gridHotel",
    radioBoxName: "Kho lưu trữ",
  }
  public gridConfigWaiting: GridConfig = {
    idModal: "gridHotel",
  }
  ngOnInit(): void {
    this.init();
  }

  init(){
    this.hotelService.gets().subscribe(res =>{
      this.response = res
      if(this.response.notification.type){
        this.resHotel = this.response.content
      }
      else{
        this.resHotel = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })

    setTimeout(() => {

      this.columnDefs= [
        { field: 'name',headerName: "Tên khách sạn", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'star',headerName: "Số sao", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'star'},
        { field: 'quantitySR',headerName: "Số lượng phòng đơn", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'quantitySR'},
        { field: 'singleRoomPrice',headerName: "Giá phòng đơn", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'singleRoomPrice'},
        { field: 'quantityDBR',headerName: "Số lượng phòng đôi", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'quantityDBR'},
        { field: 'doubleRoomPrice',headerName: "Giá phòng đôi", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'doubleRoomPrice'},
      ];
    }, 200);

    this.hotelService.getsWaiting().subscribe(res =>{
      this.response = res
      if(this.response.notification.type){
        this.resHotelWaiting = this.response.content
      }
      else{
        this.resHotel = null
        this.notificationService.handleAlertObj(res.notification)
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null?error.error.text:"");
      this.notificationService.handleAlert(message, "Error")
    })
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
     // giờ tới bước check api , do gọi api, api nó trả về trường hợp error, cú pháp đúng hết r giờ mình check dữ liêu jtruyeefn vào

     // dữ liệu trtuyeefn vào đúng, nhưng mà vẫn lỗi, v có thể lỗi ở api hoặc db

     this.hotelService.delete(this.data.idHotel).subscribe(res =>{
       this.response = res
       this.notificationService.handleAlertObj(res.notification)
     }, error => {
       var message = this.configService.error(error.status, error.error != null?error.error.text:"");
       this.notificationService.handleAlert(message, "Error")
       console.log("sảioi");
     })
    }
   }

}
