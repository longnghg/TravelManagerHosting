import { NotificationModel } from "../responsiveModels/notification.model";

export interface ResponsiveModel{
  content: string
  notification: NotificationModel
  pageNumber: number
  pageSize: number
  pageTotal: number
}
