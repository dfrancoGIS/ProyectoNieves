import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadosComunicacionService {
  private baseUrl = 'http://localhost:3000/api/estadosComunicacion';

  constructor(private http: HttpClient) {}

  // Método para obtener los estados de la última campaña
  getEstadosComunicacionUltimaCampania(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  // ✅ Método para obtener estados de comunicación filtrados por campaña
  getEstadosComunicacionPorCampania(tituloCampania: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filtrar?tituloCampana=${encodeURIComponent(tituloCampania)}`);
  }

  eliminarEstadoComunicacion(id_estado_comunicacion: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id_estado_comunicacion}`);
  }

  // Método para insertar un nuevo estado de comunicación
  insertarEstadoComunicacion(estado_comunicacion:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insertar`,estado_comunicacion);
  }

  // Método para editar un estado de comunicación
  editarEstadoComunicacion(id_estado_comunicacion: string, datos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id_estado_comunicacion}`, datos);  // Aquí pasamos el id_estado_comunicacion como parte de la URL
  }
}