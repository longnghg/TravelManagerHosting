import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridDataComponent } from './grid-data/grid-data.component';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    AgGridModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GridDataComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GridDataComponent
  ]
})
export class ComponentsModule { }
