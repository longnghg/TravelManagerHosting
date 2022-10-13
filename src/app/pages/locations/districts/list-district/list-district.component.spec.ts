import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistrictComponent } from './list-district.component';

describe('ListDistrictComponent', () => {
  let component: ListDistrictComponent;
  let fixture: ComponentFixture<ListDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
