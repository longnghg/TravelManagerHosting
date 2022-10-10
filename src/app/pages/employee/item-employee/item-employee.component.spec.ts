import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEmployeeComponent } from './item-employee.component';

describe('ItemEmployeeComponent', () => {
  let component: ItemEmployeeComponent;
  let fixture: ComponentFixture<ItemEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
