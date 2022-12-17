
import { ClassContent } from "../../enums/enum";

export class PaginationModel{


  pageSize: number = 5
  pageIndex: number = 1
  isDelete: boolean = false
  classContent: ClassContent | string = ""
  // keyword?: string
  // kwName?: string
  // kwId?: string
  // kwPhone?: string
  // kwEmail?: string
  // kwRoleName?: string
  // kwRoleId?: string
  // kwStatus?: string
  // kwActive?: string
}
