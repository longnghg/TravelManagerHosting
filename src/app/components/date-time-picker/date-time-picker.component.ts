import { Component, OnInit, Input } from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {
  @Input() type: typeDate
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: any;
  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    console.log(this.fromDate);
    console.log(this.toDate);
    this.hoveredDate = {
      year: this.fromDate.year,
      month: this.fromDate.month,
      day: this.fromDate.day
    }
  }

  ngOnInit(): void {
  }

  onDateSelection() {
    console.log(this.fromDate);
    console.log(this.toDate);


  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}


export declare type typeDate = 'single' | 'range' ;
