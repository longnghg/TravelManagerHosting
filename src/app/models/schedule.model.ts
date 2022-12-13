import { CarModel } from "../models/car.model";
import { TourModel } from "../models/tour.model";
import { PromotionModel } from "../models/promotion.model";
export class ScheduleModel{
  idSchedule: string = ""
  departureDate: number = 0
  departureDateDisplay: string = ""
  returnDate :number = 0
  returnDateDisplay: string = ""
  beginDate: number = 0
  beginDateDisplay: string = ""
  endDate: number = 0
  endDateDisplay: string = ""
  timePromotion: number = 0
  timePromotionDisplay: string = ""
  endTimePromotion: number = 0
  endTimePromotionDisplay: string = ""
  car: CarModel
  tour: TourModel
  departurePlace: string = null
  status: number = 0
  finalPrice: number = 0
  quantityAdult: number = 0
  quantityBaby: number = 0
  minCapacity: number = 0
  maxCapacity: number = 0
  quantityChild: number = 0
  tourId: string = null
  nameTour: string = ""
  carId: string = null
  liscensePlate: string = ""
  nameDriver:string = ""
  employeeId: string = null
  idTourGuide: string = ""
  promotionId: number = 1
  nameEmployee:string = ""
  valuePromotion: number = 0
  quantityCustomer: number = 0
  totalCostTourNotService: number = 0
  finalHoliday: number = 0
  vat: number = 10
  description: string = ""
  isDelete: boolean
  idUserModify:string = ""
  modifyBy: string = ""
  typeAction: string = ""
  isTempdata: boolean
  approve: number = 0
  approveName: string = ""
  modifyDate: number = 0
  modifyDateDisplay: string = ""
  profit: number = 0

  isUpdateDR: boolean = false
  isUpdate: boolean = false
  isRemoveTimeLine: boolean = false
  promotions: PromotionModel = new PromotionModel
  rowNum?: number
}

export class ValidateScheduleModel{
  total: number = 0
  employeeId: string = null
  carId: string = null
  departurePlace: string = null
  departureDate: number = 0
  returnDate: number = 0
  // promotionId: number = 0

  beginDate: number = 0
  endDate: number = 0
  minCapacity: string = null
  maxCapacity: string = null
  // description: string = null
  vat: string = null
  profit: number = null
}
