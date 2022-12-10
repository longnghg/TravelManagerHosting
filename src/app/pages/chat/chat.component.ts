import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMessage, Message } from "../../models/message.model";
import { AuthenticationModel } from "../../models/authentication.model";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor(private notificationService: NotificationService,  private configService: ConfigService,private router: Router, private activatedRoute: ActivatedRoute) { }
  resMess: GroupMessage
  dataSend: Message = new Message
  auth: AuthenticationModel
  response: ResponseModel
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
  }

  ngDoCheck(): void {
   if (this.resMess) {
    if (this.activatedRoute.snapshot.paramMap.get('id') != this.resMess.idCustomer) {
      this.resMess = JSON.parse(sessionStorage.getItem(this.activatedRoute.snapshot.paramMap.get('id')))
    }
   }
   else{
    this.resMess = JSON.parse(sessionStorage.getItem(this.activatedRoute.snapshot.paramMap.get('id')))
   }
  }


  reply(){
    this.dataSend.receiverId = this.resMess.idCustomer
    this.dataSend.senderId = this.auth.id
    this.dataSend.senderName = this.auth.name
    this.notificationService.reply(this.dataSend).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resMess.messengers.push(this.dataSend)
        sessionStorage.setItem( this.resMess.idCustomer, JSON.stringify(this.resMess))
        this.dataSend = new Message
        document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
