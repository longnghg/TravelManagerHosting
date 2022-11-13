export class RestaurantModel{
  idRestaurant: string
  contractId: string
  name: string
  phone: string
  address: string
  comboPrice: number | string = 0
  idAction: boolean
  typeAction: string
  typeActionName: string
  IdUserModify: string
  modifyDate: number
  modifyDateDisplay: string
  approve: number
  approveName: string
}

export class ValidationRestaurantModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  comboPrice: number
}
