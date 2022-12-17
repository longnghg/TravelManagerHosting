export class HotelModel{
  idHotel: string = ""
  contractId: string = ""
  name: string = ""
  phone: string = ""
  address: string = ""
  star: number = null
  typeAction: string
  typeActionName: string
  singleRoomPrice: number | string = 0
  doubleRoomPrice: number | string = 0
  quantityDBR: number = 0
  quantitySR: number = 0
  IdUserModify: string
  modifyDate: number
  modifyDateDisplay: string
  approve: number
  approveName: string
  provinceId: string
  districtId: string
  wardId: string
}

export class ValidationHotelModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  star: number= null
  singleRoomPrice: number= null
  doubleRoomPrice: number= null
  quantityDBR: number= null
  quantitySR: number= null
}

