import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivacionService {
  private apiUrl = 'http://localhost:3000/api/activacion'; // ✅ URL base para activaciones

  constructor(private http: HttpClient) {}

  // ✅ Método para insertar una activación
  insertarActivacion(activacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertar`, activacion);
  }

  // ✅ Método para obtener todas las activaciones
  obtenerActivaciones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener`);
  }

  // ✅ Método para editar una activación
  editarActivacion(id: number, activacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar`, { idActivacion: id, ...activacion });
  }

  obtenerActivacionPorFechaHoraRecurso(fecha: string, horaInicio: string, recurso: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/buscar`, {
      params: { fecha, horaInicio, recurso }
    });
  }

}
