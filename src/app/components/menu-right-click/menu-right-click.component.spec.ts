import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRightClickComponent } from './menu-right-click.component';

describe('MenuRightClickComponent', () => {
  let component: MenuRightClickComponent;
  let fixture: ComponentFixture<MenuRightClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRightClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRightClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
