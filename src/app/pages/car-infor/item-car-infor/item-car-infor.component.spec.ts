import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarInforComponent } from './item-car-infor.component';

describe('ItemCarInforComponent', () => {
  let component: ItemCarInforComponent;
  let fixture: ComponentFixture<ItemCarInforComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCarInforComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCarInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
