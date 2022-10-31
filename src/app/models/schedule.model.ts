export class ScheduleModel{
  idSchedule: string
  departureDate: string
  departurePlace: string
  returnDate :string
  beginDate: string
  endDate: string
  timePromotion: string
  status: number
  finalPrice: number
  quantityAdult: number
  quantityBaby: number
  minCapacity: number
  maxCapacity: number
  quantityChild: number
  tourId: string
  nameTour: string
  carId: string
  liscensePlate: string
  nameDriver:string
  employeeId: string
  idTourGuide: string
  promotionId: string
  nameEmployee:string
  valuePromotion: number
  quantityCustomer: number
  totalCostTourNotService: number
  finalHoliday: number
  vat: number
  description: string
  isDelete: boolean
}

export class ValidateScheduleModel{
  total: number
  employeeId: string = null
  carId: string = null
  departurePlace: string = null
  departureDate: string = null
  returnDate: string = null
  promotionId: string = null
  timePromotion: string = null
  beginDate: string = null
  endDate: string = null
  minCapacity: string = null
  maxCapacity: string = null
  description: string = null
  vat: string = null
}
