export class CostTourModel{
  idSchedule: string
  breakfast: number = 0
  water: number  = 0
  feeGas: number  = 0
  distance: number = 0
  sellCost: number = 0
  depreciation: number = 0
  otherPrice: number = 0
  tolls: number = 0
  cusExpected: number = 0
  insuranceFee: number = 0
  isHoliday: boolean = null
  totalCostTour: number = 0
  hotelId: string
  priceHotel: number = 0
  restaurantId: string
  priceRestaurant: number = 0
  placeId: string 
  priceTicketPlace: number = 0
}
