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
];
