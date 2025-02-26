import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private baseUrl = 'http://localhost:3000/api/tareas';

  constructor(private http: HttpClient) {}

  // Método para obtener las tareas de la última campaña
  getTareasUltimaCampania(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ultima-campania`);
  }

  //  Obtener tareas filtradas por título de campaña
  getTareasPorCampania(tituloCampana: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/filtrar`, {
      params: { tituloCampana }
    });
  }

  // Método para eliminar una tarea
  eliminarTarea(id_tarea: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar/${id_tarea}`);
  }

  // Método para insertar una tarea
  insertarTarea(tarea: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertar`, tarea);
  }

  // Método para editar una tarea
  editarTarea(id_tarea: string, datos: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${id_tarea}`, datos);  // Aquí pasamos el id_tarea como parte de la URL
  }

}
