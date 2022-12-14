import { NgModule } from '@angular/core';
import { ForNumber } from "./forNumber.pipe";
import { FormatStatusBooking, FormatStatusCalled, FormatTitleNotification, FormatStatusCar, FormatStatusPayment } from "./formatStatus.pipe";
import { FormatFromUnixTimestampToFullDateView, FormatFromUnixTimestampToFullStartEndDateView,
  FormatDateToDateView, FormatFromUnixTimestampToFullDate, FormatFromUnixTimestampToFullDateTimeView,
  FormatFromUnixTimestampToFullTimeDateView, DateAgoPipe } from "./formatDateTime.pipe";
import { FormatPriceVi } from "./fomatPrice.pipe";
@NgModule({
  declarations: [
    ForNumber,
    FormatPriceVi,
    FormatFromUnixTimestampToFullDateView,
    FormatFromUnixTimestampToFullStartEndDateView,
    FormatDateToDateView,
    FormatFromUnixTimestampToFullDate,
    FormatFromUnixTimestampToFullTimeDateView,
    FormatFromUnixTimestampToFullDateTimeView,
    FormatStatusBooking,
    FormatStatusCalled,
    FormatTitleNotification,
    DateAgoPipe,
    FormatStatusCar,
    FormatStatusPayment
  ],
  exports: [
    ForNumber,
    FormatPriceVi,
    FormatFromUnixTimestampToFullDateView,
    FormatFromUnixTimestampToFullStartEndDateView,
    FormatDateToDateView,
    FormatFromUnixTimestampToFullDate,
    FormatFromUnixTimestampToFullTimeDateView,
    FormatFromUnixTimestampToFullDateTimeView,
    FormatStatusBooking,
    FormatStatusCalled,
    FormatTitleNotification,
    DateAgoPipe,
    FormatStatusCar,
    FormatStatusPayment
  ]
})
export class PipesModule { }
