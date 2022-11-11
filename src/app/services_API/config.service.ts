import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES } from '../components/sidebar/sidebar.component';
@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  public location: Location;
  constructor(@Inject(DOCUMENT) private document: Document, location: Location){
    this.location = location;
  }
  private hubConnectionBuilder: HubConnection
  public apiUrl = "https://localhost:44394";
  public clientUrl = this.document.location.origin
  signIR(){
     return this.hubConnectionBuilder = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information).withUrl(`${this.apiUrl}/travelhub`,
    {
        accessTokenFactory: () => localStorage.getItem("token")
    })
    .withAutomaticReconnect()
    .build();
   }
   goivui(): void{
    console.log("da keu");

    this.hubConnectionBuilder.invoke('GetInfo')
  }
  error(status: any, message: any){
    console.log('Status:  '  + status);
    console.log('Message: '  + message);

    if (status == 401){
        message = "Hết hạn đăng nhập !"
        document.location.assign(this.clientUrl +'/login');
    }
    else if (status == 200) {
        message = message;
    }
    else{
        message = "Không kết nối được đến server !"
    }

    return message
  }
  list10Star(){
    var listStar = [
      {id: 1, name: "01"},
      {id: 2, name: "02"},
      {id: 3, name: "03"},
      {id: 4, name: "04"},
      {id: 5, name: "05"},
      {id: 6, name: "06"},
      {id: 7, name: "07"},
      {id: 8, name: "08"},
      {id: 9, name: "09"},
      {id: 10, name: "10"}
    ]
    return listStar
  }

  list5Star(){
    var listStar = [
      {id: 1, name: "01"},
      {id: 2, name: "02"},
      {id: 3, name: "03"},
      {id: 4, name: "04"},
      {id: 5, name: "05"},
    ]
    return listStar
  }

  listStatusBooking(){
    var listStatusBooking = [
      {id: -2, name: "Đã huỷ và đang chờ hoàn tiền"},
      {id: -1, name: "Đã hoàn tiền"},
      {id: 1, name: "Đã đặt tour nhưng chưa thanh toán"},
      {id: 2, name: "Đã đặt tour và có đặt cọc"},
      {id: 3, name: "Đã thanh toán hết"},
      {id: 4, name: "Hủy tour"},
      {id: 5, name: "Tour đã hoàn thành"},
    ]
    return listStatusBooking
  }

  listApprove(){
    var listApprove = [
      {id: 0, name: "Đợi phê duyệt"},
      {id: 1, name: "Phê duyệt"},
      {id: 2, name: "Từ chối phê duyệt"},
      {id: 3, name: "Hủy phê duyệt"}
    ]

    return listApprove
  }

  listTypeAction(){
    var listTypeAction = [
      {id: "insert", name: "Thêm mới"},
      {id: "delete", name: "Xóa"},
      {id: "update", name: "Chỉnh sửa"},
      {id: "restore", name: "Khôi phục"}
    ]

    return listTypeAction
  }

  listGender(){
    var listGender = [
      {id: false, name: "Nam"},
      {id: true, name: "Nữ"}
    ]

    return listGender
  }

  listCalled(){
    var listCalled = [
      {id: false, name: "Chưa gọi"},
      {id: true, name: "Đã gọi"}
    ]

    return listCalled
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



   validateTour(data: any, model: any){
    model.total = 0
    var check = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var checkWhiteSpace = /\S\s/;
    //
    if (data.nameTour == null || data.nameTour == "") {
      model.nameTour = "[Tên tour]  không được để trống !"
      model.total += 1
    }else if (data.nameTour.length > 100) {
      model.nameTour = "[Tên tour]  quá dài !"
      model.total += 1
    }else if (data.nameTour.length < 5) {
      model.nameTour = "[Tên tour]  quá ngắn !"
      model.total += 1
    }else if (check.test(data.nameTour)) {
      model.nameTour = "[Tên tour] không được để ký tự đặt biệt !"
      model.total += 1
    }

    if(data.toPlace == null || data.toPlace == ""){
     model.toPlace = ("[Điểm đến] không được để trống !")
     model.total += 1
    }else if (data.toPlace.length > 50) {
      model.toPlace = "[Điểm đến]  quá dài !"
      model.total += 1
    }else if (data.toPlace.length < 3) {
      model.toPlace = "[Điểm đến]  quá ngắn !"
      model.total += 1
    }
    if (data.thumbnail == null || data.thumbnail == "") {
      model.thumbnail = ("[Hình] chưa chọn!")
      model.total += 1
    }

    if (data.rating == null || data.rating == "") {
      model.rating = ("[Sao] chưa chọn!")
      model.total += 1
    }
    return model

   }

   validateCostTour(data: any, model: any){
    model.total = 0
    var min = 0
    if (data.breakfast == null || data.breakfast == "") {
      model.breakfast = "[Chi phí ăn]  không được để trống !"
      model.total += 1
    }else if (data.breakfast <= 0) {
      model.breakfast = "[Chi phí ăn] không được nhỏ hơn 0!"
      model.total += 1
    }

    if(data.water == null || data.water == ""){
     model.water = ("[Chi phí nước] không được để trống !")
     model.total += 1
    }else if (data.water <= 0) {
      model.water = "[Chi phí nước] không được nhỏ hơn 0!"
      model.total += 1
    }

    if(data.feeGas == null || data.feeGas == ""){
      model.feeGas = ("[Chi phí xăng] không được để trống !")
      model.total += 1
     }else if (data.feeGas <= 0) {
       model.feeGas = "[Chi phí xăng] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.distance == null || data.distance == ""){
      model.distance = ("[Khoảng cách] không được để trống !")
      model.total += 1
     }else if (data.distance <= 0) {
       model.distance = "[Khoảng cách] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.sellCost == null || data.sellCost == ""){
      model.sellCost = ("[Chi phí bán tour] không được để trống !")
      model.total += 1
     }else if (data.sellCost <= 0) {
       model.sellCost = "[Chi phí bán tour] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.depreciation == null || data.depreciation == ""){
      model.depreciation = ("[Khấu hao] không được để trống !")
      model.total += 1
     }else if (data.depreciation <= 0) {
       model.depreciation = "[Khấu hao] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.otherPrice == null || data.otherPrice == ""){
      model.otherPrice = ("[Chi phí khác] không được để trống !")
      model.total += 1
     }else if (data.otherPrice <= 0) {
       model.otherPrice = "[Chi phí khác] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.tolls == null || data.tolls == ""){
      model.tolls = ("[Chi phí cầu đường] không được để trống !")
      model.total += 1
     }else if (data.tolls <= 0) {
       model.tolls = "[Chi phí cầu đường] không được nhỏ hơn 0!"
       model.total += 1
     }

     if(data.cusExpected == null || data.cusExpected == ""){
      model.cusExpected = ("[Khách dự kiến] không được để trống !")
      model.total += 1
     }else if (data.cusExpected <= 0) {
       model.cusExpected = "[Khách dự kiến] không được nhỏ hơn 0!"
       model.total += 1
     }
     if(data.insuranceFee == null || data.insuranceFee == ""){
      model.insuranceFee = ("[Chi phí bảo hiểm] không được để trống !")
      model.total += 1
     }else if (data.insuranceFee <= 0) {
       model.insuranceFee = "[Chi phí bảo hiểm] không được nhỏ hơn 0!"
       model.total += 1
     }

    if (data.isHoliday == null) {
      model.isHoliday = ("[Ngày lễ] chưa chọn!")
      model.total += 1
    }

    if (data.hotelId == null || data.hotelId == "") {
      model.hotelId = ("[Khách sạn] chưa chọn!")
      model.total += 1
    }

    if (data.restaurantId == null || data.restaurantId == "") {
      model.restaurantId = ("[Nhà hàng] chưa chọn!")
      model.total += 1
    }
    if (data.placeId == null || data.placeId == "") {
      model.placeId = ("[Địa điểm] chưa chọn!")
      model.total += 1
    }

    return model
   }

   validateSchedule(data: any, model: any){
    model.total = 0
    var min = 0
    var dateNow =  Date.now()
    var checkDate = new Date(dateNow).getTime()
    //
    if (data.employeeId == null || data.employeeId == "") {
      model.employeeId = "Chọn nhân viên !"
      model.total += 1
    }

    if(data.carId == null || data.carId == ""){
     model.carId = ("Chọn xe!")
     model.total += 1
    }

    if(data.promotionId == null || data.promotionId == ""){
      model.promotionId = ("Chọn khuyến mãi!")
      model.total += 1
     }

     if (data.departurePlace == null || data.departurePlace == "") {
      model.departurePlace = ("[Mô tả] không bỏ trống!")
      model.total += 1
    }else if (data.departurePlace.length > 100) {
      model.departurePlace = "[Mô tả]  quá dài !"
      model.total += 1
    }else if (data.departurePlace.length < 3) {
      model.departurePlace = "[Mô tả]  quá ngắn !"
      model.total += 1
    }

    if(data.departureDate == 0 || data.departureDate == ""){
      model.departureDate = ("Chọn ngày khởi hành!")
      model.total += 1
     }else if(data.departureDate <= data.endDate){
      model.departureDate = ("Ngày khởi hành không trước ngày kết thúc bán vé!")
      model.total += 1
     }else if(data.departureDate < checkDate){
      model.departureDate = ("Ngày khởi hành không trước ngày hiện tại!")
      model.total += 1
     }

     if(data.returnDate == 0 || data.returnDate == ""){
      model.returnDate = ("Chọn ngày trở về!")
      model.total += 1
     }else if(data.returnDate <= data.departureDate){
      model.returnDate = ("Ngày trở về không được trước ngày khởi hành!")
      model.total += 1
     }else if(data.returnDate <= data.endDate){
      model.returnDate = ("Ngày trở về không trước ngày kết thúc bán vé!")
      model.total += 1
     }else if(data.returnDate < checkDate){
      model.returnDate = ("Ngày trở về không trước ngày hiện tại!")
      model.total += 1
     }

    //  if(data.timePromotion == 0 || data.timePromotion == ""){
    //   model.timePromotion = ("Chọn ngày khuyến mãi")
    //   model.total += 1
    //  }else if(data.timePromotion < checkDate){
    //   model.timePromotion = ("Ngày khuyến mãi không trước ngày hiện tại!")
    //   model.total += 1
    //  }else if(data.timePromotion > data.endDate){
    //   model.timePromotion = ("Ngày khuyến mãi không sau ngày kết thúc bán vé!")
    //   model.total += 1
    //  }
    //  else if(data.timePromotion < data.beginDate){
    //   model.timePromotion = ("Ngày khuyến mãi không trước ngày bắt đầu bán vé!")
    //   model.total += 1
    //  }

     if(data.beginDate == 0 || data.beginDate == ""){
      model.beginDate = ("Chọn ngày bắt đầu!")
      model.total += 1
     }else if(data.beginDate < checkDate){
      model.beginDate = ("Ngày bắt đầu không trước ngày hiện tại!")
      model.total += 1
     }

     if(data.endDate == 0 || data.endDate == ""){
      model.endDate = ("Chọn ngày kết thúc!")
      model.total += 1
     }else if(data.endDate <= data.beginDate){
      model.endDate = ("Ngày kết thúc không trước ngày bắt đầu!")
      model.total += 1
     }else if(data.endDate < checkDate){
      model.endDate = ("Ngày kết thúc không trước ngày hiện tại!")
      model.total += 1
     }

     if(data.minCapacity == null || data.minCapacity == ""){
      model.minCapacity = ("Nhập tối thiểu số người!")
      model.total += 1
     }else if (data.minCapacity.length > 2) {
      model.minCapacity = "[Số người tối thiểu] quá dài!"
      model.total += 1
    } else if (data.minCapacity <= 0) {
      model.minCapacity = "[Số người tối thiểu] không được nhỏ hơn 0!"
      model.total += 1
    }

    if(data.maxCapacity == null || data.maxCapacity == ""){
      model.maxCapacity = ("Nhập tối đa số người!")
      model.total += 1
     }else if (data.maxCapacity.length > 2) {
      model.maxCapacity = "[Số người tối đa] quá dài!"
      model.total += 1
    }else if (data.maxCapacity < data.minCapacity) {
      model.maxCapacity = "[Số người tối đa] không nhỏ hơn tối thiểu!"
      model.total += 1
    }else if (data.maxCapacity <= 0) {
      model.maxCapacity = "[Số người tối đa] không được nhỏ hơn 0!"
      model.total += 1
    }

    if (data.description == null || data.description == "") {
      model.description = ("[Mô tả] không bỏ trống!")
      model.total += 1
    }else if (data.description.length > 200) {
      model.description = "[Mô tả]  quá dài !"
      model.total += 1
    }else if (data.description.length < 3) {
      model.description = "[Mô tả]  quá ngắn !"
      model.total += 1
    }

    if(data.vat == null || data.vat == ""){
      model.vat = ("Nhập VAT!")
      model.total += 1
     }else if (data.minCapacity <= 0) {
      model.minCapacity = "[Số người tối thiểu] không được nhỏ hơn 0!"
      model.total += 1
    }

    return model
   }

   validateTimeline(data: any, model: any){
    model.total = 0
    var dateNow =  Date.now()
    var checkDate = new Date(dateNow).getTime()

    if(data.fromTime == 0 || data.fromTime == ""){
      model.fromTime = ("Chọn thời gian bắt đầu!")
      model.total += 1
     }else if(data.fromTime <= checkDate){
      model.fromTime = ("Thời gian bắt đầu không trước ngày hiện tại!")
      model.total += 1
     }

     if(data.toTime == 0 || data.toTime == ""){
      model.toTime = ("Chọn thời gian kết thúc!")
      model.total += 1
     }else if(data.toTime <= checkDate){
      model.toTime = ("Thời gian kết thúc không trước ngày hiện tại!")
      model.total += 1
     }

     if (data.description == null || data.description == "") {
      model.description = ("[Mô tả] không bỏ trống!")
      model.total += 1
    }else if (data.description.length > 200) {
      model.description = "[Mô tả]  quá dài !"
      model.total += 1
    }else if (data.description.length < 3) {
      model.description = "[Mô tả]  quá ngắn !"
      model.total += 1
    }

     return model
   }

  validateRole(data: any, model: any){
    model.total = 0
    //name
    if(data.nameRole == null || data.nameRole == ""){
      model.nameRole = "[Tên chức vụ] không được để trống !"
      model.total += 1
    }
    else if (data.nameRole.length > 30) {
       model.nameRole = "[Tên chức vụ] quá dài !"
       model.total += 1
    }else if (data.nameRole.length < 3) {
      model.nameRole = "[Tên chức vụ] quá ngắn !"
      model.total += 1
    }

    return model
  }


  validateProvince(data: any, model: any){
    model.total = 0
    if (data.nameProvince == null || data.nameProvince == "") {
      model.nameProvince = "[Tên thành phố/tỉnh] không được để trống !"
      model.total += 1
    }else if (data.nameProvince.length > 30) {
      model.nameProvince = "[Tên thành phố/tỉnh] quá dài !"
      model.total += 1
    }else if (data.nameProvince.length < 3) {
      model.nameProvince = "[Tên thành phố/tỉnh] quá ngắn !"
      model.total += 1
    }

    return model
  }

  validateDistrict(data: any, model: any){
    model.total = 0
    if (data.nameDistrict == null || data.nameDistrict == "") {
      model.nameDistrict = "[Tên quận/huyện] không được để trống !"
      model.total += 1
    }else if (data.nameDistrict.length > 30) {
      model.nameDistrict = "[Tên quận/huyện] quá dài !"
      model.total += 1
    }else if (data.nameDistrict.length < 3) {
      model.nameDistrict = "[Tên quận/huyện] quá ngắn !"
      model.total += 1
    }

    if(data.provinceId == null || data.provinceId == ""){
      model.provinceId = "[Thành phố/tỉnh] không được để trống !"
      model.total += 1
    }
    return model
  }

  validateWard(data: any, model: any){
    model.total = 0
    if (data.nameWard == null || data.nameWard == "") {
      model.nameWard = "[Tên phường/xã] không được để trống !"
      model.total += 1
    }else if (data.nameWard.length > 30) {
      model.nameWard = "[Tên phường/xã] quá dài !"
      model.total += 1
    }else if (data.nameWard.length < 3) {
      model.nameWard = "[Tên phường/xã] quá ngắn !"
      model.total += 1
    }

    if(data.districtId == null || data.districtId == ""){
      model.districtId = "[Quận/huyện] không được để trống !"
      model.total += 1
    }
    return model
  }

// hotel
validateHotel(data : any,model: any)
{
 model.total= 0
     if(data.name == null || data.name == ""){
       model.name= "[Tên khách sạn] không được để trống !"
       model.total +=1
     }else if (data.name.length > 100) {
       model.name= "[Tên khách sạn] quá dài !"
       model.total +=1
     }else if (data.name.length < 1) {
       model.name= "[Tên khách sạn] quá ngắn !"
       model.total +=1
     }

   // phone
   if (data.phone == null || data.phone == "") {
     model.phone= "[Số điện thoại] không được để trống !"
     model.total +=1
   }else if (data.phone.length > 10) {
     model.phone= "[Số điện thoại] vượt quá 10 số !"
     model.total +=1
   }else if (!data.phone.startsWith("0")) {
     model.phone= "[Số điện thoại] không hợp lệ !"
     model.total +=1
   }
    //Address
  if (data.address == null || data.address == "") {
   model.address= "[Địa chỉ] không được để trống !"
   model.total +=1
  }else if (data.address.length > 255) {
   model.address= "[Địa chỉ] quá dài !"
   model.total +=1
  }
  if (data.star == null || data.star == "") {
    model.star= "[Số sao] không được để trống !"
    model.total +=1
  }
 // quantity
 if(data.quantitySR == null || data.quantitySR == ""){
   model.quantitySR= "[Số lượng] phòng đơn không được để trống !"
   model.total +=1
   }

 if(data.singleRoomPrice == null || data.singleRoomPrice == ""){
   model.singleRoomPrice= "[Giá vé] phòng đơn không được để trống !"
   model.total +=1
  }
// double room
   if(data.quantityDBR == null || data.quantityDBR == ""){
     model.quantityDBR= "[Số lượng] phòng đôi không được để trống !"
     model.total +=1
     }

       if(data.doubleRoomPrice == null || data.doubleRoomPrice == ""){
     model.doubleRoomPrice= "[Giá vé] phòng đôi không được để trống !"
     model.total +=1
     }
     return model

}

   validateCar(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (data.liscensePlate == null || data.liscensePlate == "") {
      model.liscensePlate = "[Biển số xe] không được để trống !"
      model.total += 1
    }else if (data.liscensePlate.length > 9) {
      model.liscensePlate = "[Biển số xe] không được lớn hơn 9"
      model.total += 1
    }
    if(data.amountSeat == null || data.amountSeat == ""){
      model.amountSeat = "[Số chỗ] không được để trống !"
      model.total += 1
    }else if(data.amountSeat < 4){
      model.amountSeat = "[Số chỗ] không được nhỏ hơn 4"
      model.total += 1
    }
    return model
  }

  validateRestaurant(data : any,model: any)
  {
   model.total= 0
       if(data.name == null || data.name == ""){
         model.name= "[Tên nhà hàng] không được để trống !"
         model.total +=1
       }else if (data.name.length > 100) {
         model.name= "[Tên nhà hàng] quá dài !"
         model.total +=1
       }else if (data.name.length < 1) {
         model.name= "[Tên nhà hàng] quá ngắn !"
         model.total +=1
       }

     // phone
     if (data.phone == null || data.phone == "") {
       model.phone= "[Số điện thoại] không được để trống !"
       model.total +=1
     }else if (data.phone.length > 10) {
       model.phone= "[Số điện thoại] vượt quá 10 số !"
       model.total +=1
     }else if (!data.phone.startsWith("0")) {
       model.phone= "[Số điện thoại] không hợp lệ !"
       model.total +=1
     }
      //Address
    if (data.address == null || data.address == "") {
     model.address= "[Địa chỉ] không được để trống !"
     model.total +=1
    }else if (data.address.length > 255) {
     model.address= "[Địa chỉ] quá dài !"
     model.total +=1
   }
   // price
   if(data.comboPrice == null || data.comboPrice == ""){
     model.comboPrice= "[Giá] không được để trống !"
     model.total +=1
     }else if(data.comboPrice < 0 || data.comboPrice > 99999999){
      model.comboPrice= "[Giá] phải lớn hơn 0 và nhỏ hơn 10000000 !"
      model.total +=1
     }
     return model
  }

   // place
   validatePlace(data : any,model: any)
   {
    model.total = 0
        if(data.name == null || data.name == ""){
         model.name =("[Tên địa điểm] không được để trống !")
         model.total += 1
      }else if (data.name.length > 100) {
        model.name =("[Tên địa điểm] quá dài !")
        model.total += 1
      }else if (data.name.length < 1) {
        model.name =("[Tên địa điểm] quá ngắn !")
        model.total += 1
      } // phone
      if (data.phone == null || data.phone == "") {
        model.phone= "[Số điện thoại] không được để trống !"
        model.total +=1
      }else if (data.phone.length > 10) {
        model.phone= "[Số điện thoại] vượt quá 10 số !"
        model.total +=1
      }else if (!data.phone.startsWith("0")) {
        model.phone= "[Số điện thoại] không hợp lệ !"
        model.total +=1
      }
      //Address
    if (data.address == null || data.address == "") {
      model.address= "[Địa chỉ] không được để trống !"
      model.total +=1
    }else if (data.address.length > 255) {
      model.address= "[Địa chỉ] quá dài !"
      model.total +=1
    }
    // price
    if(data.priceTicket == null || data.priceTicket == ""){
      model.priceTicket= "[Giá] không được để trống !"
      model.total +=1
      }else if(data.priceTicket < 0 || data.priceTicket > 99999999){
      model.priceTicket= "[Giá] phải lớn hơn 0 và nhỏ hơn 10000000 !"
      model.total +=1
      }
        return model
    }

   validateLogin(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (data.email == null || data.email == "") {
      model.email = "[Email] không được để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không được để trống !"
      model.total += 1
    }

    return model
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
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[0];
    if (Number.parseInt(month) < 10) {
      month = "0"+month
    }

    var year =  split[0];
    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate
   }


   checkRole(){
    var check = 0
    var auth = JSON.parse(localStorage.getItem("currentUser"))
    var titlee = this.location.prepareExternalUrl(this.location.path());
    var menuItem = ROUTES.filter(menuItem => menuItem);
    menuItem.forEach(item => {
      item.roles.forEach(role => {
        if (role == auth.roleId && item.path == titlee) {
          check++
        }
      });
    });
    if (check == 0) {
      location.assign(this.clientUrl + "/login")
    }
   }
}
