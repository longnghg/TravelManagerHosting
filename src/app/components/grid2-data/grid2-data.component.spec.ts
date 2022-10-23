import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid2DataComponent } from './grid2-data.component';

describe('GridDataComponent', () => {
  let component: Grid2DataComponent;
  let fixture: ComponentFixture<Grid2DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Grid2DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Grid2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
