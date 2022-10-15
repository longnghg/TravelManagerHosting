import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRestaurantComponent } from './item-restaurant.component';

describe('ItemRestaurantComponent', () => {
  let component: ItemRestaurantComponent;
  let fixture: ComponentFixture<ItemRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
