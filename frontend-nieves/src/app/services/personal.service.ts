import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private apiUrl = 'http://localhost:3000/api/personal'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de personal
  getPersonal(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
