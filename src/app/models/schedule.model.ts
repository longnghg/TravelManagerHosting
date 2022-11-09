
export class ScheduleModel{
  idSchedule: string

  departureDate: number
  departureDateDisplay: string
  returnDate :number
  returnDateDisplay: string
  beginDate: number
  beginDateDisplay: string
  endDate: number
  endDateDisplay: string
  timePromotion: number = 0
  timePromotionDisplay: string


  departurePlace: string
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
  promotionId: number = 1
  nameEmployee:string
  valuePromotion: number
  quantityCustomer: number
  totalCostTourNotService: number
  finalHoliday: number
  vat: number
  description: string
  isDelete: boolean
  idUserModify:string
  typeAction: string
  isTempdata: boolean
  approve: number
  approveName: string
}

export class ValidateScheduleModel{
  total: number
  employeeId: string = null
  carId: string = null
  departurePlace: string = null
  departureDate: number = 0
  returnDate: number = 0
  promotionId: number = 0
  timePromotion: number = 0
  beginDate: number = 0
  endDate: number = 0
  minCapacity: string = null
  maxCapacity: string = null
  description: string = null
  vat: string = null
}
