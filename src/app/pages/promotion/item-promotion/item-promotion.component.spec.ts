import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPromotionComponent } from './item-promotion.component';

describe('ItemPromotionComponent', () => {
  let component: ItemPromotionComponent;
  let fixture: ComponentFixture<ItemPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
