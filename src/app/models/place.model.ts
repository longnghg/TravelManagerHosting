export class PlaceModel{
  idPlace: string
  contractId: string
  name: string
  address: string
  phone: string
  priceTicket: number
  modifyBy: string
  modifyDate: number
}
export class ValidationPlaceModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  priceTicket: number= null

}
