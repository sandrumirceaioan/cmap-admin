import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCasinosComponent } from './admin-casinos.component';

describe('AdminCasinosComponent', () => {
  let component: AdminCasinosComponent;
  let fixture: ComponentFixture<AdminCasinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCasinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCasinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
