
export class ScheduleModel{
  idSchedule: string

  departureDate: number = 0
  departureDateDisplay: string
  returnDate :number = 0
  returnDateDisplay: string
  beginDate: number = 0
  beginDateDisplay: string
  endDate: number = 0
  endDateDisplay: string
  timePromotion: number = 0
  timePromotionDisplay: string
  endTimePromotion: number = 0
  endTimePromotionDisplay: string

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
  modifyBy: string
  typeAction: string
  isTempdata: boolean
  approve: number
  approveName: string
  modifyDate: number
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
