import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {
  private apiUrl = 'http://localhost:3000/api/vehiculos';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los vehículos de la última campaña
  getVehiculosUltimaCampania(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ultima-campania`);
  }

  // Método para obtener vehículos filtrados por título de campaña
  getVehiculosPorCampania(tituloCampana: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/filtrar`, {
      params: { tituloCampana },
    });
  }

    // Método para eliminar un vehículo
  eliminarVehiculo(id_vehiculo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id_vehiculo}`);
  }
  
    // Método para insertar un nuevo vehículo
  insertarVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertar`, vehiculo);
  }
    // Método para editar un vehículo
  editarVehiculo(id_vehiculo: string, vehiculo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id_vehiculo}`, vehiculo);
  }
}
    

