import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-comunicaciones',
  templateUrl: './comunicaciones.component.html',
  styleUrls: ['./comunicaciones.component.scss']
})
export class ComunicacionesComponent implements AfterViewInit, OnInit {
borrarComunicacion() {
throw new Error('Method not implemented.');
}
nuevaComunicacion() {
throw new Error('Method not implemented.');
}
  showChild: boolean = false;
  selectedTeam: string = '';
  displayedTeams: string[] = ['COPO 1', 'COPO 2', 'COPO 3'];

  selectedHistory: string = '';
  historyOptions: string[] = ['Hoy', 'Semana', 'Mes'];

  color: string = '#BDBDBD';
  dataSource!: MatTableDataSource<any>;

  equiposCarreteras: { equipo: string, carretera: string }[][] = [
    [
      { equipo: 'COPO 13', carretera: 'N-622' },
      { equipo: 'COPO 29', carretera: 'N-1' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 30', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' }
    ],
    [
      { equipo: 'COPO 29', carretera: 'N-622' },
      { equipo: 'COPO 6', carretera: 'N-1 (IR...)' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 1', carretera: 'A-2620' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 24', carretera: 'A-126' }
    ]
  ];

  // Definición de columnas para la tabla (sin acciones)
  columns = [
    { columnDef: 'nombre', header: 'Nombre', cell: (element: any) => element.nombre },
    { columnDef: 'extension', header: 'Extensión', cell: (element: any) => element.extension },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (element: any) => element.telefono1 },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (element: any) => element.telefono2 || '-' },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (element: any) => element.ocupacion },
    { columnDef: 'departamento', header: 'Departamento', cell: (element: any) => element.departamento }
  ];

  displayedColumns: string[] = this.columns.map(c => c.columnDef); // Se eliminan las acciones

  listaComunicaciones: any[] = [
    { nombre: 'Ángel López', extension: '15111', telefono1: '628141559', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' },
    { nombre: 'Ander Insagube', extension: '', telefono1: '', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.listaComunicaciones);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
