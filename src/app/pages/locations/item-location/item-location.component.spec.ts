import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLocationComponent } from './item-location.component';

describe('ItemProvinceComponent', () => {
  let component: ItemLocationComponent;
  let fixture: ComponentFixture<ItemLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
