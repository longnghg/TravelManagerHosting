import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTourScheduleComponent } from './item-tour-schedule.component';

describe('ItemTourScheduleComponent', () => {
  let component: ItemTourScheduleComponent;
  let fixture: ComponentFixture<ItemTourScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTourScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTourScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
