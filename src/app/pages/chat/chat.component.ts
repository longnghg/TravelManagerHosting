import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    document.getElementById("mess").scrollTop = document.getElementById("mess").scrollHeight
  }

}
