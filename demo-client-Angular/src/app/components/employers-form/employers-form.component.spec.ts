import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployersFormComponent } from './employers-form.component';

describe('EmployersFormComponent', () => {
  let component: EmployersFormComponent;
  let fixture: ComponentFixture<EmployersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
