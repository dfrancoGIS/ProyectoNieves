import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecursosService {
  private baseUrl = 'http://localhost:3000/api/recursos'; // Cambiar a la URL correcta si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener recursos de la última campaña
  getRecursosUltimaCampania(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ultima-campania`);
  }

  // Método para obtener recursos filtrados por título de campaña
  getRecursosPorCampania(tituloCampana: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filtrar`, {
      params: { tituloCampana },
    });
  }

    // Método para eliminar un recurso
  eliminarRecurso(idRecurso: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar`, {
      body: { id_recurso: idRecurso },
    });
  }

    // Método para insertar un nuevo recurso
    insertarRecurso(recurso:any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/insertar`, recurso);
    }

      // Método para editar un recurso
  editarRecurso(id_recurso: string, datos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id_recurso}`, datos);  // Aquí pasamos el id_recurso como parte de la URL
  }
}
