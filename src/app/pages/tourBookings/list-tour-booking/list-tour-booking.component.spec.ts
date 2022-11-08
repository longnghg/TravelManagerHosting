import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTourBookingComponent } from './list-tour-booking.component';

describe('ListTourBookingComponent', () => {
  let component: ListTourBookingComponent;
  let fixture: ComponentFixture<ListTourBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTourBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTourBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
