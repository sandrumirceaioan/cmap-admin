import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBonusesComponent } from './admin-bonuses.component';

describe('AdminBonusesComponent', () => {
  let component: AdminBonusesComponent;
  let fixture: ComponentFixture<AdminBonusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBonusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBonusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
