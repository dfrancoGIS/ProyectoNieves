import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  // 🛠 Datos mock para inicializar equipos
  private equiposMock = [
    { id: 1, equipo: "Equipo Alpha", carretera: "N-622", recurso: "Recurso 1", responsable: true, vehiculo: "Camión 1", estado: "pendiente", nombre: "Equipo Alpha", extension: "101", telefono1: "123456789", telefono2: "987654321", ocupacion: "Operario", departamento: "Vialidad" },
    { id: 2, equipo: "Equipo Beta", carretera: "N-1", recurso: "Recurso 2", responsable: false, vehiculo: "Excavadora", estado: "activo", nombre: "Equipo Beta", extension: "102", telefono1: "111111111", telefono2: "222222222", ocupacion: "Supervisor", departamento: "Infraestructura" }
  ];
  

  private equiposSource = new BehaviorSubject<any[]>(this.equiposMock); // ✅ Iniciar con datos de prueba
  equipos$ = this.equiposSource.asObservable();

  constructor() {}

  insertEquipo(nuevoEquipo: any): Observable<any> {
    const equiposActuales = this.equiposSource.getValue();
    const equipoConEstado = { ...nuevoEquipo, estado: 'pendiente' };
    const nuevosEquipos = [...equiposActuales, equipoConEstado];

    this.equiposSource.next(nuevosEquipos);
    return of(nuevoEquipo);
  }

  updateEquipo(equipoActualizado: any): Observable<any> {
    const equiposActuales = this.equiposSource.getValue();
    const equiposModificados = equiposActuales.map(e =>
      e.id === equipoActualizado.id ? equipoActualizado : e
    );

    this.equiposSource.next(equiposModificados);
    return of(equipoActualizado);
  }

  deleteEquipo(equipoId: any): Observable<any> { // ✅ Se agregó esta función
    const equiposActuales = this.equiposSource.getValue();
    const equiposFiltrados = equiposActuales.filter(e => e.id !== equipoId);

    this.equiposSource.next(equiposFiltrados);
    console.log(`Equipo con ID ${equipoId} eliminado.`);
    return of(equipoId);
  }
}
