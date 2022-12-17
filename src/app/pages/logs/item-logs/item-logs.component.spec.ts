import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLogsComponent } from './item-logs.component';

describe('ItemLogsComponent', () => {
  let component: ItemLogsComponent;
  let fixture: ComponentFixture<ItemLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
