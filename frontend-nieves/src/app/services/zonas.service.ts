import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private apiUrl = 'http://localhost:3000/api/zonas'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener todas las zonas
  getZonas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
