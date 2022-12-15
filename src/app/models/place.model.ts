export class PlaceModel{
  idPlace: string
  contractId: string
  name: string
  address: string
  phone: string
  priceTicket: number | string = 0
  idAction: boolean
  typeAction: string
  typeActionName: string
  IdUserModify: string
  modifyDate: number
  modifyDateDisplay: string
  approve: number
  approveName: string
  provinceId: string
  districtId: string
  wardId: string
}
export class ValidationPlaceModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  priceTicket: number= null
  provinceId: string
  districtId: string
  wardId: string
}
