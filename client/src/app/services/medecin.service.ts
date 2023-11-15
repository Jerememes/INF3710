import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private apiUrl: string = 'http://localhost:3000/database/medecins';

  constructor(private http: HttpClient) { }

  getMedecins(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
