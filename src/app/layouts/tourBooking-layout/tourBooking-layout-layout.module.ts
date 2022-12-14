import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TourBookingLayoutRoutes } from './tourBooking-layout-layout.routing';

import { PipesModule } from "../../pipes/pipes.module";

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ListTourBookingComponent } from '../../pages/tourBookings/list-tour-booking/list-tour-booking.component';
import { ItemTourBookingComponent } from '../../pages/tourBookings/item-tour-booking/item-tour-booking.component';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TourBookingLayoutRoutes),
    FormsModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [
    ItemTourBookingComponent,
    ListTourBookingComponent,
  ],
  providers: [NavbarComponent]

})
export class TourBookingLayoutModule { }
