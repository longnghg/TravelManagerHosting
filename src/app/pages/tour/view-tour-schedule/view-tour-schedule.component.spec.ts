import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTourScheduleComponent } from './view-tour-schedule.component';

describe('ViewTourScheduleComponent', () => {
  let component: ViewTourScheduleComponent;
  let fixture: ComponentFixture<ViewTourScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTourScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTourScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
