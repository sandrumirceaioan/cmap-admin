import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCasinoComponent } from './admin-casino.component';

describe('AdminCasinoComponent', () => {
  let component: AdminCasinoComponent;
  let fixture: ComponentFixture<AdminCasinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
