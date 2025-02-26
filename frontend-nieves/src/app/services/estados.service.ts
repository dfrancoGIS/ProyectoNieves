import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadosService {
  private apiUrl = 'http://localhost:3000/api/estados'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener todos los estados
  getEstados(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para eliminar un estado
  eliminarEstado(id_estado: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id_estado}`);
  }

      // Método para insertar un nuevo estado
  insertarEstado(estado:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insertar`, estado); // Envía los datos al backend
  }

    // Método para editar un estado
  editarEstado(id_estado: string, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id_estado}`, datos);  // Aquí pasamos el id_estado como parte de la URL
  }
  }

