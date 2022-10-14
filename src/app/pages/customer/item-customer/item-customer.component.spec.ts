import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCustomerComponent } from './item-customer.component';

describe('ItemCustomerComponent', () => {
  let component: ItemCustomerComponent;
  let fixture: ComponentFixture<ItemCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
