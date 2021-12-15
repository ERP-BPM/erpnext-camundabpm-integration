import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employers: Employee[];

  constructor() {
    this.employers = [
      new Employee({
        id: '1',
        curp: 'CURP',
        nombre: 'Erick Jared',
        apellido_paterno: 'Corpus',
        apellido_materno: 'Mendoza',
        cargo: 'cargo',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_contratacion: 'hoy',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        rfc: 'rfc'
      }),
      new Employee({
        id: '2',
        curp: 'CURP',
        nombre: 'Alberto',
        apellido_paterno: 'Martinez',
        apellido_materno: 'Garcia',
        cargo: 'cargo',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_contratacion: 'hoy',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        rfc: 'rfc'
      }),
      new Employee({
        id: '3',
        curp: 'CURP',
        nombre: 'Carlos Alberto',
        apellido_paterno: 'Herrera',
        apellido_materno: 'Rodríguez',
        cargo: 'cargo',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_contratacion: 'hoy',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        rfc: 'rfc'
      }),
      new Employee({
        id: '4',
        curp: 'CURP',
        nombre: 'Luis Angel',
        apellido_paterno: 'Alvarado',
        apellido_materno: 'Hernandez',
        cargo: 'cargo',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_contratacion: 'hoy',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        rfc: 'rfc'
      }),
      new Employee({
        id: '5',
        curp: 'CURP',
        nombre: 'Miguel',
        apellido_paterno: 'Trujillo',
        apellido_materno: 'Esquivel',
        cargo: 'cargo',
        email: 'email',
        estado_civil: 'estado_civil',
        fecha_contratacion: 'hoy',
        fecha_nacimiento: 'hoy',
        genero: 'genero',
        rfc: 'rfc'
      }),
    ];
  }

  get getEmployers(): Employee[] {
    return this.employers;
  }

  deleteEmployee(employee: Employee): void {
    const index: number = this.employers.indexOf(employee);
    if (index !== -1) {
      this.employers.splice(index, 1);
    }
  }

  createEmployee(data: any): void {
    this.employers.push(new Employee({
      id: `${this.employers.length + 1}`,
      curp: data.curp,
      nombre: data.nombre,
      apellido_paterno: data.apellido_paterno,
      apellido_materno: data.apellido_materno,
      cargo: data.cargo,
      email: data.email,
      estado_civil: data.estado_civil,
      genero: data.genero,
      rfc: data.rfc,
      fecha_contratacion: 'hoy',
      fecha_nacimiento: 'hoy',
    }));
  }
}
