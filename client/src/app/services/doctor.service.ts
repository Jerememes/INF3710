import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  private doctorSubject: BehaviorSubject<Doctor> = new BehaviorSubject({
    prenom: "Prénom",
    nom: "Nom",
    specialite: "Spécialité",
    anneesexperience: 999,
    idservice: 999,
  });
  public readonly currentDoctor: Observable<Doctor> = this.doctorSubject.asObservable();

  //updateDoctor(updatedDoctor: Doctor): void {
  //  this.doctorSubject = updatedDoctor;
  //  this.objectSubject.next(this._object);
  //}
}