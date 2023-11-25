import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedecinService } from '../../services/medecin.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { Service } from '../../interfaces/service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnChanges {
  @Input() doctorData?: Doctor;
  doctorForm: FormGroup;
  specialities: string[] = ['Dermatologie', 'Neurologie', 'Ophtalmologie', 'Orthopédie', 'Psychiatrie', 'Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
  services: Service[] = [];

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private router: Router,
  ) {
      this.doctorForm = this.fb.group({
        prenom: ['', [Validators.required]],
        nom: ['', [Validators.required]],
        specialite: ['', [Validators.required]],
        anneesexperience: [0, [Validators.required, Validators.min(0)]],
        idservice: [null, [Validators.required]]
      });
    }

  initializeForm(doctorData: Doctor | null): void {
    this.doctorForm.setValue({
      prenom: doctorData?.prenom || '',
      nom: doctorData?.nom || '',
      specialite: doctorData?.specialite || this.specialities[0],
      anneesexperience: doctorData?.anneesexperience || 0,
      idservice: doctorData?.idservice || (this.services[0]?.idservice || null)
    });
  }

  ngOnInit(): void {
    this.medecinService.getServices().subscribe((services: Service[]) => {
      this.services = services;
      if (this.doctorData) {
        this.initializeForm(this.doctorData);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.doctorData && this.doctorData) {
      this.initializeForm(this.doctorData);
    }
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = this.doctorForm.value;
  
      if (this.doctorData) {
        newDoctor.idmedecin = this.doctorData.idmedecin;
        fetch('http://localhost:3000/database/medecins', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDoctor)
        })
        .then(response => response.json())
        .then(data => {
          alert(`Doctor ${data.prenom} ${data.nom} updated successfully.`);
          this.router.navigate(['/table-medecin']);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error updating the doctor.');
        });
      }
      else {
        fetch('http://localhost:3000/database/medecins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDoctor)
        })
        .then(response => response.json())
        .then(() => {
          this.router.navigate(['/table-medecin']);
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error adding the doctor.');
        });
      }
    } else {
      alert('Please fill in all the required fields.');
    }
  }
}
