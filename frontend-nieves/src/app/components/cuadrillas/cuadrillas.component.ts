import { Component } from '@angular/core';

@Component({
  selector: 'app-cuadrillas',
  templateUrl: './cuadrillas.component.html',
  styleUrls: ['./cuadrillas.component.scss']
})
export class CuadrillasComponent {
modoAlta: any;
modoEdicion: any;
iniciarAltaTurno() {
throw new Error('Method not implemented.');
}
cancelarAccion() {
throw new Error('Method not implemented.');
}
confirmarAccion() {
throw new Error('Method not implemented.');
}
eliminarEquipo() {
throw new Error('Method not implemented.');
}
iniciarEdicionEquipo() {
throw new Error('Method not implemented.');
}
iniciarAltaEquipo() {
throw new Error('Method not implemented.');
}
  selectedEquipo: any = null;
  selectedCarretera: any = null;
  selectedTurno: any = null;
  expandedRow: any = null; // Para manejar la fila expandida

  carreteras: any[] = [
    { nombre: 'A-2622 cruce con A-2625 en Angosto - Bóveda a límite con Burgos' },
    { nombre: 'A-3320 Vilañañe a Caranca' }
  ];

  cuadrillas = [
    { nombre: 'Añana', equipos: [{ nombre: 'Añana 0', activo: true }, { nombre: 'Añana 1', activo: false }] },
    { nombre: 'Ayala', equipos: [{ nombre: 'Ayala 0', activo: true }, { nombre: 'Ayala 1', activo: false }] },
    { nombre: 'Zuia', equipos: [{ nombre: 'Zuia 0', activo: true }, { nombre: 'Zuia 1', activo: false }] }
  ];

  equiposDisponibles = [
    { nombre: 'Añana 0', cuadrilla: 'Añana', localidad: 'Villanueva', responsable: true, nombreContacto: '', tfno1: '', tfno2: '', tfno3: '', vehiculo: '' },
    { nombre: 'Ayala 1', cuadrilla: 'Ayala', localidad: 'Llodio', responsable: false, nombreContacto: '', tfno1: '', tfno2: '', tfno3: '', vehiculo: '' }
  ];

  equipoActual = this.equiposDisponibles[0];

  // 📌 Propiedad para la tabla de turnos
  turnos = [
    { fechaInicio: '15/10/2009', horaInicio: '09:09', fechaFin: '', horaFin: '', observaciones: '' }
  ];

  // 📌 Columnas de la tabla
  displayedColumns: string[] = ['expand', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'observaciones', 'acciones'];

  /**
   * 📌 Método para seleccionar un equipo.
   */
  seleccionarEquipo(equipo: any) {
    this.equipoActual = equipo;
    console.log('Equipo seleccionado:', equipo);
  }

  /**
   * 📌 Método para alternar la expansión de una fila en la tabla.
   */
  toggleRow(row: any) {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  /**
   * 📌 Método para visualizar la información de una carretera seleccionada.
   */
  visualizarCarretera() {
    if (this.selectedCarretera) {
      console.log('Visualizando carretera:', this.selectedCarretera);
    } else {
      console.warn('No hay carretera seleccionada para visualizar.');
    }
  }

  /**
   * 📌 Método para agregar una nueva carretera.
   */
  agregarCarretera() {
    const nuevaCarretera = { nombre: 'Nueva carretera' };
    this.carreteras.push(nuevaCarretera);
    console.log('Carretera agregada:', nuevaCarretera);
  }

  /**
   * 📌 Método para eliminar una carretera seleccionada.
   */
  eliminarCarretera() {
    if (this.selectedCarretera) {
      console.log('Eliminando carretera:', this.selectedCarretera);
      this.carreteras = this.carreteras.filter(c => c !== this.selectedCarretera);
      this.selectedCarretera = null;
    } else {
      console.warn('No se ha seleccionado una carretera para eliminar.');
    }
  }

  /**
   * 📌 Método para agregar un nuevo turno.
   */
  agregarTurno() {
    const nuevoTurno = { fechaInicio: 'Nueva Fecha', horaInicio: '00:00', fechaFin: '', horaFin: '', observaciones: '' };
    this.turnos.push(nuevoTurno);
    console.log('Turno agregado:', nuevoTurno);
  }

  /**
   * 📌 Método para editar un turno seleccionado.
   */
  editarTurno(turno: any) {
    console.log('Editando turno:', turno);
    // Aquí puedes abrir un modal o realizar cambios sobre el turno seleccionado
  }

  /**
   * 📌 Método para eliminar un turno seleccionado.
   */
  eliminarTurno(turno: any) {
    if (!turno) {
      console.warn('No se ha seleccionado ningún turno.');
      return;
    }
    this.turnos = this.turnos.filter(t => t !== turno);
    console.log('Turno eliminado:', turno);
  }
}