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
  isDelete: boolean
  isActive: boolean
  idUserModify:string
  typeAction: string
  rating: number
}

export class ValidateTourModel{
  total: number
  nameTour: string = null
  toPlace: string = null
  thumbnail: string = null
}
