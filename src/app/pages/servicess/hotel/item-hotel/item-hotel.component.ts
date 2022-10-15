import { Component, OnInit, Input } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelService } from "src/app/services_API/hotel.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";
@Component({
  selector: 'app-item-hotel',
  templateUrl: './item-hotel.component.html',
  styleUrls: ['./item-hotel.component.scss']
})
export class ItemHotelComponent implements OnInit {
  @Input() resHotel: HotelModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resHotelTmp: HotelModel
  constructor(private hotelService: HotelService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if(this.type == 'create'){
      this.resHotel = new HotelModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resHotelTmp = Object.assign({}, this.resHotel)
  }

  isEditChange(){
    if (this.isEdit) {
      this.isEdit = false
      this.restore()

    }
    else{
      this.isEdit = true
    }
  }
  inputChange(){
    if (JSON.stringify(this.resHotel) != JSON.stringify(this.resHotelTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resHotel = Object.assign({}, this.resHotelTmp)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.hotelService.create(this.resHotel).subscribe(res =>{
          this.response = res
          this.notificationService.handleAlertObj(res.notification)

          if(this.response.notification.type == "Error")
          {
          }
        }, error => {
          var message = this.configService.error(error.status, error.error != null?error.error.text:"");
          this.notificationService.handleAlert(message, "Error")
        })
      }
      else{


      }
      this.close()
  }

  close(){
    if (this.type == 'detail') {
      this.isEdit = false
    }
     this.restore()
  }

}
