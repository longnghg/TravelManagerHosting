import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRoleComponent } from './item-role.component';

describe('ItemRoleComponent', () => {
  let component: ItemRoleComponent;
  let fixture: ComponentFixture<ItemRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
