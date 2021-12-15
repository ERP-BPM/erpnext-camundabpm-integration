import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrls: ['./employers-list.component.css']
})
export class EmployersListComponent implements OnInit {

  employers: Employee[];

  constructor(private employeeService: EmployeeService) {
    this.employers = employeeService.getEmployers;
  }

  ngOnInit(): void {
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee);
  }

}
