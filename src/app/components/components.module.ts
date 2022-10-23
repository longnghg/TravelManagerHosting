import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridDataComponent } from './grid-data/grid-data.component';
import { Grid2DataComponent } from './grid2-data/grid2-data.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule }           from '@ng-select/ng-select';
import { NgOptionHighlightModule }  from '@ng-select/ng-option-highlight';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GridDataComponent,
    Grid2DataComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    GridDataComponent,
    Grid2DataComponent
  ]
})
export class ComponentsModule { }
