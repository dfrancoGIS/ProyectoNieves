import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private apiUrl = 'http://localhost:3000/api/personal'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de personal
  getPersonal(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //  Método para obtener personal filtrado por título de campaña
  getPersonalPorCampania(tituloCampana: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filtrar`, {
      params: { tituloCampana }
    });
  }

    // Método para eliminar un registro de personal
  eliminarPersonal(idPersonal: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar`, {
      body: { id_personal: idPersonal }, // Enviar el ID en el cuerpo de la solicitud
    });
  }

    // Método para insertar un nuevo personal
  insertarPersonal(personal: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertar`, personal);  // Asegúrate de que la URL del backend sea la correcta
  }

// Método para editar el personal (servicio)
editarPersonal(id_personal: number, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/editar/${id_personal}`, datos); // Aquí pasamos el id_personal como parte de la URL
}

  }

