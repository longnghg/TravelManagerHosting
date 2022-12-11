import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupMessage, Message } from "../../models/message.model";
import { AuthenticationModel } from "../../models/authentication.model";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { StatusNotification } from "../../enums/enum";
import { Router, ActivatedRoute } from '@angular/router';

// signalr
import { HubConnection } from '@microsoft/signalr';
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
  idTmp: string
  resGroup: GroupMessage[]
       //signalr
       private hubConnectionBuilder: HubConnection
  ngOnInit(): void {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.initChat();

  }
  ngAfterViewInit(): void{
    this.loadMessageSignalR()
  }
  loadMessageSignalR(){
    this.hubConnectionBuilder.on('Message', (result: any) => {
      this.initChat();
    })
  }
  reply(){
    this.dataSend.receiverId = this.resMess.idCustomer
    this.dataSend.senderId = this.auth.id
    this.dataSend.senderName = this.auth.name
    this.notificationService.reply(this.dataSend).then(res => {

      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.configService.callChatSignalR(this.dataSend.receiverId)
        this.dataSend = new Message
        this.initChat()
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }

  initChat(){
    this.notificationService.view(this.auth.id).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        this.resGroup = this.response.content
        if(this.resMess){
          this.resGroup.forEach(group => {
            if (this.resMess.idCustomer == group.idCustomer) {
              this.resMess = group
              setTimeout(() => {
                document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
              }, 200);
            }
          });
        }
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
  returnHome(){
    var path = this.configService.getPath(this.auth.roleId)
    this.router.navigate(['',path.replace("/","")]);
  }


  getData(data: GroupMessage){
    this.resMess = data
   setTimeout(() => {
    document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
   }, 200);

    this.notificationService.updateIsSeenMess(data.idCustomer).then(res => {
      this.response = res
      if (this.response.notification.type == StatusNotification.Success) {
        data.isSeen = true
        data.totalNew = 0
        if (!this.idTmp) {
          document.getElementById(data.idCustomer).setAttribute("class","card-sidebar card-active")
          this.idTmp = data.idCustomer
        }
        else{
          document.getElementById(data.idCustomer).setAttribute("class","card-sidebar card-active")
          document.getElementById(this.idTmp).setAttribute("class","card-sidebar")
          this.idTmp = data.idCustomer
        }
      }
    }, error => {
      var message = this.configService.error(error.status, error.error != null ? error.error.text : "");
      this.notificationService.handleAlert(message, StatusNotification.Error)
    })
  }
}
