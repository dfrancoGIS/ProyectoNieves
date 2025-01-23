import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cuadrillas',
  templateUrl: './cuadrillas.component.html',
  styleUrls: ['./cuadrillas.component.scss']
})
export class CuadrillasComponent implements AfterViewInit, OnInit {
  selectedEquipo: string = '';
  selectedCarretera: any = null; // Nueva variable para almacenar la carretera seleccionada

  turnos: any[] = [];
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
    { nombre: 'Añana 0', cuadrilla: 'Añana', localidad: 'Villanueva', responsable: true, nombreContacto: '', tfno1: '', tfno2: '', vehiculo: '' },
    { nombre: 'Ayala 1', cuadrilla: 'Ayala', localidad: 'Llodio', responsable: false, nombreContacto: '', tfno1: '', tfno2: '', vehiculo: '' }
  ];

  equipoActual = this.equiposDisponibles[0];

  displayedColumns: string[] = ['fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'observaciones'];

  listaTurnos = [
    { fechaInicio: '15/10/2009', horaInicio: '09:09', fechaFin: '', horaFin: '', observaciones: '' }
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.listaTurnos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  seleccionarEquipo(equipo: any) {
    this.equipoActual = equipo;
    console.log('Equipo seleccionado:', equipo);
  }

  seleccionarCarretera(carretera: any) {
    this.selectedCarretera = carretera;
    console.log('Carretera seleccionada:', carretera);
  }

  agregarCarretera() {
    console.log('Agregar nueva carretera');
  }

  editarCarretera() {
    if (this.selectedCarretera) {
      console.log('Editar carretera:', this.selectedCarretera);
    } else {
      console.warn('No se ha seleccionado una carretera para editar.');
    }
  }

  eliminarCarretera() {
    if (this.selectedCarretera) {
      console.log('Eliminar carretera:', this.selectedCarretera);
      this.carreteras = this.carreteras.filter(c => c !== this.selectedCarretera);
      this.selectedCarretera = null;
    } else {
      console.warn('No se ha seleccionado una carretera para eliminar.');
    }
  }
}
