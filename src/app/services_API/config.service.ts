import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES } from '../components/sidebar/sidebar.component';
import { RoleTitle } from "../enums/enum";
@Injectable({
  providedIn: 'root'
})
export class ConfigService{
  public location: Location;
  constructor(@Inject(DOCUMENT) private document: Document, location: Location){
    this.location = location;
  }
  private hubConnectionBuilder: HubConnection
  public apiUrl = "https://travelapiweb.azurewebsites.net";
  public apiTourBookingUrl = "https://roverbookingservice.azurewebsites.net";
  public clientUrl = this.document.location.origin
  signalR(){
     return this.hubConnectionBuilder = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information).withUrl(`${this.apiUrl}/travelhub`,
    {
        accessTokenFactory: () => localStorage.getItem("token")
    })
    .withAutomaticReconnect()
    .build();
   }

  callChatSignalR(id:string): void{
    this.hubConnectionBuilder.invoke('Chat',id)
  }

  callNotyfSignalR(roleId:string): void{
    this.hubConnectionBuilder.invoke('SendNotyf',roleId)
  }

  callBlockSignalR(id:string): void{
    this.hubConnectionBuilder.invoke('Block',id)
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

  getPath(roleId){
    var path = ""
   if (roleId != RoleTitle.Supporter && roleId != RoleTitle.TourBookingManager) {
    var menuItem = ROUTES.filter(menuItem => menuItem);
    menuItem.forEach(item => {
      item.roles.forEach(role => {
        if (role == roleId && !path) {
          path = item.path
        }
      });
    });
   }
   else{
    if (roleId == RoleTitle.Supporter) {
      path = "/chat"
    }
    else{
      path = "/list-tourBooking"
    }
   }
    return path
  }

  list10Star(){
    var listStar = []
    for (let index = 0; index <= 10; index++) {
      var name = index.toString()
      if (index < 10) {
        name = "0"+name
      }
      listStar.push(
        {id: index, name: name},
      )
    }
    return listStar
  }

  listMonth(){
    var listMonth = []
    for (let index = 1; index <= 12; index++) {
      var name = index.toString()
      if (index < 10) {
        name = "0"+name
      }
      listMonth.push(
        {id: index, name: name},
      )
    }
    return listMonth
  }

  listYear(){
    var listYear = []
    for (let index = 2019; index <= new Date().getFullYear(); index++) {
      listYear.push(
        {id: index, name: index.toString()},
      )
    }
    return listYear
  }

  list5Star(){
    var listStar = []
    for (let index = 0; index <= 5; index++) {
      var name = index.toString()
      if (index < 10) {
        name = "0"+name
      }
      listStar.push(
        {id: index, name: name},
      )
    }
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

  listPayment(){
    var listPayment = [
      {id: 1, name: "Tiền mặt"},
      {id: 2, name: "Chuyển khoản"},
      {id: 3, name: "Paypal"} ,
      {id: 4, name: "Vnpay"}
    ]

    return listPayment
  }

  listCalled(){
    var listCalled = [
      {id: false, name: "Chưa gọi"},
      {id: true, name: "Đã gọi"}
    ]

    return listCalled
  }

  listStatusCar(){
    var listStatusCar = [
      {id: 0, name: "Xe đang trống"},
      {id: 1, name: "Xe đã có tour"},
      {id: 2, name: "Xe đang đầy"}
    ]

    return listStatusCar
  }

  listStatus(){
    var listStatus = [
      {id: false, name: "Chưa kích hoạt"},

      {id: true, name: "Đã kích hoạt"}
    ]

    return listStatus
  }
  listClassContent()
  {
  var listClassContent = [
    {id: "Tour", name: "Tour"},
    {id: "TourBooking", name: "TourBooking"},
    {id:  "Hotel", name: "Hotel"},
    {id: "Place", name: "Place"},
    {id: "Restaurant", name: "Restaurant"}
  ]
    return listClassContent

  }
  validateChangePass(data: any, model: any){
    model.total = 0

    if(data.password == null  || data.password == ""){
      model.password = ("[Mật khẩu cũ] không để trống !")
      model.total += 1
    }

    if(data.newPassword == null  || data.newPassword == ""){
      model.newPassword = ("[Mật khẩu mới] không để trống !")
      model.total += 1
    }else if(data.password === data.newPassword){
      model.newPassword = ("[Mật khẩu mới] không trùng mật khẩu cũ !")
      model.total += 1
    }

    if(data.confirmPassword == null  || data.confirmPassword == ""){
      model.confirmPassword = ("[Nhập lại mật khẩu] không để trống !")
      model.total += 1
    }else if(data.newPassword != data.confirmPassword){
      model.confirmPassword = ("[Nhập lại mật khẩu không khớp] nhập lại mật khẩu !")
      model.total += 1
    }
    return model
   }
  validateEmployee(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //name
    if(data.nameEmployee == null || data.nameEmployee == ""){
      model.nameEmployee = "[Họ và tên] không để trống !"
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
      model.gender = "[Giới tính] không để trống !"
      model.total += 1
    }

    // if (data.gender != "Nam" && data.gender != "Nữ" && data.gender != "Khác") {
    //    err.push("[Giới tính] không hợp lệ !")
    // }

    //role
    if (data.roleId == null || data.roleId == "") {
      model.roleId = "[Quyền] không để trống !"
      model.total += 1
    }

     //email
    if (data.email == null || data.email == "") {
      model.email = "[Email] không để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    //Phone
    if (data.phone == null || data.phone == "") {
      model.phone = "[Số điện thoại] không để trống !"
      model.total += 1
    }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 15 số !"
      model.total += 1
    }
    else if (data.phone.length < 10) {
      model.phone = "[Số điện thoại] không hợp lệ !"
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
      model.birthday = "[Ngày sinh] không để trống !"
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
      model.address = "[Địa chỉ] không để trống !"
      model.total += 1
    }else if (data.address.length > 255) {
      model.address = "[Địa chỉ] quá dài !"
      model.total += 1
    }

    //Img
    // if (data.image == null || data.image == "") {
    //    err.push("[Hình ảnh] không để trống !")
    // }

    return model

   }



   validateTour(data: any, model: any){
    model.total = 0
    var check = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var checkWhiteSpace = /\S\s/;
    //
    if (data.nameTour == null || data.nameTour == "") {
      model.nameTour = "[Tên tour]  không để trống !"
      model.total += 1
    }else if (data.nameTour.length > 100) {
      model.nameTour = "[Tên tour]  quá dài !"
      model.total += 1
    }else if (data.nameTour.length < 5) {
      model.nameTour = "[Tên tour]  quá ngắn !"
      model.total += 1
    }else if (check.test(data.nameTour)) {
      model.nameTour = "[Tên tour] không để ký tự đặt biệt !"
      model.total += 1
    }

    if(data.toPlace == null || data.toPlace == ""){
     model.toPlace = ("[Điểm đến] không để trống !")
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

    return model

   }

   transform(val: any) {
    let transformedVal;
    if (val === undefined || val === null) {
      transformedVal = ""
    } else {
      transformedVal = val.toString().replace(/,/g, "");
    }
    return transformedVal;
  }

   validateCostTour(data: any, model: any){
    model.total = 0
    var min = 0


    if (data.breakfast == null || data.breakfast == "") {
      model.breakfast = "[Chi phí ăn]  không để trống !"
      model.total += 1
    }else if (data.breakfast <= 0) {
      model.breakfast = "[Chi phí ăn] không nhỏ hơn 0!"
      model.total += 1
    }else if( this.transform(data.breakfast) >  500000){
      model.breakfast = "[Chi phí ăn] không lớn hơn 500.000đ!"
      model.total += 1
    }

    if(data.water == null || data.water == ""){
     model.water = ("[Chi phí nước] không để trống !")
     model.total += 1
    }else if (data.water <= 0) {
      model.water = "[Chi phí nước] không nhỏ hơn 0!"
      model.total += 1
    }else if(this.transform(data.water) > 150000){
      model.water = "[Chi phí nước] không lớn hơn 150.000đ!"
      model.total += 1
    }

    if(data.feeGas == null || data.feeGas == ""){
      model.feeGas = ("[Chi phí xăng] không để trống !")
      model.total += 1
     }else if (data.feeGas <= 0) {
       model.feeGas = "[Chi phí xăng] không nhỏ hơn 0!"
       model.total += 1
     }
     else if (this.transform(data.feeGas) > 50000) {
      model.feeGas = "[Chi phí xăng] không lớn hơn 50.000đ!"
      model.total += 1
    }

     if(data.distance == null || data.distance == ""){
      model.distance = ("[Khoảng cách] không để trống !")
      model.total += 1
     }else if (data.distance <= 0) {
       model.distance = "[Khoảng cách] không nhỏ hơn 0!"
       model.total += 1
     }else if (data.distance > 2000) {
      model.distance = "[Khoảng cách] không lớn hơn 2000km!"
      model.total += 1
    }

     if(data.sellCost == null || data.sellCost == ""){
      model.sellCost = ("[Chi phí bán tour] không để trống !")
      model.total += 1
     }else if (data.sellCost <= 0) {
       model.sellCost = "[Chi phí bán tour] không nhỏ hơn 0!"
       model.total += 1
     }
     else if (this.transform(data.sellCost) > 1000000) {
      model.sellCost = "[Chi phí bán tour] không lớn hơn 1.000.000đ!"
      model.total += 1
    }

     if(data.depreciation == null || data.depreciation == ""){
      model.depreciation = ("[Khấu hao] không để trống !")
      model.total += 1
     }else if (data.depreciation <= 0) {
       model.depreciation = "[Khấu hao] không nhỏ hơn 0!"
       model.total += 1
     }else if (this.transform(data.depreciation) > 1000000) {
      model.depreciation = "[Khấu hao] lớn hơn 1.000.000đ!"
      model.total += 1
    }

     if(data.otherPrice == null || data.otherPrice == ""){
      model.otherPrice = ("[Chi phí khác] không để trống !")
      model.total += 1
     }else if(this.transform(data.otherPrice) > 2000000){
      model.otherPrice = ("[Chi phí khác] kkhông lớn hơn 2.000.000đ")
      model.total += 1
     }

     if(data.tolls == null || data.tolls == ""){
      model.tolls = ("[Chi phí cầu đường] không để trống !")
      model.total += 1
     }else if (data.tolls <= 0) {
       model.tolls = "[Chi phí cầu đường] không nhỏ hơn 0!"
       model.total += 1
     }else if (this.transform(data.tolls) > 500000) {
      model.tolls = "[Chi phí cầu đường] không lớn hơn 500.000!"
      model.total += 1
    }



     if(data.insuranceFee == null || data.insuranceFee == ""){
      model.insuranceFee = ("[Chi phí bảo hiểm] không để trống !")
      model.total += 1
     }else if (data.insuranceFee <= 0) {
       model.insuranceFee = "[Chi phí bảo hiểm] không nhỏ hơn 0!"
       model.total += 1
     }
     else if (this.transform(data.insuranceFee) > 500000) {
      model.insuranceFee = "[Chi phí bảo hiểm] không lớn hơn 500.000!"
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

   validateSchedule(data: any, model: any, timelineList: any){
    model.total = 0
    var dateNow =  Date.now()
    var checkDate = new Date(dateNow).getTime()
    //
    if (data.employeeId == null || data.employeeId == "") {
      model.employeeId = "[Hướng dẫn viên] không bỏ trống!"
      model.total += 1
    }

    if(data.carId == null || data.carId == ""){
     model.carId = ("[Xe] không bỏ trống !")
     model.total += 1
    }


    if (data.departurePlace == null || data.departurePlace == "") {
      model.departurePlace = ("[Nơi khởi hành] không bỏ trống!")
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
     if (!data.isUpdate) {
      if(data.beginDate == 0 || data.beginDate == ""){
        model.beginDate = ("[Ngày bắt đầu] không bỏ trống !")
        model.total += 1
       }else if(data.beginDate < checkDate){
        model.beginDate = ("[Ngày bắt đầu] không trước ngày hiện tại !")
        model.total += 1
       }else if(data.beginDate >= data.endDate){
        model.beginDate = ("[Ngày bắt đầu ]không sau ngày kết thúc !")
        model.total += 1
       }


       if(data.endDate == 0 || data.endDate == ""){
        model.endDate = ("[Ngày kết thúc] không bỏ trống !")
        model.total += 1
       }else if(data.endDate <= data.beginDate){
        model.endDate = ("[Ngày kết thúc] không trước ngày bắt đầu!")
        model.total += 1
       }else if(data.endDate < checkDate){
        model.endDate = ("[Ngày kết thúc] không trước ngày hiện tại!")
        model.total += 1
       }



       if (data.isUpdateDR && !data.isRemoveTimeLine) {
        if(timelineList.length > 0){
          model.returnDate = ("[Danh sách Timeline] đã tồn tại !")
          model.departureDate = ("[Danh sách Timeline] đã tồn tại !")
          model.total += 1
        }
       }else{
        if(data.departureDate == 0 || data.departureDate == ""){
          model.departureDate = ("[Ngày khởi hành] không bỏ trống !")
          model.total += 1
         }else if(data.departureDate < checkDate){
          model.departureDate = ("[Ngày khởi hành] không trước ngày hiện tại !")
          model.total += 1
         }else if(data.departureDate < data.endDate){
          model.departureDate = ("[Ngày khởi hành] không trước ngày kết thúc bán tour !")
          model.total += 1
         }else if(data.departureDate >= data.returnDate){
          model.departureDate = ("[Ngày khởi hành] không sau ngày quay về !")
          model.total += 1
         }

         if(data.returnDate == 0 || data.returnDate == ""){
          model.returnDate = ("[Ngày quay về] không bỏ trống !")
          model.total += 1
         }else if(data.returnDate < checkDate){
          model.returnDate = ("[Ngày quay về] không trước ngày hiện tại !")
          model.total += 1
         }else if(data.returnDate < data.endDate){
          model.returnDate = ("[Ngày quay về] không trước ngày kết thúc bán tour !")
          model.total += 1
         }else if(data.returnDate <= data.departureDate){
          model.returnDate = ("[Ngày quay về] không trước ngày khởi hành !")
          model.total += 1
         }
       }
     }

     if(data.profit == null || data.profit == ""){
      model.profit = ("[Lợi nhuận] không để trống !")
      model.total += 1
     }else if (data.profit < 0) {
       model.profit = "[Lợi nhuận] không nhỏ hơn 0%!"
       model.total += 1
     }else if (data.profit > 500) {
      model.profit = "[Lợi nhuận] không quá 500%!"
      model.total += 1
    }

     if(data.minCapacity == null || data.minCapacity == ""){
      model.minCapacity = ("[Số người tối thiểu] không bỏ trống !")
      model.total += 1
     }else if (data.minCapacity <= 0) {
      model.minCapacity = "[Số người tối thiểu] không nhỏ hơn 0!"
      model.total += 1
    }else if (data.minCapacity >  100) {
      model.minCapacity = "[Số người tối thiểu] không quá 50!"
      model.total += 1
    }

    if(data.maxCapacity == null || data.maxCapacity == ""){
      model.maxCapacity = ("[Số người tối đa] không bỏ trống !")
      model.total += 1
     }else if (data.maxCapacity < data.minCapacity) {
      model.maxCapacity = "[Số người tối đa] không nhỏ hơn tối thiểu!"
      model.total += 1
    }else if (data.maxCapacity <= 0) {
      model.maxCapacity = "[Số người tối đa] không nhỏ hơn 0!"
      model.total += 1
    }else if (data.maxCapacity > 100) {
      model.maxCapacity = "[Số người tối đa] không quá 100!"
      model.total += 1
    }

    // if (data.description == null || data.description == "") {
    //   model.description = ("[Mô tả] không bỏ trống!")
    //   model.total += 1
    // }else if (data.description.length > 200) {
    //   model.description = "[Mô tả] quá dài !"
    //   model.total += 1
    // }else if (data.description.length < 3) {
    //   model.description = "[Mô tả] quá ngắn !"
    //   model.total += 1
    // }

    if(data.vat == null || data.vat == ""){
      model.vat = ("[VAT] không bỏ trống !")
      model.total += 1
     }else if (data.vat <= 0) {
      model.vat = "[VAT] không nhỏ hơn 0!"
      model.total += 1
    }

    return model
   }

   validateTimeline(data: any, model: any, dataSchedule: any, dataList: any){
    model.total = 0
    var dateNow =  Date.now()
    var checkDate = new Date(dateNow).getTime()
    //departureDate = 30
    //departureDate = 35

    if (data.title == null || data.title == "") {
      model.title = ("[Tiêu đề] không bỏ trống !")
      model.total += 1
    }else if (data.title.length > 200) {
      model.title = "[Tiêu đề] quá dài !"
      model.total += 1
    }else if (data.title.length < 10) {
      model.title = "[Tiêu đề] quá ngắn !"
      model.total += 1
    }

    if(data.fromTime == 0 || data.fromTime == ""){
      model.fromTime = ("[Thời gian bắt đầu] không bỏ trống !")
      model.total += 1
     }else if(data.fromTime <= checkDate){
      model.fromTime = ("[Thời gian bắt đầu] không trước ngày hiện tại !")
      model.total += 1
     }else if(data.fromTime <= dataSchedule.departureDate){
      model.fromTime = ("[Thời gian bắt đầu] không trước ngày khởi hành !")
      model.total += 1
     }else if(data.fromTime >= dataSchedule.returnDate){
      model.fromTime = ("[Thời gian bắt đầu] không sau ngày trở về !")
      model.total += 1
     }else if(data.fromTime >= data.toTime){
      model.fromTime = ("[Thời gian bắt đầu] không sau thời gian kết thúc !")
      model.total += 1
     }

     if(data.toTime == 0 || data.toTime == ""){
      model.toTime = ("[Thời gian kết thúc] không bỏ trống !")
      model.total += 1
     }else if(data.toTime <= checkDate){
      model.toTime = ("[Thời gian kết thúc] không trước ngày hiện tại !")
      model.total += 1
     }else if(data.toTime >= dataSchedule.returnDate){
      model.toTime = ("[Thời gian kết thúc] không sau ngày trở về !")
      model.total += 1
     }else if(data.toTime <= data.fromTime){
      model.toTime = ("[Thời gian kết thúc] không trước thời gian bắt đầu !")
      model.total += 1
     }

     if (data.description == null || data.description == "") {
      model.description = ("[Mô tả] không bỏ trống !")
      model.total += 1
    }else if (data.description.length > 2000) {
      model.description = "[Mô tả] quá dài !"
      model.total += 1
    }else if (data.description.length < 10) {
      model.description = "[Mô tả] quá ngắn !"
      model.total += 1
    }

    if (dataList.length > 1) {
      dataList.forEach(timeline => {
        if (timeline.fromTime > data.fromTime || timeline.toTime > data.toTime) {
          model.description = "[Timeline] này đã tồn tại !"
          model.total += 1
        }
      });

    }
     return model
   }

  validateRole(data: any, model: any){
    model.total = 0
    //name
    if(data.nameRole == null || data.nameRole == ""){
      model.nameRole = "[Tên chức vụ] không để trống !"
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
  validateVoucher(data: any , model: any)
  {
    model.total = 0


      if (data.value == null || data.value == "") {
        model.value = "[Giá trị] không được để trống !"
        model.total += 1
      }else if (data.value < 0) {
        model.value = "[Giá trị] phải lớn hơn 0 !"
        model.total += 1
      }
      else if (data.value >99) {
        model.value = "[Giá trị] phải nhỏ  hơn 100 !"
        model.total += 1
      }


      if (data.endDate == null || data.endDate == "") {
        model.endDate = "[Ngày kết thúc ] không được để trống !"
        model.total += 1
      }else if(data.endDate < data.startDate ){
        model.endDate = "[Ngày kết thúc] không được trước ngày giảm giá !"
        model.total += 1
      }

      if (data.startDate == null || data.startDate == "") {
        model.startDate = "[Ngày bắt đầu] không được để trống !"
        model.total += 1
      }else if(data.startDate < Date.now ){
        model.startDate = "[Ngày bắt đầu] không hợp lệ !"
        model.total += 1
      }else if(data.startDate > data.endDate){
        model.startDate = "[Ngày bắt đầu] không được trước ngày kết thúc !"
        model.total += 1
      }



    return model
  }

  validateProvince(data: any, model: any){
    model.total = 0
    if (data.nameProvince == null || data.nameProvince == "") {
      model.nameProvince = "[Tên thành phố/tỉnh] không để trống !"
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
  validatePromotion(data: any, model: any){
    model.total = 0
    if(data.value == null)
    {
      model.value = "[Mã giảm giá] không được để trống !"
      model.total += 1
    }
    else if (data.value <0 || data.value >50) {
      model.value = "[Mã giảm giá] lớn hơn 0 và nhỏ hơn 50 !"
      model.total += 1
    }
    if(data.fromDate == 0 || data.fromDate == ""){
      model.fromDate = ("[Ngày bắt đầu] không bỏ trống !")
      model.total += 1
     }else if(data.fromDate < Date.now()){
      model.fromDate = ("[Ngày bắt đầu] không trước ngày hiện tại !")
      model.total += 1
     }else if(data.fromDate >= data.toDate){
      model.fromDate = ("[Ngày bắt đầu ]không sau ngày kết thúc !")
      model.total += 1
     }
     if(data.toDate == 0 || data.toDate == ""){
      model.toDate = ("[Ngày kết thúc] không bỏ trống !")
      model.total += 1
     }else if(data.toDate <= data.fromDate){
      model.toDate = ("[Ngày kết thúc] không trước ngày bắt đầu!")
      model.total += 1
     }else if(data.toDate < data.fromDate){
      model.toDate = ("[Ngày kết thúc] không trước ngày hiện tại!")
      model.total += 1
     }
    return model
  }

  validateDistrict(data: any, model: any){
    model.total = 0
    if (data.nameDistrict == null || data.nameDistrict == "") {
      model.nameDistrict = "[Tên quận/huyện] không để trống !"
      model.total += 1
    }else if (data.nameDistrict.length > 30) {
      model.nameDistrict = "[Tên quận/huyện] quá dài !"
      model.total += 1
    }else if (data.nameDistrict.length < 3) {
      model.nameDistrict = "[Tên quận/huyện] quá ngắn !"
      model.total += 1
    }

    if(data.provinceId == null || data.provinceId == ""){
      model.provinceId = "[Thành phố/tỉnh] không để trống !"
      model.total += 1
    }
    return model
  }

  validateWard(data: any, model: any){
    model.total = 0
    if (data.nameWard == null || data.nameWard == "") {
      model.nameWard = "[Tên phường/xã] không để trống !"
      model.total += 1
    }else if (data.nameWard.length > 30) {
      model.nameWard = "[Tên phường/xã] quá dài !"
      model.total += 1
    }else if (data.nameWard.length < 3) {
      model.nameWard = "[Tên phường/xã] quá ngắn !"
      model.total += 1
    }

    if(data.districtId == null || data.districtId == ""){
      model.districtId = "[Quận/huyện] không để trống !"
      model.total += 1
    }
    return model
  }

// hotel
validateHotel(data : any,model: any)
{
 model.total= 0
     if(data.name == null || data.name == ""){
       model.name= "[Tên khách sạn] không để trống !"
       model.total +=1
     }else if (data.name.length > 100) {
       model.name= "[Tên khách sạn] quá dài !"
       model.total +=1
     }else if (data.name.length < 1) {
       model.name= "[Tên khách sạn] quá ngắn !"
       model.total +=1
     }

     if (data.provinceId == null || data.provinceId == "") {
      model.provinceId = "[Tỉnh/thành phố] không để trống !"
      model.total += 1
    }

    if (data.districtId == null || data.districtId == "") {
      model.districtId = "[Quận/huyện] không để trống !"
      model.total += 1
    }

    if (data.wardId == null || data.wardId == "") {
      model.wardId = "[Phường/xã] không để trống !"
      model.total += 1
    }

   // phone

   if (data.phone == null || data.phone == "") {
     model.phone= "[Số điện thoại] không để trống !"
     model.total +=1
   }else if (data.phone.length > 15) {
    model.phone = "[Số điện thoại] vượt quá 15 số !"
    model.total += 1
  }
  else if (data.phone.length < 10) {
    model.phone = "[Số điện thoại] không hợp lệ !"
    model.total += 1
  }else if (!data.phone.startsWith("0")) {
     model.phone= "[Số điện thoại] không hợp lệ !"
     model.total +=1
   }
    //Address
  if (data.address == null || data.address == "") {
   model.address= "[Địa chỉ] không để trống !"
   model.total +=1
  }else if (data.address.length > 255) {
   model.address= "[Địa chỉ] quá dài !"
   model.total +=1
  }
  if (data.star == null || data.star == "") {
    model.star= "[Số sao] không để trống !"
    model.total +=1
  }
 // quantity
 if(data.quantitySR == null || data.quantitySR == ""){
   model.quantitySR= "[Số lượng] phòng đơn không để trống !"
   model.total +=1
   }

 if(data.singleRoomPrice == null || data.singleRoomPrice == ""){
   model.singleRoomPrice= "[Giá vé] phòng đơn không để trống !"
   model.total +=1
  }
// double room
   if(data.quantityDBR == null || data.quantityDBR == ""){
     model.quantityDBR= "[Số lượng] phòng đôi không để trống !"
     model.total +=1
     }

       if(data.doubleRoomPrice == null || data.doubleRoomPrice == ""){
     model.doubleRoomPrice= "[Giá vé] phòng đôi không để trống !"
     model.total +=1
     }
     return model

}

   validateCar(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(data.nameDriver == null || data.nameDriver == ""){
      model.nameDriver = "[Họ và tên] không để trống !"
      model.total += 1
    }else if (data.nameDriver.length > 100) {
      model.nameDriver = "[Họ và tên] quá dài !"
      model.total += 1
    }else if (data.nameDriver.length < 1) {
      model.nameDriver = "[Họ và tên] quá ngắn !"
      model.total += 1
    }
    if (data.liscensePlate == null || data.liscensePlate == "") {
      model.liscensePlate = "[Biển số xe] không để trống !"
      model.total += 1
    }else if (data.liscensePlate.length > 10) {
        model.liscensePlate = "[Biển số xe] không lớn hơn 10"
        model.total += 1
      }
    if(data.amountSeat == null || data.amountSeat == ""){
      model.amountSeat = "[Số chỗ] không để trống !"
      model.total += 1
    }else if(data.amountSeat < 4){
        model.amountSeat = "[Số chỗ] không nhỏ hơn 4"
        model.total += 1
      }
      if (data.phone == null || data.phone == "") {
        model.phone= "[Số điện thoại] không để trống !"
        model.total +=1
      }else if (data.phone.length > 15) {
       model.phone = "[Số điện thoại] vượt quá 15 số !"
       model.total += 1
     }
     else if (data.phone.length < 10) {
       model.phone = "[Số điện thoại] không hợp lệ !"
       model.total += 1
     }else if (!data.phone.startsWith("0")) {
        model.phone= "[Số điện thoại] không hợp lệ !"
        model.total +=1
      }
    return model
  }

  validateRestaurant(data : any,model: any)
  {
   model.total= 0
       if(data.name == null || data.name == ""){
         model.name= "[Tên nhà hàng] không để trống !"
         model.total +=1
       }else if (data.name.length > 100) {
         model.name= "[Tên nhà hàng] quá dài !"
         model.total +=1
       }else if (data.name.length < 1) {
         model.name= "[Tên nhà hàng] quá ngắn !"
         model.total +=1
       }

       if (data.provinceId == null || data.provinceId == "") {
        model.provinceId = "[Tỉnh/thành phố] không để trống !"
        model.total += 1
      }

      if (data.districtId == null || data.districtId == "") {
        model.districtId = "[Quận/huyện] không để trống !"
        model.total += 1
      }

      if (data.wardId == null || data.wardId == "") {
        model.wardId = "[Phường/xã] không để trống !"
        model.total += 1
      }

     // phone
     if (data.phone == null || data.phone == "") {
       model.phone= "[Số điện thoại] không để trống !"
       model.total +=1
     }else if (data.phone.length > 15) {
      model.phone = "[Số điện thoại] vượt quá 15 số !"
      model.total += 1
    }
    else if (data.phone.length < 10) {
      model.phone = "[Số điện thoại] không hợp lệ !"
      model.total += 1
    }else if (!data.phone.startsWith("0")) {
       model.phone= "[Số điện thoại] không hợp lệ !"
       model.total +=1
     }
      //Address
    if (data.address == null || data.address == "") {
     model.address= "[Địa chỉ] không để trống !"
     model.total +=1
    }else if (data.address.length > 255) {
     model.address= "[Địa chỉ] quá dài !"
     model.total +=1
   }
   // price
   if(data.comboPrice == null || data.comboPrice == ""){
     model.comboPrice= "[Giá] không để trống !"
     model.total +=1
     }else if(data.comboPrice < 50000 || data.comboPrice > 99999999){
      model.comboPrice= "[Giá] phải lớn hơn 50.000 và nhỏ hơn 100.000.00 !"
      model.total +=1
     }
     return model
  }

   // place
   validatePlace(data : any,model: any)
   {
    model.total = 0
        if(data.name == null || data.name == ""){
         model.name =("[Tên địa điểm] không để trống !")
         model.total += 1
      }else if (data.name.length > 100) {
        model.name =("[Tên địa điểm] quá dài !")
        model.total += 1
      }else if (data.name.length < 1) {
        model.name =("[Tên địa điểm] quá ngắn !")
        model.total += 1
      } // phone
      if (data.phone == null || data.phone == "") {
        model.phone= "[Số điện thoại] không để trống !"
        model.total +=1
      }else if (data.phone.length > 15) {
        model.phone = "[Số điện thoại] vượt quá 15 số !"
        model.total += 1
      }
      else if (data.phone.length < 10) {
        model.phone = "[Số điện thoại] không hợp lệ !"
        model.total += 1
      }else if (!data.phone.startsWith("0")) {
        model.phone= "[Số điện thoại] không hợp lệ !"
        model.total +=1
      }

      if (data.provinceId == null || data.provinceId == "") {
        model.provinceId = "[Tỉnh/thành phố] không để trống !"
        model.total += 1
      }

      if (data.districtId == null || data.districtId == "") {
        model.districtId = "[Quận/huyện] không để trống !"
        model.total += 1
      }

      if (data.wardId == null || data.wardId == "") {
        model.wardId = "[Phường/xã] không để trống !"
        model.total += 1
      }

      //Address
    if (data.address == null || data.address == "") {
      model.address= "[Địa chỉ] không để trống !"
      model.total +=1
    }else if (data.address.length > 255) {
      model.address= "[Địa chỉ] quá dài !"
      model.total +=1
    }
    // price
    if(data.priceTicket == null || data.priceTicket == ""){
      model.priceTicket= "[Giá] không để trống !"
      model.total +=1
      }else if(data.priceTicket < 50000 || data.priceTicket > 99999999){
      model.priceTicket= "[Giá] phải lớn hơn 50000 và nhỏ hơn 100.000.00 !"
      model.total +=1
      }
        return model
    }

   validateLogin(data: any, model: any){
    model.total = 0
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (data.email == null || data.email == "") {
      model.email = "[Email] không để trống !"
      model.total += 1
    }else if (!filter.test(data.email)) {
      model.email = "[Email] không hợp lệ !"
      model.total += 1
    }

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không để trống !"
      model.total += 1
    }

    return model
   }

   validateForgotPass(data: any, model: any){
    model.total = 0

    if(data.password == null || data.password == ""){
      model.password = "[Mật khẩu] không để trống !"
      model.total += 1
    }

    if(data.confirmPassword == null || data.confirmPassword == ""){
      model.confirmPassword = "[Nhập lại mật khẩu] không để trống !"
      model.total += 1
    }else if(data.password != data.confirmPassword){
      model.confirmPassword = "[Nhập lại mật khẩu] không trùng khớp  !"
      model.total += 1
    }
    return model
   }

   validateOtp(data: any, model: any, isOtp: boolean){
    model.total = 0
    var timePresent = Date.now()

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (isOtp) {
      if(data.checkOTP == null || data.checkOTP == ""){
        model.checkOTP = "[OTP] không để trống !"
        model.total += 1
      }else if(data.checkOTP != data.otpCode){
        model.checkOTP = "[OTP] không hợp lệ !"
        model.total += 1
      }

      if(data.endTime < timePresent){
        model.checkOTP = "[OTP] không còn hợp lệ !"
        model.total += 1
      }
    }
    else{
      if (data.email == null || data.email == "") {
        model.email = "[Email] không để trống !"
        model.total += 1
      }else if (!filter.test(data.email)) {
        model.email = "[Email] không hợp lệ !"
        model.total += 1
      }
    }

    return model
   }


   validateBanner(data: any, model: any){
    model.total = 0
    if (data.nameBanner == null || data.nameBanner == "") {
      model.nameBanner = "[Tên Banner] không để trống !"
      model.total += 1
    }else if (data.nameBanner.length > 255) {
      model.nameBanner = "[Tên Banner] quá dài !"
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

   formatFromUnixTimestampToFullDateTime(unix_timestamp: number){
    var date = new Date(unix_timestamp).toLocaleString()
    var splitDateTime = []
    splitDateTime = date.split(", ")
    var time = splitDateTime[0].split(":")
    var split = splitDateTime[1].split("/")
    var day = split[0];
    if (Number.parseInt(day) < 10) {
      day = "0"+day
    }
    var month = split[1];
    if (Number.parseInt(month) < 10) {
      month = "0"+month
    }
    var year =  split[2];
    var formattedDate = year + '-' + month + '-' + day + 'T' + time[0] + ":" + time[1];
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
    if (auth) {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      var titleeSplit = []
      titleeSplit = titlee.split("/")
      var menuItem = ROUTES.filter(menuItem => menuItem);
      menuItem.forEach(item => {
        item.roles.forEach(role => {
          if (role == auth.roleId && item.path.includes(titleeSplit[1])) {
            check++
          }
        });
      });
    }
    if (check == 0) {
      location.assign(this.clientUrl + "/login")
    }
   }

    listRole()
    {
      return RoleTitle.Admin+","+RoleTitle.LocalManager
    }

}
