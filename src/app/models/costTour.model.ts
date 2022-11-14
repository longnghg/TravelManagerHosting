export class CostTourModel{
  idSchedule: string = ''
  breakfast: number | string = 0
  water: number  | string = 0
  feeGas: number  | string = 0
  distance: number | string = 0
  sellCost: number | string = 0
  depreciation: number | string = 0
  otherPrice: number | string = 0
  tolls: number | string = 0
  cusExpected: number | string = 0
  insuranceFee: number | string = 0
  isHoliday: boolean = null
  totalCostTour: number
  hotelId: string
  priceHotel: number = 0
  restaurantId: string
  priceRestaurant: number = 0
  placeId: string
  priceTicketPlace: number = 0

  maxCapacity: number
  minCapacity: number
}

export class ValidateCostTourModel{
  total: number = 0
  breakfast: number = null
  water: number = null
  feeGas: number = null
  distance: number = null
  sellCost: number = null
  depreciation: number = null
  otherPrice: number = null
  tolls: number = null
  cusExpected: number = null
  insuranceFee: number = null
  isHoliday: string = null
  hotelId: string = null
  restaurantId: string = null
  placeId: string = null
  maxCapacity: string
  minCapacity: string
}
