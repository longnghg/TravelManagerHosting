export class PromotionModel{
  idPromotion: number
  value: number
  toDate: number
  fromDate: number
  fromDateDisplay: string
  toDateDisplay: string

  idAction: boolean
  typeAction: string
  typeActionName: string
  IdUserModify: string
  modifyDate: number
  approve: number
  approveName: string
}

export class ValidationPromotionModel{
  total: number
  value: number
  toDate: string= null
  fromDate: string= null
}

export class PromotionStatisticModel{
  promotion: string
  promotionOfMonth: string
}
