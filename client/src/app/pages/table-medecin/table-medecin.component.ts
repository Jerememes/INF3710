import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../../services/medecin.service';
import { Doctor } from 'src/app/interfaces/doctor.interface';

@Component({
  selector: 'app-table-medecin',
  templateUrl: './table-medecin.component.html',
  styleUrls: ['./table-medecin.component.css']
})
export class TableMedecinComponent implements OnInit {
  medecins: Doctor[] = [];
  currentSortKey: string | null = null;
sortAscending: boolean = true;

  constructor(
    private medecinService: MedecinService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe({
    next: (data) => this.medecins = data,
    error: (error) => console.error('Error fetching "medecins"', error)
    });
  }

  deleteMedecin(id: number) {
    this.medecinService.deleteMedecin(id).subscribe({
    next: () => this.medecins = this.medecins.filter(medecin => medecin.idmedecin !== id),
    error: (error) => console.error('Error deleting medecin', error)
    });
  }

  updateMedecin(id: number) {
    this.router.navigate(['modify-medecin', id]);
  }

  sortByKey(key: keyof Doctor): void {
    if (this.currentSortKey === key) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.currentSortKey = key;
      this.sortAscending = true;
    }
    this.medecins.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * (this.sortAscending ? 1 : -1);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * (this.sortAscending ? 1 : -1);
      } else {
        return 0;
      }
    });
  }
}
