import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patients.model';
import { ConfirmationsService } from 'src/app/services/confirmations.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[];

  constructor(
    private patientService: PatientService,
    private confirmationsService: ConfirmationsService
  ) {
    this.patients = patientService.getPatients;
  }

  ngOnInit(): void {
  }

  deletePatient(patient: Patient): void {
    this.patientService.deletePatient(patient);

  }

  receptionComfirm(patient: Patient): void {
    this.confirmationsService.receptionComfirm(patient.id);
  }

  confirmIngress(patient: Patient): void {
    this.confirmationsService.confirmIngress(patient.id);
  }

  dischargeConfirm(patient: Patient): void {
    this.confirmationsService.dischargeConfirm(patient.id);
  }

  infoAboutPatient(patient: Patient): void {
    this.confirmationsService.infoAboutPatient(patient.id);
  }

  takeSignalConfirm(patient: Patient): void {
    this.confirmationsService.takeSignalConfirm(patient.id);
  }
}
