import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHotelComponent } from './item-hotel.component';

describe('ItemHotelComponent', () => {
  let component: ItemHotelComponent;
  let fixture: ComponentFixture<ItemHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
