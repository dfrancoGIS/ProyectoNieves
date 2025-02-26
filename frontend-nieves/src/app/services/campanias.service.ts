import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CampaniasService {
  private baseUrl = 'http://localhost:3000/api/campanias';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todas las campañas
  getCampanias(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      catchError((error) => {
        console.error('❌ Error al obtener campañas:', error);
        return throwError(() => new Error('Error al obtener campañas'));
      })
    );
  }

  // ✅ Obtener campañas filtradas por título de campaña
  getCampaniasFiltradas(tabla: string, tituloCampana: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/filtrar?tabla=${tabla}&tituloCampana=${encodeURIComponent(tituloCampana)}`).pipe(
      catchError((error) => {
        console.error('❌ Error al obtener campañas filtradas:', error);
        return throwError(() => new Error('Error al obtener campañas filtradas'));
      })
    );
  }

  // ✅ Eliminar una campaña por ID
  eliminarCampania(id_campania: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id_campania}`).pipe(
      catchError((error) => {
        console.error('❌ Error al eliminar campaña:', error);
        return throwError(() => new Error('Error al eliminar campaña'));
      })
    );
  }

  // ✅ Crear una nueva campaña con replicación de datos
  crearCampania(titulo: string, fechaInicio: string, fechaFinAnterior: string): Observable<any> {
    const body = { titulo, fechaInicio, fechaFinAnterior };
    return this.http.post<any>(`${this.baseUrl}/crear`, body).pipe(
      catchError((error) => {
        console.error('❌ Error al crear la campaña:', error);
        return throwError(() => new Error('Error al crear la campaña'));
      })
    );
  }
}
