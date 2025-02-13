import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposService } from '../../../services/equipos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms'; // Para el filtro en selectores
import { ConfirmDialogComponent } from '../../../dialogs/confirm-dialog/confirm-dialog.component';
import { PersonalService } from '../../../services/personal.service';
import { HistorialEquiposService } from '../../../services/historial-equipos.service';

@Component({
  selector: 'app-equipos-nuevos',
  templateUrl: './equipos-nuevos.component.html',
  styleUrls: ['./equipos-nuevos.component.scss']
})
export class EquiposNuevosComponent implements OnInit, OnDestroy {
  equiposCarreteras: any[] = [];
  zonas: any[] = [];
  displayedTeams: string[] = [];
  dataSource = new MatTableDataSource<any>([]); // Tabla inicialmente vacía
  selectedTeam: string = '';
  displayedColumns: string[] = ['nombre', 'extension', 'telefono1', 'telefono2', 'ocupacion', 'departamento'];
  personalData: any[] = [];
  filtroNombres = new FormControl('');
  personalFiltrado: any[] = [];
  historialEquipos: any[] = [];  // Para almacenar el historial de equipos
  selectedEquipo: any = null;
  filtroEquipos = new FormControl(''); // Control de filtro para los equipos
  historialEquiposFiltrados: any[] = []; // Equipos filtrados para el desplegable

  

  // 🔹 Control de modos
  modoAlta: boolean = false;
  modoEdicion: boolean = false;

  nuevoEquipo = {
    equipo: '',
    carretera: '',
    recurso: '',
    responsable: false,
    vehiculo: '',
    estado: 'pendiente',
    zonaInicio: '',
    fechaInicio: '',
    horaInicio: '',
    fechaFin: '',
    horaFin: ''
  };

  // 🔹 Gestión de recursos y vehículos
  recursos: any[] = [];
  recursosFiltrados: any[] = [];
  filtroRecursos = new FormControl('');

  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = [];
  filtroVehiculos = new FormControl('');

  constructor(
    private renderer: Renderer2,
    private equiposService: EquiposService,
    public dialog: MatDialog,
    private personalService: PersonalService,
    private historialEquiposService: HistorialEquiposService
  ) {}

  ngOnInit() {
    // Cargar personal para usarlo en la tabla
    this.cargarPersonal();

    // Inicializar recursos y vehículos desde el backend
    this.cargarRecursos();
    this.cargarVehiculos();

    this.obtenerHistorialEquipos();

    // Filtrar recursos en tiempo real
    this.filtroRecursos.valueChanges.subscribe({
      next: (value) => {
        this.recursosFiltrados = this.recursos.filter((recurso) =>
          recurso.recurso.toLowerCase().includes(value?.toLowerCase() || '')
        );
      },
      error: (err) => console.error('Error en filtro de recursos:', err),
    });

    // Filtrar vehículos en tiempo real
    this.filtroVehiculos.valueChanges.subscribe((value) => {
      this.vehiculosFiltrados = value?.trim()
        ? this.vehiculos.filter((vehiculo) =>
            vehiculo.vehiculo_descripcion.toLowerCase().includes(value.toLowerCase())
          )
        : [...this.vehiculos];
    });
        // Configurar filtro de nombres
        this.filtroNombres.valueChanges.subscribe((value) => {
          this.personalFiltrado = value?.trim()
              ? this.personalData.filter((personal) =>
                  personal.nombre.toLowerCase().includes(value.toLowerCase())
                )
              : [...this.personalData];
      });

      this.equiposService.getZonas().subscribe({
        next: (response: any) => {
          if (response && response.data) {
            this.zonas = response.data;

          }
        },
        error: (err) => {
          console.error('Error al cargar las zonas:', err);
        }
      });
      this.filtroEquipos.valueChanges.subscribe({
        next: (value) => {
          this.historialEquiposFiltrados = this.historialEquipos.filter((equipo) =>
            equipo.recurso_equipo.toLowerCase().includes(value?.toLowerCase() || '')
          );
        },
        error: (err) => console.error('Error en filtro de equipos:', err),
      });
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'transform');
    this.renderer.removeStyle(document.body, 'transform-origin');
    this.renderer.removeStyle(document.body, 'width');
    this.renderer.removeStyle(document.body, 'height');
    this.renderer.removeStyle(document.documentElement, 'overflow');
  }

  cargarRecursos() {
    this.equiposService.getRecursos().subscribe({
      next: (response: any) => {
        this.recursos = Array.isArray(response.data) ? response.data : [];
        this.recursosFiltrados = [...this.recursos];
      },
      error: (err) => {
        console.error('Error al cargar recursos:', err);
        this.recursos = [];
        this.recursosFiltrados = [];
      },
    });
  }

  cargarVehiculos() {
    this.equiposService.getVehiculos().subscribe({
      next: (response: any) => {
        this.vehiculos = Array.isArray(response.data) ? response.data : [];
        this.vehiculosFiltrados = [...this.vehiculos];
      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
        this.vehiculos = [];
        this.vehiculosFiltrados = [];
      },
    });
  }

  cargarPersonal(): void {
    this.personalService.getPersonal().subscribe({
        next: (response: any) => {
            this.personalData = response.data || [];
            this.personalFiltrado = [...this.personalData]; // Inicializa personalFiltrado
        },
        error: (err) => {
            console.error('Error al cargar personal:', err);
        },
    });
}

  // 🔹 Iniciar alta de equipo
  iniciarAltaEquipo(): void {
    this.modoAlta = true;
    this.modoEdicion = false;

    // Añadimos una fila vacía para que el usuario pueda insertar datos
    this.dataSource.data = [
      {
        nombre: '',
        extension: '',
        telefono1: '',
        telefono2: '',
        ocupacion: '',
        departamento: '',
      },
    ];
  }

  confirmarAccion() {
    if (this.modoAlta) {
      this.agregarEquipo();
    } else if (this.modoEdicion) {
      this.guardarEdicion();
    }
  }

  agregarEquipo(): void {
    const equipoValido = this.dataSource.data[0];

    if (!equipoValido.nombre || !equipoValido.extension || !equipoValido.telefono1) {
      alert('Por favor, completa todos los campos antes de agregar.');
      return;
    }

    console.log('Nuevo equipo agregado:', equipoValido);
    this.modoAlta = false;
    this.dataSource.data = []; // Dejamos la tabla lista para nuevos datos
  }

  cancelarAccion() {
    this.resetFormulario();
    this.modoAlta = false;
    this.modoEdicion = false;
    this.dataSource.data = []; // Vaciar la tabla
  }

  resetFormulario() {
    this.nuevoEquipo = {
      equipo: '',
      carretera: '',
      recurso: '',
      responsable: false,
      vehiculo: '',
      estado: 'pendiente',
      zonaInicio: '',
      fechaInicio: '',
      horaInicio: '',
      fechaFin: '',
      horaFin: ''
    };
  }

  guardarEdicion() {
    if (!this.selectedTeam) return;

    const equipoIndex = this.dataSource.data.findIndex((e) => e.equipo === this.selectedTeam);
    if (equipoIndex === -1) return;

    const equipoActualizado = { ...this.nuevoEquipo };
    this.equiposService.updateEquipo(equipoActualizado).subscribe(() => {
      this.dataSource.data[equipoIndex] = equipoActualizado;
      this.dataSource._updateChangeSubscription();
    });

    this.cancelarAccion();
  }

  iniciarEdicionRegistro() {
    if (!this.selectedTeam) return;

    const equipo = this.dataSource.data.find((e) => e.equipo === this.selectedTeam);
    if (!equipo) return;

    this.nuevoEquipo = { ...equipo };
    this.modoEdicion = true;
    this.modoAlta = false;
  }

  eliminarRegistro() {
    if (!this.selectedTeam) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        mensaje: '¿Está seguro de que desea eliminar este equipo? Esta acción no se puede deshacer.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const equipoId = this.dataSource.data.find((e) => e.equipo === this.selectedTeam)?.id;
        if (!equipoId) return;

        this.equiposService.deleteEquipo(equipoId).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter((e) => e.id !== equipoId);
          this.dataSource._updateChangeSubscription();
          alert('Equipo eliminado correctamente.');
        });
      }
    });
  }

  onRecursoSeleccionado(recursoSeleccionado: string): void {
    const vehiculoAsociado = this.vehiculos.find(
      (vehiculo) => vehiculo.recurso_vehiculo === recursoSeleccionado
    );

    if (vehiculoAsociado) {
      this.nuevoEquipo.vehiculo = vehiculoAsociado.vehiculo_matricula;
    } else {
      this.nuevoEquipo.vehiculo = '';
    }
  }

  onPersonalSeleccionado(row: any, personal: any): void {
    // Actualizar los campos de la fila seleccionada
    row.extension = personal.extension;
    row.telefono1 = personal.telefono1;
    row.telefono2 = personal.telefono2;
    row.ocupacion = personal.ocupacion;
    row.departamento = personal.departamento;

    // Validar si es necesario agregar una nueva fila vacía
    this.validarFilas();
  }

  validarFilas(): void {
    // Si todas las filas tienen datos completos, agregar una nueva fila vacía
    const filaIncompleta = this.dataSource.data.some(
      (registro) => !registro.nombre || !registro.extension || !registro.telefono1
    );

    if (!filaIncompleta) {
      this.agregarFilaVacia();
    }
  }

  agregarFilaVacia(): void {
    this.dataSource.data = [
      ...this.dataSource.data,
      {
        nombre: '',
        extension: '',
        telefono1: '',
        telefono2: '',
        ocupacion: '',
        departamento: ''
      }
    ];
  }
  obtenerHistorialEquipos(): void {
    this.historialEquiposService.getHistorialEquipos().subscribe(
      (response) => {
        this.historialEquipos = response.data || [];  // Asegúrate de que esta respuesta sea la correcta
        this.historialEquiposFiltrados = [...this.historialEquipos]; // Llenamos los equipos filtrados
      },
      (error) => {
        console.error('Error al obtener historial de equipos:', error);
      }
    );
  }

  // Método para seleccionar el equipo y actualizar los campos
  onEquipoSeleccionado(equipo: any): void {
    this.selectedEquipo = equipo; // Establece el equipo seleccionado
    this.actualizarCamposEquipo();  // Llama a la función para actualizar los campos
  }
  
  actualizarCamposEquipo(): void {
    if (this.selectedEquipo) {
      this.nuevoEquipo.recurso = this.selectedEquipo.recurso_equipo;
      this.nuevoEquipo.fechaInicio = this.selectedEquipo.fecha_inicio;
      this.nuevoEquipo.horaInicio = this.selectedEquipo.hora_inicio;
      this.nuevoEquipo.fechaFin = this.selectedEquipo.fecha_fin;
      this.nuevoEquipo.horaFin = this.selectedEquipo.hora_fin;
      this.nuevoEquipo.zonaInicio = this.selectedEquipo.zona_inicio;
      this.nuevoEquipo.vehiculo = this.selectedEquipo.descripcion_vehiculo;
      this.nuevoEquipo.responsable = this.selectedEquipo.responsable;
      this.dataSource.data = this.selectedEquipo.personal || [];
    }
  }
  
}
  


