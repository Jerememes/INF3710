import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../../services/medecin.service';

@Component({
  selector: 'app-table-medecin',
  templateUrl: './table-medecin.component.html',
  styleUrls: ['./table-medecin.component.css']
})
export class TableMedecinComponent implements OnInit {
  medecins: any[] = [];

  constructor(private medecinService: MedecinService) { }

  ngOnInit(): void {
    this.medecinService.getMedecins().subscribe((data: any[]) => {
      this.medecins = data;
    },
    error => {
      console.error('Error fetching medecins', error);
    });
  }
}
