import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProvinceComponent } from './list-province.component';

describe('ListProvinceComponent', () => {
  let component: ListProvinceComponent;
  let fixture: ComponentFixture<ListProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProvinceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
