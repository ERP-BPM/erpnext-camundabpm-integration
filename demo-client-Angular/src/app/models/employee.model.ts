import { IPerson } from "./person.model";



export class Employee implements IPerson {
  // Person data
  id: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  curp: string;
  email: string;
  genero: string;
  fecha_nacimiento: string;
  estado_civil: string;
  // Employee ata
  fecha_contratacion: string;
  cargo: string;
  rfc: string;

  constructor(props: {
    id: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    curp: string;
    email: string;
    genero: string;
    fecha_nacimiento: string;
    estado_civil: string;
    fecha_contratacion: string;
    cargo: string;
    rfc: string;
  }) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.apellido_paterno = props.apellido_paterno;
    this.apellido_materno = props.apellido_materno;
    this.curp = props.curp;
    this.email = props.email;
    this.genero = props.genero;
    this.fecha_nacimiento = props.fecha_nacimiento;
    this.estado_civil = props.estado_civil;
    this.fecha_contratacion = props.fecha_contratacion;
    this.cargo = props.cargo;
    this.rfc = props.rfc;
  }
}