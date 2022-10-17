import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  constructor(@Inject(DOCUMENT) private document: Document){}
  private hubConnectionBuilder: HubConnection
  public apiUrl = "https://localhost:44394";
  public clientUrl = this.document.location.origin

  signIR(func: any){
    console.log(func);

   return this.hubConnectionBuilder = new HubConnectionBuilder().withUrl(`${this.apiUrl}/travelhub`).configureLogging(LogLevel.Information).build();
  }
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

  listGender(){
    var listGender = [
      {id: false, name: "Nam"},
      {id: true, name: "Nữ"}
    ]

    return listGender
  }

  listStatus(){
    var listStatus = [
      {id: false, name: "Chưa kích hoạt"},
      {id: true, name: "Đã kích hoạt"}
    ]

    return listStatus
  }


  validateEmployee(data: any){
    var err = []
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //name
    if(data.nameEmployee == null || data.nameEmployee == ""){
       err.push("[Họ và tên] không được để trống !")
    }else if (data.nameEmployee.length > 100) {
       err.push("[Họ và tên] quá dài !")
    }else if (data.nameEmployee.length < 1) {
      err.push("[Họ và tên] quá ngắn !")
    }


    //gender
    if (data.gender === null) {
       err.push("[Giới tính] không được để trống !")
    }

    // if (data.gender != "Nam" && data.gender != "Nữ" && data.gender != "Khác") {
    //    err.push("[Giới tính] không hợp lệ !")
    // }

    //role
    if (data.roleId == null || data.roleId == "") {
       err.push("[Quyền] không được để trống !")
    }

     //email
    if (data.email == null || data.email == "") {
       err.push("[Email] không được để trống !")
    }else if (!filter.test(data.email)) {
       err.push("[Email] không hợp lệ !")
    }

    //Phone
    if (data.phone == null || data.phone == "") {
       err.push("[Số điện thoại] không được để trống !")
    }else if (data.phone.length > 10) {
       err.push("[Số điện thoại] vượt quá 10 số !")
    }else if (!data.phone.startsWith("0")) {
       err.push("[Số điện thoại] không hợp lệ !")
    }

    // if (Number.parseInt(data.phone) == NaN) {
    //    err.push("[Số điện thoại] không hợp lệ !")
    // }
    let timeDiff = Math.abs(Date.now() - Date.parse(data.birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    console.log(age)
    //BirthDay
    if (data.birthday == null || data.birthday == "") {
       err.push("[Ngày sinh] không được để trống !")
    }else if(age < 18){
      err.push("[Ngày sinh] phải trên 18 tuổi !")
    }else if(age > 60){
      err.push("[Ngày sinh] phải dưới 60 tuổi !")
    }


    //Address
    if (data.address == null || data.address == "") {
       err.push("[Địa chỉ] không được để trống !")
    }else if (data.address.length > 255) {
      err.push("[Địa chỉ] quá dài !")
   }

    //Img
    // if (data.image == null || data.image == "") {
    //    err.push("[Hình ảnh] không được để trống !")
    // }

    return err

   }

   validateProvince(data: any){
    var err = []
    //name
    if(data.nameProvince == null || data.nameProvince == ""){
       err.push("[Tên thành phố/tỉnh] không được để trống !")
    }
    else if (data.nameProvince.length > 30) {
       err.push("[Tên thành phố/tỉnh] quá dài !")
    }else if (data.nameProvince.length < 3) {
      err.push("[Tên thành phố/tỉnh] quá ngắn !")
    }


    return err

   }

   validateRole(data: any){
    var err = []
    //name
    if(data.nameRole == null || data.nameRole == ""){
       err.push("[Tên chức vụ] không được để trống !")
    }
    else if (data.nameRole.length > 30) {
       err.push("[Tên chức vụ] quá dài !")
    }else if (data.nameRole.length < 3) {
      err.push("[Tên chức vụ] quá ngắn !")
    }

    return err

   }

   validateDistrict(data: any){
    var err = []
    //name
    if(data.nameDistrict == null || data.nameDistrict == ""){
       err.push("[Tên quận/huyện] không được để trống !")
    }
    else if (data.nameDistrict.length > 30) {
       err.push("[Tên quận/huyện] quá dài !")
    }else if (data.nameDistrict.length < 3) {
      err.push("[Tên quận/huyện] quá ngắn !")
    }
    console.log(data);

    //province
    if (data.provinceId == null || data.provinceId == "") {
      err.push("[Thành phố/tỉnh] không được để trống !")
    }
    return err

   }

   validateWard(data: any){
    var err = []
    //name
    if(data.nameWard == null || data.nameWard == ""){
       err.push("[Tên phường/xã] không được để trống !")
    }
    else if (data.nameWard.length > 30) {
       err.push("[Tên phường/xã] quá dài !")
    }else if (data.nameWard.length < 3) {
      err.push("[Tên phường/xã] quá ngắn !")
    }

    //province
    if (data.districtId == null || data.districtId == "") {
      err.push("[Quận/huyện] không được để trống !")
    }
    return err

   }

   formatFromUnixTimestampToFullDate(unix_timestamp: number){
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    var split = date.split("/")
    var day = split[1];
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[0];
    if (Number.parseInt(month) < 10) {
      month = "0"+month
    }
    var year =  split[2];
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate
   }

   formatFromUnixTimestampToFullDateView(unix_timestamp: number){
    var date = new Date(unix_timestamp).toLocaleDateString("en-US");
    var split = date.split("/")
    var day = split[1];
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[0];
    if (Number.parseInt(month) < 10) {
      month = "0"+month
    }
    var year =  split[2];
    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate
   }
}
