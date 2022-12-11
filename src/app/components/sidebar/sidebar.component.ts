import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationModel } from "../../models/authentication.model";
import { GroupMessage } from "../../models/message.model";
import { ResponseModel } from "../../models/responsiveModels/response.model";
import { RoleTitle, StatusNotification } from "../../enums/enum";
import { ConfigService } from "../../services_API/config.service";
import { NotificationService } from "../../services_API/notification.service";
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: number[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Thống kê',  icon: 'ni ni-tv-2 text-primary', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager] },
    { path: '/list-role', title: 'Chức vụ',  icon:'fa-solid fa-key text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/list-location', title: 'Vị trí',  icon:'ni ni-square-pin text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/banner', title: 'Banner',  icon:'ni ni-image text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/list-employee', title: 'Nhân viên',  icon:'ni ni-circle-08 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/item-employee/:id1/:id2', title: '',  icon:'', class: 'd-none',  roles: [RoleTitle.Admin, RoleTitle.LocalManager]},
    { path: '/list-customer', title: 'Khách hàng',  icon:'ni ni-single-02 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/list-promotion', title: 'Mã khuyến mãi',  icon:'ni ni-tag text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },
    { path: '/list-car', title: 'Phương tiện',  icon:'ni ni-bus-front-12 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager]  },

    { path: '/list-tour', title: 'Tour',  icon:'ni ni-world-2 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.TourManager]  },
    { path: '/item-tour/:id1/:id2', title: '',  icon:'', class: 'd-none', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.TourManager]  },
    // { path: '/list-schedule', title: 'Schedule',  icon:'ni ni-calendar-grid-58 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.TourManager]  },

    { path: '/list-tourBooking', title: 'Tour Booking',  icon:'ni ni-collection text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.TourBookingManager]  },

    { path: '/list-hotel', title: 'Khách sạn',  icon:'fa-solid fa-hotel text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.ServiceManager]  },
    { path: '/list-restaurant', title: 'Nhà hàng',  icon:'fa-solid fa-utensils text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.ServiceManager]  },
    { path: '/list-place', title: 'Điểm tham quan',  icon:'ni ni-pin-3 text-purple', class: '', roles: [RoleTitle.Admin, RoleTitle.LocalManager, RoleTitle.ServiceManager]  },
    { path: '/list-voucher', title: 'Voucher',  icon:'ni ni-tag text-purple', class: '', roles: [RoleTitle.Admin]  },

    // { path: '/chat', title: 'Hỗ trợ',  icon:'ni fa-solid fa-headset', class: '', roles: [RoleTitle.Supporter]  },


  ]



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  auth: AuthenticationModel
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private activatedRoute: ActivatedRoute, private notificationService: NotificationService, private router: Router, private configService: ConfigService) { }

  ngOnInit() {
    this.auth = JSON.parse(localStorage.getItem("currentUser"))
    this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
  }

  returnHome(){
    var path = this.configService.getPath(this.auth.roleId)
    this.router.navigate(['',path.replace("/","")]);
  }

}
