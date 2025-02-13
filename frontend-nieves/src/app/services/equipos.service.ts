import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private baseUrl = 'http://localhost:3000/api'; // URL base del backend

  private equiposMock = [
    { id: 1, equipo: "Equipo Alpha", carretera: "N-622", recurso: "Recurso 1", responsable: true, vehiculo: "Camión 1", estado: "pendiente", nombre: "Equipo Alpha", extension: "101", telefono1: "123456789", telefono2: "987654321", ocupacion: "Operario", departamento: "Vialidad" },
    { id: 2, equipo: "Equipo Beta", carretera: "N-1", recurso: "Recurso 2", responsable: false, vehiculo: "Excavadora", estado: "activo", nombre: "Equipo Beta", extension: "102", telefono1: "111111111", telefono2: "222222222", ocupacion: "Supervisor", departamento: "Infraestructura" }
  ];

  private comunicacionesMock: any[] = []; // 🔹 Nuevo almacenamiento de comunicaciones

  private equiposSource = new BehaviorSubject<any[]>(this.equiposMock);
  equipos$ = this.equiposSource.asObservable();

  private comunicacionesSource = new BehaviorSubject<any[]>(this.comunicacionesMock);
  comunicaciones$ = this.comunicacionesSource.asObservable();

  constructor(private http: HttpClient) {}

  // 🔹 Métodos para recursos y vehículos desde el backend
  getRecursos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recursos`);
  }

  getVehiculos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vehiculos`);
  }

  getZonas() {
    return this.http.get(`${this.baseUrl}/zonas`); // Cambia la URL según tu API
  }
  

  // Métodos existentes para equipos
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

  deleteEquipo(equipoId: any): Observable<any> {
    const equiposActuales = this.equiposSource.getValue();
    const equiposFiltrados = equiposActuales.filter(e => e.id !== equipoId);

    // 🔹 Eliminar también las comunicaciones asociadas a este equipo
    const comunicacionesActuales = this.comunicacionesSource.getValue();
    const comunicacionesFiltradas = comunicacionesActuales.filter(c => c.equipoId !== equipoId);
    this.comunicacionesSource.next(comunicacionesFiltradas);

    this.equiposSource.next(equiposFiltrados);
    console.log(`Equipo con ID ${equipoId} eliminado.`);
    return of(equipoId);
  }

  // 🔹 Métodos para comunicaciones
  insertComunicacion(nuevaComunicacion: any): Observable<any> {
    const comunicacionesActuales = this.comunicacionesSource.getValue();
    const nuevasComunicaciones = [...comunicacionesActuales, nuevaComunicacion];

    this.comunicacionesSource.next(nuevasComunicaciones);
    return of(nuevaComunicacion);
  }

  updateComunicacion(comunicacionActualizada: any): Observable<any> {
    const comunicacionesActuales = this.comunicacionesSource.getValue();
    const comunicacionesModificadas = comunicacionesActuales.map(c =>
      c.id === comunicacionActualizada.id ? comunicacionActualizada : c
    );

    this.comunicacionesSource.next(comunicacionesModificadas);
    return of(comunicacionActualizada);
  }

  deleteComunicacion(comunicacionId: any): Observable<any> {
    const comunicacionesActuales = this.comunicacionesSource.getValue();
    const comunicacionesFiltradas = comunicacionesActuales.filter(c => c.id !== comunicacionId);

    this.comunicacionesSource.next(comunicacionesFiltradas);
    return of(comunicacionId);
  }
}
