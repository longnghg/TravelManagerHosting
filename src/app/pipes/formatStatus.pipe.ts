import {Pipe, PipeTransform  } from '@angular/core';
import { StatusBooking, StatusCalled, TitleNotification, StatusCar, StatusPayment } from "../enums/enum";

@Pipe({name: 'formatStatusBooking'})
export class FormatStatusBooking implements PipeTransform {
  transform(status: any) : any {
    return StatusBooking[status]
  }
}

@Pipe({name: 'formatStatusCar'})
export class FormatStatusCar implements PipeTransform {
  transform(status: any) : any {
    return StatusCar[status]
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

@Pipe({name: 'formatStatusPayment'})
export class FormatStatusPayment implements PipeTransform {
  transform(status: any) : any {
    return StatusPayment[status]
  }
}
