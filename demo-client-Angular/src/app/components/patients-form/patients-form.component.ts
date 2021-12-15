import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css']
})
export class PatientsFormComponent implements OnInit {

  isValid: boolean;
  form: FormGroup;

  constructor(private patientService: PatientService) {
    this.isValid = true;
    this.form = new FormGroup({
      curp: new FormControl('', [
        Validators.required,
        // Validators.minLength(18)
      ]),
      nombre: new FormControl('', [Validators.required,]),
      apellido_paterno: new FormControl('', [Validators.required,]),
      apellido_materno: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required,]),
      estado_civil: new FormControl('', [Validators.required,]),
      genero: new FormControl('', [Validators.required,]),

      nss: new FormControl('', [Validators.required,]),
      grupo_sanguineo: new FormControl('', [
        Validators.required,
        // Validators.minLength(13)
      ]),
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.valid) {
      this.isValid = true;
      this.patientService.createPatient(this.form.value);
      this.form.reset();
    } else {
      this.isValid = false;
    }
  }

}
