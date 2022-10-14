import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ListLocationComponent } from '../../pages/locations/list-location/list-location.component';
import { ItemLocationComponent } from '../../pages/locations/item-location/item-location.component';

import { ListRoleComponent } from '../../pages/roles/list-role/list-role.component';
import { ItemRoleComponent } from '../../pages/roles/item-role/item-role.component';

import { ListEmployeeComponent } from '../../pages/employee/list-employee/list-employee.component';
import { ItemEmployeeComponent } from '../../pages/employee/item-employee/item-employee.component';


import { ListProvinceComponent } from '../../pages/locations/provinces/list-province/list-province.component';
import { ItemProvinceComponent } from '../../pages/locations/provinces/item-province/item-province.component';
import { ListDistrictComponent } from '../../pages/locations/districts/list-district/list-district.component';
import { ItemDistrictComponent } from '../../pages/locations/districts/item-district/item-district.component';
import { ItemWardComponent } from '../../pages/locations/wards/item-ward/item-ward.component';
import { ListWardComponent } from '../../pages/locations/wards/list-ward/list-ward.component';


import { NgSelectModule }           from '@ng-select/ng-select';
import { NgOptionHighlightModule }  from '@ng-select/ng-option-highlight';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule,
    NgSelectModule,
    NgOptionHighlightModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,

    BannerComponent,

    ListLocationComponent,
    ItemLocationComponent,

    ListRoleComponent,
    ItemRoleComponent,

    ListEmployeeComponent,
    ItemEmployeeComponent,
    ListProvinceComponent,
    ItemProvinceComponent,
    ListDistrictComponent,
    ItemDistrictComponent,
    ItemWardComponent,
    ListWardComponent,

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class AdminLayoutModule {}
