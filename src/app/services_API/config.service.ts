import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  constructor(@Inject(DOCUMENT) private document: Document){}

  public apiUrl = "https://localhost:44394";
  public clientUrl = this.document.location.origin

  error(status: any, message: any){
    console.log('Status:  '  + status);
    console.log('Message: '  + message);

    if (status == 401){
        message = "Hết hạn đăng nhập !"
        document.location.assign(this.clientUrl +'/#/login');
    }
    else if (status == 200) {
        message = message;
    }
    else{
        message = "Không kết nối được đến server !"
    }

    return message
  }

  listStatus(){
    var listStatus = [
      {id: false, name: "Chưa kích hoạt"},
      {id: true, name: "Đã kích hoạt"}
    ]

    return listStatus
  }

  validateUser(data: any){
    var err = []
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //name
    if(data.nameEmployee == null || data.nameEmployee == ""){
       err.push("[Họ và tên] không được để trống !")
    }

    if (data.nameEmployee.length > 100) {
       err.push("[Họ và tên] quá dài !")
    }


    //gender
    if (data.gender == null || data.gender == "") {
       err.push("[Giới tính] không được để trống !")
    }

    // if (data.gender != "Nam" && data.gender != "Nữ" && data.gender != "Khác") {
    //    err.push("[Giới tính] không hợp lệ !")
    // }

    //role
    if (data.idRole == null || data.idRole == "") {
       err.push("[Quyền] không được để trống !")
    }

     //email
    if (data.email == null || data.email == "") {
       err.push("[Email] không được để trống !")
    }

    if (!filter.test(data.email)) {
       err.push("[Email] không hợp lệ !")
    }

    //Phone
    if (data.phone == null || data.phone == "") {
       err.push("[Số điện thoại] không được để trống !")
    }

    if (data.phone.length > 10) {
       err.push("[Số điện thoại] vượt quá 10 số !")
    }

    if (!data.phone.startsWith("0")) {
       err.push("[Số điện thoại] không hợp lệ !")
    }

    // if (Number.parseInt(data.phone) == NaN) {
    //    err.push("[Số điện thoại] không hợp lệ !")
    // }

    //BirthDay
    if (data.birthday == null || data.birthday == "") {
       err.push("[Ngày sinh] không được để trống !")
    }


    //Address
    if (data.address == null || data.address == "") {
       err.push("[Địa chỉ] không được để trống !")
    }

    if (data.address.length > 255) {
      err.push("[Địa chỉ] quá dài !")
   }

    //Img
    // if (data.image == null || data.image == "") {
    //    err.push("[Hình ảnh] không được để trống !")
    // }

    return err

   }
}
