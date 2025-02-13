import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialEquiposService {
  private baseUrl = 'http://localhost:3000/api'; // Asegúrate de que la URL sea la correcta
  
  constructor(private http: HttpClient) {}

  // Obtener historial de equipos
  getHistorialEquipos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/historial`); // Llamada correcta a la ruta del backend
  }
}
