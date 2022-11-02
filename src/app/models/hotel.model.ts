export class HotelModel{
  idHotel: string
  contractId: string
  name: string
  phone: string
  address: string
  star: number
  idAction: boolean
  typeAction: string
  singleRoomPrice: number
  doubleRoomPrice: number
  quantityDBR: number
  quantitySR: number
  IdUserModify: string
  modifyDate: number
}

export class ValidationHotelModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  singleRoomPrice: number= null
  doubleRoomPrice: number= null
  quantityDBR: number= null
  quantitySR: number= null
}

