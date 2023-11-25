import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedecinService } from '../../services/medecin.service';
import { Doctor } from '../../interfaces/doctor.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from '../../interfaces/service.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-medecin',
  templateUrl: './modify-medecin.component.html',
  styleUrls: ['./modify-medecin.component.css']
})
export class ModifyMedecinComponent implements OnInit {
  doctorData: Doctor;
  doctorForm: FormGroup;
  specialities: string[] = ['Dermatologie', 'Neurologie', 'Ophtalmologie', 'Orthopédie', 'Psychiatrie', 'Cardiologie', 'Pédiatrie', 'Chirurgie', 'Gynécologie', 'Radiologie'];
  services: Service[] = [];

  constructor(
    private fb: FormBuilder,
    private medecinService: MedecinService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.doctorForm = this.fb.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      specialite: ['', [Validators.required]],
      anneesexperience: [0, [Validators.required, Validators.min(0)]],
      idservice: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.medecinService.getServices().subscribe((services: Service[]) => {
      this.services = services;
    });

    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      // Ensure that `doctorId` is a string representing the numeric ID
      this.http.get<Doctor[]>(`http://localhost:3000/database/medecins/${doctorId}`)
      .subscribe(doctorDataArray => {
        // Assuming that the array always contains exactly one Doctor object.
        const doctorData = doctorDataArray[0];
        console.log('Initializing form with data:', doctorData);
        this.initializeForm(doctorData);
      }, error => {
        console.error('Error fetching doctor data:', error);
      });
    }
  }

  initializeForm(doctorData: Doctor | null): void {
    console.log('Initializing form with data:', doctorData);
    this.doctorForm.setValue({
      prenom: doctorData?.prenom || '',
      nom: doctorData?.nom || '',
      specialite: doctorData?.specialite || this.specialities[0],
      anneesexperience: doctorData?.anneesexperience || 0,
      idservice: doctorData?.idservice || (this.services.length > 0 ? this.services[0].idservice : null)
    });
  }

  onSubmit(): void {
    console.log('Attempting to submit form');
    console.log('Form status:', this.doctorForm.status);
    console.log('Form values:', this.doctorForm.value);
    if (this.doctorForm.valid) {
      const updatedDoctor: Doctor = this.doctorForm.value;
      const idmedecin = this.route.snapshot.paramMap.get('id');
      if (updatedDoctor) {
        this.http.put(`http://localhost:3000/database/medecins/${idmedecin}`, updatedDoctor)
          .subscribe({
            next: () => {
              alert(`Doctor ${updatedDoctor.prenom} ${updatedDoctor.nom} updated successfully.`);
            },
            error: (error) => {
              console.error('Full error:', error);            }
          });
      } else {
        console.error('Invalid doctor data:', updatedDoctor);
      }
    } else {
      alert('Please fill in all the required fields.');
    }
    this.router.navigate(['/table-medecin']);
  }
  
}
