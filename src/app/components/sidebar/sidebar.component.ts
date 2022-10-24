import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Thống kê',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-purple', class: '' },
    { path: '/banner', title: 'Banner',  icon:'ni ni-image text-purple', class: '' },
    { path: '/list-location', title: 'Vị trí',  icon:'ni ni-square-pin text-purple', class: '' },
    { path: '/list-role', title: 'Chức phụ',  icon:'ni ni-circle-08 text-purple', class: '' },
    { path: '/list-employee', title: 'Nhân viên',  icon:'ni ni-circle-08 text-purple', class: '' },
    { path: '/item-employee/:id1/:id2', title: 'Thông tin chi tiết',  icon:'', class: 'd-none' },

    { path: '/list-customer', title: 'Customer',  icon:'ni ni-single-02 text-purple', class: '' },
    { path: '/list-tour', title: 'Tour',  icon:'ni ni-world-2 text-purple', class: '' },
    { path: '/list-schedule', title: 'Schedule',  icon:'ni ni-calendar-grid-58 text-purple', class: '' },
    { path: '/list-tourBooking', title: 'tourBooking',  icon:'ni ni-collection text-purple', class: '' },
    { path: '/list-hotel', title: 'Hotel',  icon:'ni ni-building text-purple', class: '' },
    { path: '/list-restaurant', title: 'Restaurant',  icon:'ni-bullet-list-67 text-purple', class: '' },
    { path: '/list-place', title: 'Place',  icon:'ni ni-pin-3 text-purple', class: '' },
    { path: '/list-promotion', title: 'Promotion',  icon:'ni ni-tag text-purple', class: '' },
    { path: '/list-car', title: 'Car',  icon:'ni ni-bus-front-12 text-purple', class: '' },
  ]



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
