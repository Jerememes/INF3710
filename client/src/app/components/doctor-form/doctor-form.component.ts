import { Component, Input } from '@angular/core';
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
export class DoctorFormComponent {
  @Input() doctorData: Doctor = {
    prenom: "Prénom",
    nom: "Nom",
    specialite: "Spécialité",
    anneesexperience: 999,
    idservice: 999,
  };

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

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private router: Router,
  ) {
    this.doctorForm = this.fb.group({
      prenom: [this.doctorData?.prenom, [Validators.required]],
      nom: [this.doctorData?.nom, [Validators.required]],
      specialite: [this.doctorData?.specialite, [Validators.required]],
      anneesexperience: [0, [Validators.required, Validators.min(0)]],
      idservice: [this.services.length > 0 ? this.services[0].idservice : null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.medecinService.getServices().subscribe((services: Service[]) => {
      this.services = services;
      
      if (this.doctorData) {
        this.doctorForm.patchValue(this.doctorData);
      } else {
        this.doctorForm.patchValue({
          idservice: services.length > 0 ? services[0].idservice : null
        });
      }
    });
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
        .then(data => {
          alert(`Doctor ${data.prenom} ${data.nom} added successfully.`);
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
