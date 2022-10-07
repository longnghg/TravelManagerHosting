import { NotificationModel } from "./notification.model";

export interface ResponseModel{
  content: string
  notification: NotificationModel
  totalResult: number
}
