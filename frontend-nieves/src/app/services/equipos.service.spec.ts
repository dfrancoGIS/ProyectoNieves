import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private equipos: Equipo[] = [];

  insertEquipo(nuevoEquipo: Partial<Equipo>): Observable<Equipo> {
    const equipoCompleto: Equipo = { IDEQUIPO: Date.now(), ...nuevoEquipo } as Equipo;
    this.equipos.push(equipoCompleto);
    return of(equipoCompleto);
  }
}
