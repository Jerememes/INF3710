import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';
import { Service } from '../interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private apiUrl: string = 'http://localhost:3000/database/medecins';

  constructor(private http: HttpClient) { }

  getMedecins(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addMedecin(medecin: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, medecin);
  }

  deleteMedecin(id: number): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/${id}`);
  }

  updateMedecin(id: number): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, id);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:3000/database/services');
  }
}
