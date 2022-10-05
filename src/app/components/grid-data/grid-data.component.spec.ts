import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDataComponent } from './grid-data.component';

describe('GridDataComponent', () => {
  let component: GridDataComponent;
  let fixture: ComponentFixture<GridDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
