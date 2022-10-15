import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss']
})
export class ListHotelComponent implements OnInit {
  resHotel: HotelModel[]
  response: ResponseModel
  dataChild: HotelModel
  typeChild: string
  constructor(private hotelService: HotelService, private configService: ConfigService, private notificationService: NotificationService) { }

  public columnDefs: ColDef[]
  public gridConfig: GridConfig = {
    idModalRestore: "",
    idModalDelete: "",
    idModal: "gridHotel",
    radioBox: true,
    radioBoxName: "Kho lưu trữ",
  }
  ngOnInit(): void {
    this.init()
    console.log(this.resHotel);

    setTimeout(() => {

      this.columnDefs= [
        { field: 'idHotel', headerName: "Mã số", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'idHotel'},
        { field: 'contractId',headerName: "Mã hợp đồng", style: "width: 330px;", searchable: true, searchType: 'text', searchObj: 'contractId'},
        { field: 'name',headerName: "Tên khách sạn", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'name'},
        { field: 'address',headerName: "Địa chỉ", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'address'},
        { field: 'phone',headerName: "Số điện thoại", style: "width: 250px;", searchable: true, searchType: 'text', searchObj: 'phone'},
        { field: 'star',headerName: "Số sao", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'star'},
        { field: 'quantitySR',headerName: "Số lượng phòng đơn", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'quantitySR'},
        { field: 'singleRoomPrice',headerName: "Giá phòng đơn", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'singleRoomPrice'},
        { field: 'quantityDBR',headerName: "Số lượng phòng đôi", style: "width: 150px;", searchable: true, searchType: 'text', searchObj: 'quantityDBR'},
        { field: 'doubleRoomPrice',headerName: "Giá phòng đôi", style: "width: 200px;", searchable: true, searchType: 'text', searchObj: 'doubleRoomPrice'},
      ];
    }, 200);
  }

  init(){
    this.hotelService.gets().subscribe(res =>{
      this.response = res
      if(!this.response.notification.type){
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
