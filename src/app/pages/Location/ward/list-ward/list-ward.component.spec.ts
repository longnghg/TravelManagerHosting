import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWardComponent } from './list-ward.component';

describe('ListWardComponent', () => {
  let component: ListWardComponent;
  let fixture: ComponentFixture<ListWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
