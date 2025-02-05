import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-comunicaciones',
  templateUrl: './comunicaciones.component.html',
  styleUrls: ['./comunicaciones.component.scss']
})
export class ComunicacionesComponent implements AfterViewInit, OnInit {
  showChild: boolean = false; // Evitar error en el HTML
  selectedTeam: string = '';
  displayedTeams: string[] = [];
  selectedHistory: string = '';
  historyOptions: string[] = ['Hoy', 'Semana', 'Mes'];
  equiposCarreteras: any[] = [];

  // Definición de columnas para la tabla
  columns = [
    { columnDef: 'nombre', header: 'Nombre', cell: (element: any) => element.nombre || '-' },
    { columnDef: 'extension', header: 'Extensión', cell: (element: any) => element.extension || '-' },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (element: any) => element.telefono1 || '-' },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (element: any) => element.telefono2 || '-' },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (element: any) => element.ocupacion || '-' },
    { columnDef: 'departamento', header: 'Departamento', cell: (element: any) => element.departamento || '-' }
  ];

  displayedColumns: string[] = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private equiposService: EquiposService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Evitar que la tabla esté vacía antes de recibir datos
    this.dataSource = new MatTableDataSource<any>([]);
    
    this.equiposService.equipos$.subscribe((equipos: any[]) => {
      this.equiposCarreteras = equipos;
      this.displayedTeams = equipos.map(equipo => equipo.equipo);

      // Forzar detección de cambios para evitar renderizado incorrecto
      setTimeout(() => {
        this.dataSource.data = [...equipos];
        this.cd.detectChanges();
      }, 0);
    });
  }

  ngAfterViewInit() {
    // Evitar errores de paginator antes de asignarlo
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  nuevaComunicacion() {
    console.log('Nueva comunicación creada');
  }

  editarComunicacion() {
    console.log('Editar comunicación');
  }

  borrarComunicacion() {
    console.log('Eliminar comunicación');
  }
}

