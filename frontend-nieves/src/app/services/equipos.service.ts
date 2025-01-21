import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // <-- Usaremos `of` ya que no hay backend

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  
  constructor() {}

  insertEquipo(nuevoEquipo: any): Observable<any> {
    console.log('Equipo insertado:', nuevoEquipo);
    return of(nuevoEquipo); // Simula una respuesta del servidor
  }
}

