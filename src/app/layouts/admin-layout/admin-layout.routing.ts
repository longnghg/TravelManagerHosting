import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BannerComponent } from '../../pages/banner/banner.component';


import { ListProvinceComponent } from 'src/app/pages/Location/province/list-province/list-province.component';
import { ListDistrictsComponent } from '../../pages/Location/districts/list-districts/list-districts.component';

import { ListRoleComponent } from '../../pages/roles/list-role/list-role.component';

import { ListWardComponent } from '../../pages/Location/ward/list-ward/list-ward.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

    { path: 'banner',         component: BannerComponent },

    { path: 'list-province',  component: ListProvinceComponent },

    { path: 'list-district',  component: ListDistrictsComponent },

    { path: 'list-ward',  component: ListWardComponent },

    { path: 'list-role',  component: ListRoleComponent },
];
