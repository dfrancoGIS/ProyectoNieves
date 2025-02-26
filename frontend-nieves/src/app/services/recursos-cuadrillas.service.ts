import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosCuadrillasService {

  private baseUrl = 'http://localhost:3000/api/recursosCuadrillas'; // Cambiar a la URL correcta si es necesario

  constructor(private http: HttpClient) {}

    // Método para obtener recursos de la última campaña
    getRecursosCuadrillas(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}`);
    }


}
