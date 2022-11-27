import {Pipe, PipeTransform  } from '@angular/core';
import { StatusBooking, StatusCalled, TitleNotification } from "../enums/enum";

@Pipe({name: 'formatStatusBooking'})
export class FormatStatusBooking implements PipeTransform {
  transform(status: any) : any {
    return StatusBooking[status]
  }
}


@Pipe({name: 'formatStatusCalled'})
export class FormatStatusCalled implements PipeTransform {
  transform(status: any) : any {
    return StatusCalled[status]
  }
}

@Pipe({name: 'formatTitleNotification'})
export class FormatTitleNotification implements PipeTransform {
  transform(status: any) : any {
    return TitleNotification[status]
  }
}

