export interface TourDetailModel{
  Id: string
  TourId: string
  IdCostTour: string
  PriceChild: number
  PriceBaby: number
  PriceAdult: number
  PriceChildPromotion: number
  PriceBabyPromotion: number
  PriceAdultPromotion: number
  DisplayPrice: number
  DisplayPromotionPrice
  Description: string
  QuantityBooked: number
  IsPromotion: boolean
  TotalCostTour: number
  Profit: number
  Vat: number
  FinalPrice: number
}
