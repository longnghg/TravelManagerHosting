export class VoucherModel{
  idVoucher: string
  code: string
  description: string
  discount: number
  point: number
  startDate: number
  endDate: number
  createDate: number
  createBy: string
  modifyDate: number
  modifyBy: string
  status: number
  isDelete: boolean
  isFree: boolean
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
  point: number
}
