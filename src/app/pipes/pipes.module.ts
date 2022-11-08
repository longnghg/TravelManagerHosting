import { NgModule } from '@angular/core';
import { ForNumber } from "./forNumber.pipe";
import { FormatStatusBooking, FormatStatusCalled } from "./formatStatus.pipe";
import { FormatFromUnixTimestampToFullDateView, FormatFromUnixTimestampToFullStartEndDateView,
  FormatDateToDateView, FormatFromUnixTimestampToFullDate, FormatFromUnixTimestampToFullDateTimeView,
  FormatFromUnixTimestampToFullTimeDateView } from "./formatDateTime.pipe";
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
    FormatStatusCalled
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
    FormatStatusCalled
  ]
})
export class PipesModule { }
