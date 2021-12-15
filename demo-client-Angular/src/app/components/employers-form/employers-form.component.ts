import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employers-form',
  templateUrl: './employers-form.component.html',
  styleUrls: ['./employers-form.component.css']
})

export class EmployersFormComponent implements OnInit {

  isValid: boolean;
  form: FormGroup;

  constructor(private employeeService: EmployeeService) {
    this.isValid = true;
    this.form = new FormGroup({
      curp: new FormControl('', [
        Validators.required,
        // Validators.minLength(18)
      ]),
      nombre: new FormControl('', [Validators.required,]),
      apellido_paterno: new FormControl('', [Validators.required,]),
      apellido_materno: new FormControl('', [Validators.required,]),
      cargo: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required,]),
      estado_civil: new FormControl('', [Validators.required,]),
      genero: new FormControl('', [Validators.required,]),
      rfc: new FormControl('', [
        Validators.required,
        // Validators.minLength(13)
      ]),
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      this.isValid = true;
      this.employeeService.createEmployee(this.form.value);
      this.form.reset();
    } else {
      this.isValid = false;
    }
  }
}
