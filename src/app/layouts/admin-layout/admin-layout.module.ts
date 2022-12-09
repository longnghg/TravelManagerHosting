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
import { ListPlaceComponent } from '../../pages/servicess/place/list-place/list-place.component';
import { ItemPlaceComponent } from '../../pages/servicess/place/item-place/item-place.component';

import { ListProvinceComponent } from '../../pages/locations/provinces/list-province/list-province.component';
import { ItemProvinceComponent } from '../../pages/locations/provinces/item-province/item-province.component';
import { ListDistrictComponent } from '../../pages/locations/districts/list-district/list-district.component';
import { ItemDistrictComponent } from '../../pages/locations/districts/item-district/item-district.component';
import { ItemWardComponent } from '../../pages/locations/wards/item-ward/item-ward.component';
import { ListWardComponent } from '../../pages/locations/wards/list-ward/list-ward.component';

import { ItemVoucherComponent } from 'src/app/pages/voucher/item-voucher/item-voucher.component';
import { ListVoucherComponent } from 'src/app/pages/voucher/list-voucher/list-voucher.component';

import { ListHotelComponent } from '../../pages/servicess/hotel/list-hotel/list-hotel.component';
import { ItemHotelComponent } from '../../pages/servicess/hotel/item-hotel/item-hotel.component';

import { ListCustomerComponent } from '../../pages/customer/list-customer/list-customer.component';
import { ItemCustomerComponent } from '../../pages/customer/item-customer/item-customer.component';
import { ItemTourComponent } from '../../pages/tour/item-tour/item-tour.component';
import { ListTourComponent } from '../../pages/tour/list-tour/list-tour.component';

import { ListPromotionComponent } from '../../pages/promotion/list-promotion/list-promotion.component';
import { ItemPromotionComponent } from '../../pages/promotion/item-promotion/item-promotion.component';

import { ListRestaurantComponent } from '../../pages/servicess/restaurant/list-restaurant/list-restaurant.component';
import { ItemRestaurantComponent } from '../../pages/servicess/restaurant/item-restaurant/item-restaurant.component';

import { ListCarComponent } from '../../pages/car/list-car/list-car.component';
import { ItemCarComponent } from '../../pages/car/item-car/item-car.component';

import { NgSelectModule }           from '@ng-select/ng-select';
import { NgOptionHighlightModule }  from '@ng-select/ng-option-highlight';


import { ListTourBookingComponent } from '../../pages/tourBookings/list-tour-booking/list-tour-booking.component';
import { ItemTourBookingComponent } from '../../pages/tourBookings/item-tour-booking/item-tour-booking.component';


import { ViewTourScheduleComponent } from '../../pages/tour/view-tour-schedule/view-tour-schedule.component';
import { ItemTourScheduleComponent } from '../../pages/tour/item-tour-schedule/item-tour-schedule.component';

import { NgChartsModule } from 'ng2-charts';
import { PipesModule } from "../../pipes/pipes.module";

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
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
    PipesModule,
    NgChartsModule,
    CKEditorModule
  ],
  declarations: [

    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    BannerComponent,
    ItemTourBookingComponent,
    ListLocationComponent,
    ItemLocationComponent,

    ListRoleComponent,
    ItemRoleComponent,ItemPlaceComponent ,ListPlaceComponent,

    ListEmployeeComponent,
    ItemEmployeeComponent,
    ListProvinceComponent,
    ItemProvinceComponent,
    ListDistrictComponent,
    ItemDistrictComponent,
    ItemWardComponent,
    ListWardComponent,
    ListTourBookingComponent,
    ListHotelComponent,
    ItemHotelComponent,
    ListPromotionComponent,
    ItemPromotionComponent,
    ListCarComponent,
    ItemCarComponent,
    ListCustomerComponent,
    ItemCustomerComponent,
    ItemTourComponent,
    ListTourComponent,
    ListRestaurantComponent,
    ItemRestaurantComponent,
    ViewTourScheduleComponent,
    ItemTourScheduleComponent,
    ItemVoucherComponent,
    ListVoucherComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class AdminLayoutModule {}
