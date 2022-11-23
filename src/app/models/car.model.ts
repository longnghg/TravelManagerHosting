export class CarModel{
  idCar: string = ""
  liscensePlate: string = ""
  status: number = 0
  amountSeat: number = 0
  phone: string = ""
  nameDriver: string = ""
  idEmployee: number = 0
  isDelete: boolean = false
  idUserModify: string = ""
  modifyDate: number = 0
  modifyDateDisplay: string = ""
}

export class ValidationCarModel {
  liscensePlate: string
  amountSeat: number
  phone: string
  nameDriver: string
  total: number = 0
}
