import { Component, OnInit } from '@angular/core';
import { ConfigService } from "../../services_API/config.service";
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.checkRole()
  }

}
