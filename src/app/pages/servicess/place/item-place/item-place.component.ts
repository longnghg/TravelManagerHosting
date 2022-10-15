import { Component, OnInit, Input } from '@angular/core';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from "src/app/services_API/place.service"
import { NotificationService } from "../../../../services_API/notification.service";
import { ColDef, GridConfig} from '../../../../components/grid-data/grid-data.component';
import { ConfigService } from "../../../../services_API/config.service";
import { ResponseModel } from "../../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-place',
  templateUrl: './item-place.component.html',
  styleUrls: ['./item-place.component.scss']
})
export class ItemPlaceComponent implements OnInit {
  @Input() resPlace: PlaceModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resPlaceTmp: PlaceModel
  constructor(private placeService: PlaceService, private configService: ConfigService, private notificationService: NotificationService) { }


  ngOnInit(): void {
  }
  ngOnChanges(): void {

    if(this.type == 'create'){
      this.resPlace = new PlaceModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resPlaceTmp = Object.assign({}, this.resPlace)
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
    if (JSON.stringify(this.resPlace) != JSON.stringify(this.resPlaceTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resPlace = Object.assign({}, this.resPlaceTmp)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.placeService.create(this.resPlace).subscribe(res =>{
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
