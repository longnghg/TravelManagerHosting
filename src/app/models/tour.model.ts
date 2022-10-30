export class TourModel{
  idTour: string
  nameTour: string
  thumbnail: string
  toPlace: string
  approveStatus: number
  status: string
  createDate: number
  modifyBy: string
  modifyDate: number
  isDelete: boolean
  isActive: boolean
  description:string
  vat: number
  rating: number
}

export class ValidateTourModel{
  total: number
  nameTour: string = null
  toPlace: string = null
  thumbnail: string = null
}
