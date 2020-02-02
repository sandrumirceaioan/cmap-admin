import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlotsComponent } from './admin-slots.component';

describe('AdminSlotsComponent', () => {
  let component: AdminSlotsComponent;
  let fixture: ComponentFixture<AdminSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
