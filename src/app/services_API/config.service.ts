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

  signIR(){
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


  validateEmployee(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //name
    if(data.nameEmployee == null || data.nameEmployee == ""){
      model.nameEmployee = "[Họ và tên] không được để trống !"
      model.total += 1
    }else if (data.nameEmployee.length > 100) {
      model.nameEmployee = "[Họ và tên] quá dài !"
      model.total += 1
    }else if (data.nameEmployee.length < 1) {
      model.nameEmployee = "[Họ và tên] quá ngắn !"
      model.total += 1
    }


    //gender
    if (data.gender === null) {
      model.gender = "[Giới tính] không được để trống !"
      model.total += 1
    }

    // if (data.gender != "Nam" && data.gender != "Nữ" && data.gender != "Khác") {
    //    err.push("[Giới tính] không hợp lệ !")
    // }

    //role
    if (data.roleId == null || data.roleId == "") {
      model.roleId = "[Quyền] không được để trống !"
      model.total += 1
    }

     //email
    if (data.email == null || data.email == "") {
      model.email = "[Email] không được để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    //Phone
    if (data.phone == null || data.phone == "") {
      model.phone = "[Số điện thoại] không được để trống !"
      model.total += 1
    }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 10 số !"
      model.total += 1
    }else if (!data.phone.startsWith("0")) {
      model.phone = "[Số điện thoại] không hợp lệ !"
      model.total += 1
    }

    // if (Number.parseInt(data.phone) == NaN) {
    //    err.push("[Số điện thoại] không hợp lệ !")
    // }
    let timeDiff = Math.abs(Date.now() - Date.parse(data.birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    //BirthDay
    if (data.birthday == null || data.birthday == "") {
      model.birthday = "[Ngày sinh] không được để trống !"
      model.total += 1
    }else if(age < 18){
      model.birthday = "[Ngày sinh] phải trên 18 tuổi !"
      model.total += 1
    }else if(age > 60){
      model.birthday = "[Ngày sinh] phải dưới 60 tuổi !"
      model.total += 1
    }


    //Address
    if (data.address == null || data.address == "") {
      model.address = "[Địa chỉ] không được để trống !"
      model.total += 1
    }else if (data.address.length > 255) {
      model.address = "[Địa chỉ] quá dài !"
      model.total += 1
    }

    //Img
    // if (data.image == null || data.image == "") {
    //    err.push("[Hình ảnh] không được để trống !")
    // }

    return model

   }

   validateCost(data: any){
    var err = []
    if(data.hotelId == null || data.hotelId == ""){
      err.push("[Khách sạn] không được để trống !")
   }

   if(data.restaurantId == null || data.restaurantId == ""){
    err.push("[Nhà hàng] không được để trống !")
    }

    if(data.placeId == null || data.placeId == ""){
    err.push("[Địa Điểm] không được để trống !")
    }

    if(data.isHoliday == null || data.isHoliday == ""){
      err.push("[Ngày lễ] không được để trống !")
      }

      return err
   }

   validateTour(data: any){
    var err = []
    //name
    if(data.nameTour == null || data.nameTour == ""){
       err.push("[Tên tour] không được để trống !")
    }
    else if (data.nameTour.length > 150) {
       err.push("[Tên tour] quá dài !")
    }else if (data.nameTour.length < 5) {
      err.push("[Tên tour] quá ngắn !")
    }

    if(data.thumbsnail == null || data.thumbsnail == ""){
      err.push("[Hình tour] không được để trống !")
   }

   if(data.fromPlace == null || data.fromPlace == ""){
    err.push("[Điểm đi] không được để trống !")
    }

    if(data.toPlace == null || data.toPlace == ""){
    err.push("[Điểm đến] không được để trống !")
    }

          if(data.rating == null){
            err.push("[VAT] không được để trống !")
            }

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
// hotel
   validateHotel(data : any)
   {
    // name hotel
        var err = []
        if(data.name == null || data.name == ""){
          err.push("[tên khách sạn] không được để trống !")
      }else if (data.name.length > 100) {
          err.push("[tên khách sạn] quá dài !")
      }else if (data.name.length < 1) {
        err.push("[tên khách sạn] quá ngắn !")
      }
      // phone
      if (data.phone == null || data.phone == "") {
        err.push("[Số điện thoại] không được để trống !")
     }else if (data.phone.length > 10) {
        err.push("[Số điện thoại] vượt quá 10 số !")
     }else if (!data.phone.startsWith("0")) {
        err.push("[Số điện thoại] không hợp lệ !")
     }
       //Address
     if (data.address == null || data.address == "") {
        err.push("[Địa chỉ] không được để trống !")
     }else if (data.address.length > 255) {
       err.push("[Địa chỉ] quá dài !")
    }
    // quantity
    if(data.quantitySR == null || data.quantitySR == ""){
      err.push("[Số lượng] phòng đơn không được để trống !")
      }

    if(data.singleRoomPrice == null || data.singleRoomPrice == ""){
      err.push("[Giá vé] phòng đơn không được để trống !")
      }
// double room
      if(data.quantityDBR == null || data.quantityDBR == ""){
        err.push("[Số lượng] phòng đôi không được để trống !")
        }

      if(data.doubleRoomPrice == null || data.doubleRoomPrice == ""){
        err.push("[Giá vé] phòng đôi không được để trống !")
        }
        return err
   }
   // place
   validatePlace(data : any)
   {
        var err = []
        if(data.name == null || data.name == ""){
          err.push("[Tên địa điểm] không được để trống !")
      }else if (data.name.length > 100) {
          err.push("[Tên địa điểm] quá dài !")
      }else if (data.name.length < 1) {
        err.push("[Tên địa điểm] quá ngắn !")
      } // phone
      if (data.phone == null || data.phone == "") {
        err.push("[Số điện thoại] không được để trống !")
     }else if (data.phone.length > 10) {
        err.push("[Số điện thoại] vượt quá 10 số !")
     }else if (!data.phone.startsWith("0")) {
        err.push("[Số điện thoại] không hợp lệ !")
     }
       //Address
     if (data.address == null || data.address == "") {
        err.push("[Địa chỉ] không được để trống !")
     }else if (data.address.length > 255) {
       err.push("[Địa chỉ] quá dài !")

    }
    //priceTicket
    if(data.priceTicket == null || data.priceTicket == ""){
      err.push("[Giá vé] không được để trống !")
      }
      if(data.modifyBy == null || data.modifyBy == ""){
        err.push("[Tên người sửa] không được để trống !")
    }else if (data.modifyBy.length > 100) {
        err.push("[Tên người sửa] quá dài !")
    }else if (data.modifyBy.length < 1) {
      err.push("[Tên người sửa]  quá ngắn !")
    }
    if (data.modifyDate == null || data.modifyDate == "") {
      err.push("[Ngày] không được để trống !")
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

   formatDateToDateView(date: string){
    var split = date.split("-")
    var day = split[2];
    var month = split[1];
    var year =  split[0];
    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate
   }
}
