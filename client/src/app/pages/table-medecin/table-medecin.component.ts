import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service
import { MedecinService } from '../../services/medecin.service';

@Component({
  selector: 'app-table-medecin',
  templateUrl: './table-medecin.component.html',
  styleUrls: ['./table-medecin.component.css']
})
export class TableMedecinComponent implements OnInit {
  medecins: any[] = [];

  constructor(
    private medecinService: MedecinService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe((data: any[]) => {
      this.medecins = data;
    },
    error => {
      console.error('Error fetching medecins', error);
    });
  }

  deleteMedecin(id: number) {
    this.medecinService.deleteMedecin(id).subscribe(() => {
      this.medecins = this.medecins.filter(medecin => medecin.idmedecin !== id);
    },
    error => {
      console.error('Error deleting medecin', error);
    });
  }

  updateMedecin(id: number) {
    this.router.navigate(['modify-medecin', id]);
  }
}
