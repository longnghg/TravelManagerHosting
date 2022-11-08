import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTourBookingComponent } from './item-tour-booking.component';

describe('ItemTourBookingComponent', () => {
  let component: ItemTourBookingComponent;
  let fixture: ComponentFixture<ItemTourBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTourBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTourBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
