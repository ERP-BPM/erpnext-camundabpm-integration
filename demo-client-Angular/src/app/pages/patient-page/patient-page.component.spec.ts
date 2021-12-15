import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPageComponent } from './patient-page.component';

describe('PatientPageComponent', () => {
  let component: PatientPageComponent;
  let fixture: ComponentFixture<PatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
