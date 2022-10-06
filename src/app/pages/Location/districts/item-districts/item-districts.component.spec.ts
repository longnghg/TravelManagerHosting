import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDistrictsComponent } from './item-districts.component';

describe('ItemDistrictsComponent', () => {
  let component: ItemDistrictsComponent;
  let fixture: ComponentFixture<ItemDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDistrictsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
