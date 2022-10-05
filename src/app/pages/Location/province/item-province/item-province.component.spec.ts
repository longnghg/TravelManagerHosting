import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProvinceComponent } from './item-province.component';

describe('ItemProvinceComponent', () => {
  let component: ItemProvinceComponent;
  let fixture: ComponentFixture<ItemProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
