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
  provinceId: string
  districtId: string
  wardId: string
}

export class ValidationRestaurantModel{
  total: number
  name: string= null
  phone: string= null
  address: string= null
  comboPrice: number
  provinceId: string
  districtId: string
  wardId: string
}
