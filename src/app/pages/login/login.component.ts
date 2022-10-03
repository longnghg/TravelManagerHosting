import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleModel, RoleTitle } from "../../models/role.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  model: RoleModel
  constructor() {}
  ngOnInit() {
   var RoleModel = {
      Id: 2,
      Name: 'string',
      Description: 'string',
      IsDelete: true
    }

    console.log(RoleTitle['Admin']);

    console.log(RoleTitle[RoleModel.Id]);

    this.model = RoleModel
    console.log(this.model);

  }
  ngOnDestroy() {
  }


}

