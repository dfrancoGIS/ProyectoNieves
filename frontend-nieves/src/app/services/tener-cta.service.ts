import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TenerCtaService {
  private baseUrl = 'http://localhost:3000/api/tener-cta';

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de `tener_cta`
  getTenerCtaUltimaCampania(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

    // ✅ Método para obtener los datos de `tener_cta` filtrados por campaña
  getTenerCtaPorCampania(tituloCampania: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filtrar`, {
      params: { tituloCampania }
    });
  }

  // Método para eliminar un registro de 'tener_cta'
  eliminarTenerCta(v_id_tener_cta: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${v_id_tener_cta}`);
  }
  // Método para añadir un nuevo registro de tener_cta
  insertarTenerCta(cta: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/insertar`, cta);
  }

  // Método para editar un registro de tener_cta
  editarTenerCta(id_tener_cta: string, datos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id_tener_cta}`, datos);
  }

}
