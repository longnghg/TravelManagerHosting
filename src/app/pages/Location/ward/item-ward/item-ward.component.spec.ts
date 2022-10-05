import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWardComponent } from './item-ward.component';

describe('ItemWardComponent', () => {
  let component: ItemWardComponent;
  let fixture: ComponentFixture<ItemWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
