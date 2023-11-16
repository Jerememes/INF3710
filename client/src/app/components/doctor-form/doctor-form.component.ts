import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedecinService } from '../../services/medecin.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { Service } from '../../interfaces/service.interface';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent {
  doctorForm: FormGroup;
  specialities: string[] = ['Dermatologie', 'Neurologie', 'Ophtalmologie', 'Orthopédie', 'Psychiatrie', 'Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
  services: Service[] = [
    {
      "idservice": 0,
      "nomservice": "Dermatologie"
    },
    {
      "idservice": 1,
      "nomservice": "Neurologie"
    },
    {
      "idservice": 2,
      "nomservice": "Ophtalmologie"
    },
    {
      "idservice": 3,
      "nomservice": "Orthopédie"
    },
    {
      "idservice": 4,
      "nomservice": "Psychiatrie"
    },
    {
      "idservice": 5,
      "nomservice": "Cardiologie"
    },
    {
      "idservice": 6,
      "nomservice": "Pédiatrie"
    },
    {
      "idservice": 7,
      "nomservice": "Chirurgie"
    },
    {
      "idservice": 8,
      "nomservice": "Gynécologie"
    },
    {
      "idservice": 9,
      "nomservice": "Radiologie"
    }
  ]
  router: any;
  constructor(private fb: FormBuilder, private medecinService: MedecinService) {
    this.doctorForm = this.fb.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      specialite: ['', [Validators.required]],
      anneesexperience: [0, [Validators.required, Validators.min(0)]],
      idservice: [this.services.length > 0 ? this.services[0].idservice : null, [Validators.required]]
    });

    this.medecinService.getMedecins().subscribe((data: any[]) => {
      this.doctorForm.setValue({
        prenom: 'John',
        nom: 'Doe',
        specialite: this.specialities[0],
        anneesexperience: 5,
        idservice: 1
      });
    });

    this.medecinService.getServices().subscribe((services: Service[]) => {
      this.services = services;
      this.doctorForm.patchValue({
        idservice: services.length > 0 ? services[0].idservice : null
      });
    });
  }

  onSubmit(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = this.doctorForm.value;
  
      // Use the fetch method to send a POST request with the newDoctor data
      fetch('http://localhost:3000/database/medecins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor)
      })
      .then(response => response.json())
      .then(data => {
        alert(`Doctor ${data.prenom} ${data.nom} added successfully.`);
        this.router.navigate(['/table-medecin']);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error adding the doctor.');
      });
    } else {
      alert('Please fill in all the required fields.');
    }
  }
}
