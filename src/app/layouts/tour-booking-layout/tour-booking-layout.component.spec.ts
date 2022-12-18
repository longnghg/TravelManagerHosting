import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingLayoutComponent } from './tour-booking-layout.component';

describe('TourBookingLayoutComponent', () => {
  let component: TourBookingLayoutComponent;
  let fixture: ComponentFixture<TourBookingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourBookingLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourBookingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
