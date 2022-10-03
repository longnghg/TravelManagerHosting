export interface RoleModel {
  Id: number
  Name: string
  Description: string
  IsDelete: boolean
}


export enum RoleTitle {
  'Admin',
  'Quản lý cục bộ',
  'Quản lý tour booking',
  'Quản lý tour',
  'Quản lý dịch vụ'
}

export enum StatusBooking {
  'Đã thanh toán',
  'Chưa thanh toán',
}

enum ApprovalStatus {
  'Đã duyệt',
  'Chưa duyệt',
  'Từ chối'
};

// const request =  {
//   id: 1,
//   status: ApprovalStatus.approved,
//   description: 'Please approve this request'
// };

// if(request.status === ApprovalStatus.approved) {
//   // send an email
//   console.log(request);

//   console.log('Send email to the Applicant...');
// }
