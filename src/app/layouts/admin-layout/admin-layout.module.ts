import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { ComponentsModule } from '../../components/components.module'

import { BannerComponent } from '../../pages/banner/banner.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { ListProvinceComponent } from '../../pages/Location/province/list-province/list-province.component';
import { ItemProvinceComponent } from '../../pages/Location/province/item-province/item-province.component';
<<<<<<< HEAD
import { ListDistrictsComponent } from '../../pages/Location/districts/list-districts/list-districts.component';
import { ItemDistrictsComponent } from '../../pages/Location/districts/item-districts/item-districts.component';
=======

import { ListWardComponent } from '../../pages/Location/ward/list-ward/list-ward.component';
import { ItemWardComponent } from '../../pages/Location/ward/item-ward/item-ward.component';

>>>>>>> 810af9fa62b63dc011143592b5ef631374986f77
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AgGridModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,

    BannerComponent,

    ListProvinceComponent,
    ItemProvinceComponent,
<<<<<<< HEAD
    ListDistrictsComponent,
    ItemDistrictsComponent
=======
    ListWardComponent,
    ItemWardComponent


>>>>>>> 810af9fa62b63dc011143592b5ef631374986f77

  ]
})


export class AdminLayoutModule {}
