export class CarModel{
  idCar: string
  liscensePlate: string
  status: number
  amountSeat: number
  phone: string
  nameDriver: string
  idEmployee: number
}

export class ValidationCarModel {
  liscensePlate: string
  amountSeat: number
  phone: string
  nameDriver: string
  total: number = 0
}
