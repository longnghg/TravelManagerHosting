export class TourModel{
  idTour: string
  nameTour: string
  thumbnail: string
  toPlace: string
  approveStatus: number
  approveName: string
  status: string
  createDate: number
  modifyBy: string
  modifyDate: number
  modifyDateDisplay: string
  isDelete: boolean
  isActive: boolean
  idUserModify:string
  typeAction: string
  rating: number

  imgDetail1: string
  imgDetail2: string
  imgDetail3: string
  imgDetail4: string
}

export class ValidateTourModel{
  total: number
  nameTour: string = null
  toPlace: string = null
  thumbnail: string = null
  rating: number = null
}
