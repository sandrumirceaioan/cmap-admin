import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAffiliatesComponent } from './admin-affiliates.component';

describe('AdminAffiliatesComponent', () => {
  let component: AdminAffiliatesComponent;
  let fixture: ComponentFixture<AdminAffiliatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAffiliatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAffiliatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
