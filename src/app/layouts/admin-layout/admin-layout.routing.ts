import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BannerComponent } from '../../pages/banner/banner.component';


import { ListLocationComponent } from 'src/app/pages/locations/list-location/list-location.component';


import { ListRoleComponent } from 'src/app/pages/roles/list-role/list-role.component';

import { ListEmployeeComponent } from 'src/app/pages/employee/list-employee/list-employee.component';
import { ItemEmployeeComponent } from 'src/app/pages/employee/item-employee/item-employee.component';

import { ListCustomerComponent } from 'src/app/pages/customer/list-customer/list-customer.component';

import { ListTourComponent } from 'src/app/pages/tour/list-tour/list-tour.component';

import { ListTourBookingComponent } from 'src/app/pages/tourBookings/list-tour-booking/list-tour-booking.component';

import { ListHotelComponent } from 'src/app/pages/servicess/hotel/list-hotel/list-hotel.component';
import { ListPlaceComponent } from '../../pages/servicess/place/list-place/list-place.component';
import { ListPromotionComponent } from 'src/app/pages/promotion/list-promotion/list-promotion.component';
import { ListCarComponent } from 'src/app/pages/car/list-car/list-car.component';


import { ListRestaurantComponent } from 'src/app/pages/servicess/restaurant/list-restaurant/list-restaurant.component';
import { ViewTourScheduleComponent } from '../../pages/tour/view-tour-schedule/view-tour-schedule.component';

import { ItemTourComponent } from 'src/app/pages/tour/item-tour/item-tour.component';
import { ListVoucherComponent } from 'src/app/pages/voucher/list-voucher/list-voucher.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },

    { path: 'banner',         component: BannerComponent },

    { path: 'list-location',  component: ListLocationComponent },

    { path: 'list-role',  component: ListRoleComponent },
    { path: 'list-employee',  component: ListEmployeeComponent },
    { path: 'item-employee/:id1/:id2',  component: ItemEmployeeComponent },

    { path: 'list-customer',  component: ListCustomerComponent },
    { path: 'list-tour',  component: ListTourComponent },
    { path: 'item-tour/:id1/:id2',  component: ItemTourComponent },
    { path: 'list-tourBooking',  component: ListTourBookingComponent},
    { path: 'list-hotel',     component: ListHotelComponent},
    { path: 'list-promotion',  component: ListPromotionComponent},
    { path: 'list-restaurant',     component: ListRestaurantComponent},
    { path: 'list-place',     component: ListPlaceComponent},
    { path: 'list-car',     component: ListCarComponent},
    { path: 'list-voucher',     component: ListVoucherComponent},
    { path: 'view-tour-schedule',     component: ViewTourScheduleComponent},
];
