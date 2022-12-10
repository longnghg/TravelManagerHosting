import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportLayoutComponent } from './support-layout.component';

describe('SupportLayoutComponent', () => {
  let component: SupportLayoutComponent;
  let fixture: ComponentFixture<SupportLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
