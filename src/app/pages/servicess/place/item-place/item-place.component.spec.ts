import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPlaceComponent } from './item-place.component';

describe('ItemPlaceComponent', () => {
  let component: ItemPlaceComponent;
  let fixture: ComponentFixture<ItemPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
