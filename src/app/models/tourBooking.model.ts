export class TourBookingModel{
  id: string
  nameCustomer: string
  nameContact: string
  phone: string
  bookingNo: string
  pincode: string
  dateBooking: number
  lastDate: number
  vat: number
  address: string
  email: string
  voucherCode: string
  isCalled: number
  deposit: number
  remainPrice: number
  totalPrice: number
  modifyBy: string
  modifyDate: number
}

export class TourBookingStatisticModel{
  paying: string
  paid: string
  cancel: string
}
