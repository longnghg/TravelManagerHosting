export class VoucherModel{
  idVoucher: string
  code: string
  startDate: number
  endDate: number
  value : string
  startDateDisplay: string
  endDateDisplay: string
  IdUserModify: string
}
export class ValidationVoucherModel{
  total: number
  value: number
  endDate: string= null
  startDate: string= null
}
