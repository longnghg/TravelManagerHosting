import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BannerComponent } from '../../pages/banner/banner.component';


import { ListLocationComponent } from 'src/app/pages/locations/list-location/list-location.component';


import { ListRoleComponent } from 'src/app/pages/roles/list-role/list-role.component';

import { ListEmployeeComponent } from 'src/app/pages/employee/list-employee/list-employee.component';

import { ListCustomerComponent } from 'src/app/pages/customer/list-customer/list-customer.component';

import { ListTourComponent } from 'src/app/pages/tour/list-tour/list-tour.component';

import { ListScheduleComponent } from 'src/app/pages/schedule/list-schedule/list-schedule.component';

import { ListTourBookingComponent } from 'src/app/pages/tourBooking/list-tour-booking/list-tour-booking.component';

import { ListHotelComponent } from 'src/app/pages/servicess/hotel/list-hotel/list-hotel.component';

// import { ListPromotionComponent } from 'src/app/pages/promotion/list-promotion/list-promotion.component';

import { ListRestaurantComponent } from 'src/app/pages/servicess/restaurant/list-restaurant/list-restaurant.component';
import { Component } from '@angular/core';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'banner',         component: BannerComponent },

    { path: 'list-location',  component: ListLocationComponent },

    { path: 'list-role',  component: ListRoleComponent },
    { path: 'list-employee',  component: ListEmployeeComponent },
    { path: 'list-customer',  component: ListCustomerComponent },
    { path: 'list-tour',  component: ListTourComponent },
    { path: 'list-schedule',  component: ListScheduleComponent},
    { path: 'list-tourBooking',  component: ListTourBookingComponent},
    { path: 'list-hotel',     component: ListHotelComponent},
    // { path: 'list-promotion',  component: ListPromotionComponent},
    { path: 'list-restaurant',     component: ListRestaurantComponent},
];
