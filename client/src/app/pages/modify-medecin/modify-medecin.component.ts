import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedecinService } from '../../services/medecin.service';
import { Doctor } from '../../interfaces/doctor.interface';

@Component({
  selector: 'app-modify-medecin',
  templateUrl: './modify-medecin.component.html',
  styleUrls: ['./modify-medecin.component.css']
})
export class ModifyMedecinComponent implements OnInit {
  doctorId: number;
  doctorData: Doctor | null = null;
  doctorDataReady = new EventEmitter<Doctor | null>();

  constructor(
    private route: ActivatedRoute,
    private medecinService: MedecinService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        this.doctorId = +idParam;
        this.medecinService.getMedecinById(this.doctorId).subscribe({
          next: (medecin: Doctor) => {
            this.doctorData = medecin;
            this.doctorDataReady.emit(this.doctorData);
          },
          error: err => {
            console.error('Failed to fetch doctor data', err);
            this.doctorDataReady.emit(null);
          }
        });
      }
    });
  }
}