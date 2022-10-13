import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDistrictComponent } from './item-district.component';

describe('ItemDistrictComponent', () => {
  let component: ItemDistrictComponent;
  let fixture: ComponentFixture<ItemDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
