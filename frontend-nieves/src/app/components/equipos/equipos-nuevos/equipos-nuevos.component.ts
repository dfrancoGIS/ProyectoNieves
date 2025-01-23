import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // <-- IMPORTA MatDialog
import { NuevoEquipoDialogComponent } from 'src/app/dialogs/nuevo-equipo-dialog/nuevo-equipo-dialog.component';

@Component({
  selector: 'app-equipos-nuevos',
  templateUrl: './equipos-nuevos.component.html',
  styleUrls: ['./equipos-nuevos.component.scss']
})
export class EquiposNuevosComponent implements AfterViewInit, OnInit {

  selectedHistory: string = '';  // Selección del histórico de equipos
  historyOptions: string[] = ['Histórico 1', 'Histórico 2', 'Histórico 3']; // Opciones del histórico

  selectedResource: string = '';  // Selección del recurso
  resourceOptions: string[] = ['Recurso 1', 'Recurso 2', 'Recurso 3']; // Opciones de recursos

  input!: HTMLInputElement; 

  showChild: boolean = false;
  selectedTeam: string = '';
  displayedTeams: string[] = ['Equipo 1', 'Equipo 2', 'Equipo 3'];
  seguimiento: boolean = false;
  dataSource!: MatTableDataSource<any>;
  color: string = '#BDBDBD';

  columns = [
    { columnDef: 'nombre', header: 'Nombre y apellidos', cell: (element: any) => `${element.nombre}` },
    { columnDef: 'extension', header: 'Extensión', cell: (element: any) => `${element.extension}` },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (element: any) => `${element.telefono1}` },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (element: any) => element.telefono2 || '-' },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (element: any) => `${element.ocupacion}` },
    { columnDef: 'departamento', header: 'Departamento', cell: (element: any) => `${element.departamento}` }
  ];

  displayedColumns: string[] = [...this.columns.map(c => c.columnDef), 'action1', 'action2', 'action3'];
  listaEquipos: any[] = [
    { nombre: 'Ángel López Martinez', extension: '15111', telefono1: '628141559', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' },
    { nombre: 'Ander Insagube Perez', extension: '', telefono1: '', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' }
  ];

  clickedRows = new Set<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {} // <-- INYECTA MatDialog

  ngOnInit() {
    this.cargarEquipos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarEquipos() {
    this.dataSource = new MatTableDataSource(this.listaEquipos);
  }

  changeCheckboxState(event: any) {
    this.seguimiento = event.checked;
    console.log('Seguimiento:', this.seguimiento);
  }

  nuevoEquipo() {
    this.dialog.open(NuevoEquipoDialogComponent, { 
      width: '600px'
    });
  }

  busquedaEquipo() {
    console.log('Buscar equipo');
  }

  viewEquipo(row: any) {
    console.log('Ver equipo:', row);
  }

  editarEquipo(row: any) {
    console.log('Editar equipo:', row);
  }

  bajaEquipo(row: any) {
    console.log('Dar de baja equipo:', row);
  }

  highlightRow(row: any) {
    this.clickedRows.clear();
    this.clickedRows.add(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  newSelectedTeam() {
    console.log('Equipo seleccionado:', this.selectedTeam);
  }

  generateExcel() {
    console.log('Descargar Excel');
  }
}
