import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarInfoComponent } from './list-car-info.component';

describe('ListCarInfoComponent', () => {
  let component: ListCarInfoComponent;
  let fixture: ComponentFixture<ListCarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
