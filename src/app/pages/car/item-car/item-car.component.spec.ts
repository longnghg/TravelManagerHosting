import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarComponent } from './item-car.component';

describe('ItemCarComponent', () => {
  let component: ItemCarComponent;
  let fixture: ComponentFixture<ItemCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
