import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carretera } from '../interfaces/carretera'; // Asegúrate de que el tipo Carretera esté bien definido

@Injectable({
  providedIn: 'root'
})
export class CarreterasService {
  private baseUrl = 'http://localhost:3000/api/carreteras'; // URL base para el endpoint de carreteras
  private estadosUrl = 'http://localhost:3000/api/estados'; // URL para obtener los estados

  constructor(private http: HttpClient) {}

  // Método para obtener todos los estados
  getEstados(): Observable<any> {
    return this.http.get<any>(this.estadosUrl);
  }

  // Método para obtener todas las carreteras
  getCarreteras(): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}`);
  }

// Método para obtener carreteras de la última campaña
getCarreterasUltimaCampania(): Observable<{ data: Carretera[] }> {
  return this.http.get<{ data: Carretera[] }>(`${this.baseUrl}/ultima-campania`);
}

  // Método para obtener carreteras filtradas por título de campaña
  getCarreterasPorCampania(tituloCampana: string): Observable<{ data: Carretera[] }> {
    return this.http.get<{ data: Carretera[] }>(`${this.baseUrl}/filtrar`, {
      params: { tituloCampana }
    });
  }

  // Método para obtener las carreteras por prioridad
  getCarreterasPorPrioridad(prioridad: number): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}/prioridad/${prioridad}`);
  }

  // Método para obtener las carreteras por nombre
  getCarreterasPorNombre(nombre: string): Observable<Carretera[]> {
    return this.http.get<Carretera[]>(`${this.baseUrl}/nombre/${nombre}`);
  }

  // Método para actualizar el estado de una carretera
  actualizarEstadoCarretera(id: number, nuevoEstado: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar-estado`, {
      id_carretera: id,
      nuevo_estado: nuevoEstado
    });
  }

    // Método para eliminar una carretera
  eliminarCarretera(idCarretera: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/eliminar`, {
      body: { id_carretera: idCarretera }, // Enviar ID en el body
    });
  }

    // Método para insertar una nueva carretera
    insertarCarretera(carretera: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/insertar`, carretera); // Solicitud POST al backend
    }

    // Método para editar la carretera (servicio)
editarCarretera(id_carretera: number, datos: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/editar/${id_carretera}`, datos);  // Aquí pasamos el id_carretera como parte de la URL
}

}
