import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVoucherComponent } from './item-voucher.component';

describe('ItemVoucherComponent', () => {
  let component: ItemVoucherComponent;
  let fixture: ComponentFixture<ItemVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
