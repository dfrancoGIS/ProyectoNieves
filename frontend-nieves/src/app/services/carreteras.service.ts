import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carretera } from '../interfaces/carretera'; // Asegúrate de que el tipo Carretera esté bien definido

@Injectable({
  providedIn: 'root'
})
export class CarreterasService {
  getEstados() {
    return this.http.get(`http://localhost:3000/api/estados`);
  }

  private baseUrl = 'http://localhost:3000/api/carreteras';  // URL de tu backend para obtener carreteras

  constructor(private http: HttpClient) { }

  // Método para obtener todas las carreteras
  getCarreteras(): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}`);
  }

  // Método para obtener las carreteras por prioridad
  getCarreterasPorPrioridad(prioridad: number): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}/prioridad/${prioridad}`);
  }
  
  // Método para obtener las carreteras por nombre
  getCarreterasPorNombre(nombre: string): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}/nombre/${nombre}`);
  }

  actualizarEstadoCarretera(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar-estado`, { 
        id_carretera: id, 
        nuevo_estado: nuevoEstado 
    });
}

}
