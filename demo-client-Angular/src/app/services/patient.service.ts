import { Injectable } from '@angular/core';
import { Patient } from '../models/patients.model';
import { Apollo, gql } from 'apollo-angular';

const CREATE_PATIENT = gql`
  mutation MyMutation(
    $fecha_nacimiento: date,
    $apellido_materno: String,
    $apellido_paterno: String,
    $curp: String,
    $email: String,
    $estado_civil: String,
    $genero: String,
    $nombre: String, $grupo_sanguineo: String, $nss: String) {
    insert_Hospital_paciente(objects: {email: $email, apellido_materno: $apellido_materno, apellido_paterno: $apellido_paterno, curp: $curp, estado_civil: $estado_civil, fecha_nacimiento: $fecha_nacimiento, genero: $genero, nombre: $nombre, grupo_sanguineo: $grupo_sanguineo, nss: $nss}) {
  returning {
    id_paciente
  }
  }
  }
`;

const GET_PATIENTS = gql`
  query MyQuery {
  Hospital_paciente {
    email
    id_paciente
    nss
    grupo_sanguineo
    apellido_materno
    apellido_paterno
    curp
    estado_civil
    fecha_nacimiento
    genero
    nombre
  }
}
`

const DELETE_PACIENT = gql`
mutation MyMutation($id: uuid) {
delete_Hospital_paciente(where: {id_paciente: {_eq: $id }}) {
  returning {
    nss
  }
}
}
`;

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  patients: Patient[];

  constructor(private apollo: Apollo) {
    this.patients = [];

    this.apollo.query({
      query: GET_PATIENTS,
    }).subscribe(({ data }) => {
      const dt = data['Hospital_paciente'];

      for (const p of dt) {
        this.patients.push(new Patient({
          id: p.id_paciente,
          curp: p.curp,
          nombre: p.nombre,
          apellido_paterno: p.apellido_paterno,
          apellido_materno: p.apellido_materno,
          email: p.email,
          estado_civil: p.estado_civil,
          genero: p.genero,
          fecha_nacimiento: 'hoy',
          grupo_sanguineo: p.grupo_sanguineo,
          nss: p.nss,
        }));
      }
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  get getPatients(): Patient[] {
    return this.patients;
  }

  createPatient(dataP: any): void {
    this.apollo.mutate({
      mutation: CREATE_PATIENT,
      variables: {
        curp: dataP.curp,
        nombre: dataP.nombre,
        apellido_paterno: dataP.apellido_paterno,
        apellido_materno: dataP.apellido_materno,
        email: dataP.email,
        estado_civil: dataP.estado_civil,
        genero: dataP.genero,
        fecha_nacimiento: '2021-11-11',
        grupo_sanguineo: dataP.grupo_sanguineo,
        nss: dataP.nss,
      }
    }).subscribe(({ data }) => {

      const dt = data['insert_Hospital_paciente']['returning'][0]['id_paciente'];

      this.patients.push(new Patient({
        id: dt,
        curp: dataP.curp,
        nombre: dataP.nombre,
        apellido_paterno: dataP.apellido_paterno,
        apellido_materno: dataP.apellido_materno,
        email: dataP.email,
        estado_civil: dataP.estado_civil,
        genero: dataP.genero,
        fecha_nacimiento: 'hoy',
        grupo_sanguineo: dataP.grupo_sanguineo,
        nss: dataP.nss,
      }));
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deletePatient(patient: Patient): void {
    this.apollo.mutate({
      mutation: DELETE_PACIENT,
      variables: {
        id: patient.id
      }
    }).subscribe(({ data }) => {
      console.log(data);

      const index: number = this.patients.indexOf(patient);
      if (index !== -1) {
        this.patients.splice(index, 1);
      }
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
