import { Component, OnInit, Input } from '@angular/core';
import { TourModel } from 'src/app/models/tour.model';
import { TourService } from "src/app/services_API/tour.service"
import { NotificationService } from "./../../../services_API/notification.service";
import { ColDef, GridConfig} from './../../../components/grid-data/grid-data.component';
import { ConfigService } from "./../../../services_API/config.service";
import { ResponseModel } from "./../../../models/responsiveModels/response.model";

@Component({
  selector: 'app-item-tour',
  templateUrl: './item-tour.component.html',
  styleUrls: ['./item-tour.component.scss']
})
export class ItemTourComponent implements OnInit {

  @Input() resTour: TourModel
  @Input() type: string
  response: ResponseModel
  isEdit: boolean = false
  isChange: boolean = false
  resTourTmp: TourModel
  constructor(private tourService: TourService, private configService: ConfigService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {

    if(this.type == 'create'){
      this.resTour = new TourModel()
      this.isEdit = true
    }else{
      this.isEdit = false
    }
    this.resTourTmp = Object.assign({}, this.resTour)
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
    if (JSON.stringify(this.resTour) != JSON.stringify(this.resTourTmp)) {
      this.isChange = true
    }
    else{
      this.isChange = false
    }
  }

  restore(){
    this.resTour = Object.assign({}, this.resTour)
    this.isChange = false
  }

  save(){

      if(this.type == "create")
      {
        this.tourService.create(this.resTour).subscribe(res =>{
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
