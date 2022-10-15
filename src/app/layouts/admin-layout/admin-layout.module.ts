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

import { ListScheduleComponent } from '../../pages/schedule/list-schedule/list-schedule.component';
import { ItemScheduleComponent } from '../../pages/schedule/item-schedule/item-schedule.component';

import { ListHotelComponent } from '../../pages/servicess/hotel/list-hotel/list-hotel.component';
import { ItemHotelComponent } from '../../pages/servicess/hotel/item-hotel/item-hotel.component';

import { ListCustomerComponent } from '../../pages/customer/list-customer/list-customer.component';
import { ItemCustomerComponent } from '../../pages/customer/item-customer/item-customer.component';
import { ItemTourComponent } from '../../pages/tour/item-tour/item-tour.component';
import { ListTourComponent } from '../../pages/tour/list-tour/list-tour.component';

// import { ListPromotionComponent } from '../../../pages/promotion/list-promotion/list-promotion.component';
// import { ItemPromotionComponent } from '../../../pages/promotion/item-promotion/item-promotion.component';

import { ListRestaurantComponent } from '../../pages/servicess/restaurant/list-restaurant/list-restaurant.component';
import { ItemRestaurantComponent } from '../../pages/servicess/restaurant/item-restaurant/item-restaurant.component';

import { NgSelectModule }           from '@ng-select/ng-select';
import { NgOptionHighlightModule }  from '@ng-select/ng-option-highlight';


import { ListTourBookingComponent } from '../../pages/tourBooking/list-tour-booking/list-tour-booking.component';

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
    ListScheduleComponent,
    ItemScheduleComponent,
    ListTourBookingComponent,
    ListHotelComponent,
    ItemHotelComponent,
    // ListPromotionComponent,
    // ItemPromotionComponent,
    ListCustomerComponent,
    ItemCustomerComponent,
    ItemTourComponent,
    ListTourComponent,
    ListRestaurantComponent,
    ItemRestaurantComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class AdminLayoutModule {}
