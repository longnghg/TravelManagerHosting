import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemScheduleComponent } from './item-schedule.component';

describe('ItemScheduleComponent', () => {
  let component: ItemScheduleComponent;
  let fixture: ComponentFixture<ItemScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
