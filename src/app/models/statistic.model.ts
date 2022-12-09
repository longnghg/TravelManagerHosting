export class StatisticModel{
  idWeek: string
  week: number
  month: number
  year: number
  fromDate: string
  toDate: string

  idReportTourBooking: string
  nameTour: string
  idTour: string
  dateSave: number
  quantityBooked: number
  totalRevenue: number
  totalCost: number
}

export class ReportTourBookingModel{
  idReportTourBooking: string
  nameTour: string
  idTour: string
  dateSave: number
  quantityBooked: number
  totalRevenue: number
  totalCost: number
}
