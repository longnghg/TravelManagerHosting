import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTourComponent } from './item-tour.component';

describe('ItemTourComponent', () => {
  let component: ItemTourComponent;
  let fixture: ComponentFixture<ItemTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
