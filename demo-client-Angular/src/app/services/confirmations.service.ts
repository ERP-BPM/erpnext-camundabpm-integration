import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationsService {



  constructor(private httpClient: HttpClient) { }

  async receptionComfirm(id: string): Promise<void> {
    try {
      const body = {
        workflow_id: id,
        message_name: 'lab_results_message',
        message: {
          results: 'positivo',
        }
      };

      await this.httpClient.post<any>(
        environment.endpoint,
        body,
        // this.httpOptions
      ).toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  async confirmIngress(id: string): Promise<void> {
    try {
      const body = {
        workflow_id: id,
        message_name: 'confirm_ingreess_message',
        message: {
          status: 'CONFIRMED',
        }
      };

      await this.httpClient.post<any>(
        environment.endpoint,
        body,
        // this.httpOptions
      ).toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  async dischargeConfirm(id: string): Promise<void> {
    try {
      const body = {
        workflow_id: id,
        message_name: 'discharge_medical_message',
        message: {
          alta: '2021-11-11',
        }
      };

      await this.httpClient.post<any>(
        environment.endpoint,
        body,
        // this.httpOptions
      ).toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  async infoAboutPatient(id: string): Promise<void> {
    try {
      const body = {
        workflow_id: id,
        message_name: 'patien_info_message',
        message: {
          seguro: 'particular',
        }
      };

      await this.httpClient.post<any>(
        environment.endpoint,
        body,
        // this.httpOptions
      ).toPromise();
    } catch (e) {
      console.log(e);
    }
  }

  async takeSignalConfirm(id: string): Promise<void> {
    try {
      const body = {
        workflow_id: id,
        message_name: 'take_signals_patient_activity',
        message: {
          presion: '140/90',
          temperatura: '36',
        }
      };

      await this.httpClient.post<any>(
        environment.endpoint,
        body,
        // this.httpOptions
      ).toPromise();
    } catch (e) {
      console.log(e);
    }
  }

}
