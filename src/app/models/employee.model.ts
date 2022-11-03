export class EmployeeModel {
  idEmployee: string = null
  nameEmployee: string = null
  email: string = null
  password: string = null
  phone: string = null
  gender: boolean = null
  address: string = null
  birthday: string = "0"
  image: string = null
  roleId: string = null
  roleName: string = null
  roleDescription: string = null
  createDate: number = 0
  modifyDate: number = 0
  modifyBy: string = null
  isActive: boolean = true
  isDelete: boolean = false
}

export class ValidationEmployeeModel {
  total: number
  nameEmployee: string = null
  email: string = null
  phone: string = null
  gender: string = null
  address: string = null
  birthday: string = null
  image: string = null
  roleId: string = null
}
