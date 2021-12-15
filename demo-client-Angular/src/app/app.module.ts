import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { EmployersListComponent } from './components/employers-list/employers-list.component';
import { EmployersFormComponent } from './components/employers-form/employers-form.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientsFormComponent } from './components/patients-form/patients-form.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EmployeesPageComponent,
    PatientPageComponent,
    EmployersListComponent,
    EmployersFormComponent,
    PatientsListComponent,
    PatientsFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
