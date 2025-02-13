import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-comunicaciones',
  templateUrl: './comunicaciones.component.html',
  styleUrls: ['./comunicaciones.component.scss']
})
export class ComunicacionesComponent implements AfterViewInit, OnInit {
  showChild: boolean = false;
  selectedTeam: string = '';
  displayedTeams: string[] = [];
  selectedHistory: string = '';
  historyOptions: string[] = ['Hoy', 'Semana', 'Mes'];
  equiposCarreteras: any[] = [];
  comunicaciones: any[] = [];

  // 🔹 Definición de columnas para la tabla
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

  // 🔹 Control de modos (Alta, Edición, Confirmación)
  modoAlta: boolean = false;
  modoEdicion: boolean = false;
  nuevaComunicacion: any = this.resetFormulario();

  constructor(
    private equiposService: EquiposService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Cargar equipos dados de alta
    this.equiposService.equipos$.subscribe((equipos: any[]) => {
      this.equiposCarreteras = equipos;
      this.displayedTeams = equipos.map(e => e.equipo);
      this.dataSource.data = [...equipos];
      this.cd.detectChanges();
    });

    // Cargar comunicaciones almacenadas en el servicio
    this.equiposService.comunicaciones$.subscribe((comunicaciones: any[]) => {
      this.comunicaciones = comunicaciones;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // 🔹 Iniciar una nueva comunicación
  iniciarAltaComunicacion() {
    if (!this.selectedTeam) {
      alert('Seleccione un equipo para asociar la comunicación.');
      return;
    }
    this.modoAlta = true;
    this.modoEdicion = false;
    this.nuevaComunicacion = { ...this.resetFormulario(), equipoId: this.selectedTeam };
  }

  // 🔹 Iniciar edición de una comunicación existente
  iniciarEdicionComunicacion(comunicacion: any) {
    this.modoEdicion = true;
    this.modoAlta = false;
    this.nuevaComunicacion = { ...comunicacion };
  }

  // 🔹 Confirmar acción (Alta o Edición)
  confirmarAccion() {
    if (this.modoAlta) {
      this.guardarComunicacion();
    } else if (this.modoEdicion) {
      this.guardarEdicion();
    }
  }

  // 🔹 Guardar una nueva comunicación
  guardarComunicacion() {
    this.equiposService.insertComunicacion(this.nuevaComunicacion).subscribe(() => {
      this.modoAlta = false;
      this.nuevaComunicacion = this.resetFormulario();
    });
  }

  // 🔹 Guardar cambios en una comunicación editada
  guardarEdicion() {
    this.equiposService.updateComunicacion(this.nuevaComunicacion).subscribe(() => {
      this.modoEdicion = false;
      this.nuevaComunicacion = this.resetFormulario();
    });
  }

  // 🔹 Cancelar la acción y volver a la vista normal
  cancelarAccion() {
    this.modoAlta = false;
    this.modoEdicion = false;
    this.nuevaComunicacion = this.resetFormulario();
  }

  // 🔹 Eliminar una comunicación con confirmación
  borrarComunicacion(comunicacion: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { mensaje: '¿Está seguro de que desea eliminar esta comunicación?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.equiposService.deleteComunicacion(comunicacion.id).subscribe();
      }
    });
  }

  // 🔹 Reiniciar formulario
  resetFormulario() {
    return {
      fecha: '',
      equipoId: '',
      descripcion: ''
    };
  }
}
