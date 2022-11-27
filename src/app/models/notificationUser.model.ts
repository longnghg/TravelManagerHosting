export class NotificationUserModel{
  idNotification: string
  title: string
  type: number
  content: string
  time: number = 0
  timeDisplay: string = ""
  isSeen: boolean
  roleId: number
}
