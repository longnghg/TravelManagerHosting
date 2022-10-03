export interface VoucherModel{
  Id: string
  Code: string
  Description: string
  Discount: number
  Point: number
  StartDate: number
  EndDate: number
  CreateDate: number
  CreateBy: string
  ModifyDate: number
  ModifyBy: string
  Status: number
  IsDelete: boolean
  IsFree: boolean
}
