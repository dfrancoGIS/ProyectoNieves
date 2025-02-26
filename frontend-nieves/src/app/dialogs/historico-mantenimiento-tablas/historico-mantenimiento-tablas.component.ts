import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PersonalService } from '../../services/personal.service';
import { VehiculosService } from '../../services/vehiculos.service';
import { EstadosService } from '../../services/estados.service';
import { CarreterasService } from '../../services/carreteras.service';
import { RecursosService } from '../../services/recursos.service';
import { TareasService } from '../../services/tareas.service';
import { CampaniasService } from '../../services/campanias.service';
import { EstadosComunicacionService } from '../../services/estados-comunicacion.service';
import { TenerCtaService } from 'src/app/services/tener-cta.service';
import { AddMatenimientoDialogComponent } from '../../dialogs/add-matenimiento-dialog/add-matenimiento-dialog.component';
import { EditMantenimientoDialogComponent } from '../../dialogs/edit-mantenimiento-dialog/edit-mantenimiento-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Personal } from 'src/app/interfaces/personal';


@Component({
  selector: 'app-historico-mantenimiento-tablas',
  templateUrl: './historico-mantenimiento-tablas.component.html',
  styleUrls: ['./historico-mantenimiento-tablas.component.scss']
})
export class HistoricoMantenimientoTablasComponent {

    tablasPermitidas = [
      'Personal',
      'Carreteras',
      'Recursos',
      'Vehículos',
      'Tareas',
      'Estados',
      'Campañas',
      'Estados Comunicación',
      'Tener CTA'
    ];
  
    tablaSeleccionada: string | null = null;
    displayedColumns: string[] = [];
    campanaSeleccionada: string | null = null;
    campanasDisponibles: string[] = []; // ✅ Añade las campañas disponibles
    dataSource = new MatTableDataSource<any>([]);
    registroSeleccionado: any | null = null;
  
    columnasAlias: { [key: string]: { [key: string]: string } } = {
  
      Personal:{
        id_personal: 'ID',
        nombre_personal: 'Nombre',
        apellido1_personal: 'Primer apellido',
        apellido2_personal: 'Segundo apellido',
        alias_personal: 'Alias',
        ocupacion_personal: 'Ocupación',
        tfno1_personal: 'Teléfono 1',
        tfno2_personal: 'Teléfono 2',
        ext_personal: 'Extensión',
        departamento_personal: 'Departamento',
        dfa_personal: 'DFA',
        activo: 'Activo',
        id_campania_personal: 'ID Campaña',
      },
      Carreteras:{
        id_carretera: 'ID',
        carretera: 'Carretera',
        direccion_carretera: 'Dirección Carretera',
        pk_inferior: 'PK Inferior',
        pk_superior: 'PK Superior',
        prioridad_carretera: 'Prioridad',
        zona_carretera: 'Zona Carretera',
        estado: 'Estado',
        id_campania_carreteras: 'ID Campaña',
        id_visor: 'ID Visor',
      },
      Recursos:{
        id_recurso: 'ID',
        empresa_recurso: 'Empresa Recurso',
        id_campania_recursos: 'ID Campaña',
      },
      Vehículos:{
        id_vehiculo: 'ID',
        descripcion_vehiculo: 'Descripción Vehículo',
        recurso_vehiculo: 'Recurso Vehículo',
        empresa_vehiculo: 'Empresa Vehículo',
        tfno_vehiuclo: 'Teléfono Vehículo',
        ext_vehiculo: 'Extensión Vehículo',
        id_campania_vehiculos: 'ID Campaña',
      },
      Tareas:{
        id_tarea: 'ID',
        descripcion_tarea: 'Descripción Tarea',
        color_tarea_r: 'Color Tarea Rojo',
        color_tarea_g: 'Color Tarea Verde',
        color_tarea_b: 'Color Tarea Azul',
        id_campania_tareas: 'ID Campaña',
      },
      Estados:{
        id_estado: 'ID',
        descripcion_estado: 'Estado',
        color_estado_r: 'Color Estado Rojo',
        color_estado_g: 'Color Estado Verde',
        color_estado_b: 'Color Estado Azul',
      }, 
      Campañas:{
        id_campania: 'ID',
        titulo_campania: 'Título Campaña',
        inicio_campania: 'Inicio Campaña',
        fin_campania: 'Fin Campaña',
      },
      "Estados Comunicación":{
        id_estado_comunicacion: 'ID',
        descripcion_estado_comunicacion: 'Estado Comunicación',
        id_campania_estados_comunicacion: 'ID Campaña',
      },
      "Tener CTA":{
        id_tener_cta: 'ID',
        descripcion_tener_cta: 'Descripción Tener CTA',
        id_campania_tener_cta: 'ID Campaña',
      },
    };
  
  
    constructor(
      private dialogRef: MatDialogRef<HistoricoMantenimientoTablasComponent>,
      private personalService: PersonalService,
      private vehiculosService: VehiculosService,
      private estadosService: EstadosService,
      private carreterasService: CarreterasService,
      private recursosService: RecursosService,
      private tareasService: TareasService,
      private campaniasService: CampaniasService,
      private estadosComunicacionService: EstadosComunicacionService,
      private tenerCtaService: TenerCtaService,
      public dialog: MatDialog,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
      console.log('🔄 Inicializando componente...');
      this.cargarCampanasDisponibles();
    }

    onCampanaSeleccionada(): void {
      if (!this.campanaSeleccionada || !this.tablaSeleccionada) {
        console.warn('⚠️ No hay campaña o tabla seleccionada.');
        this.dataSource.data = [];
        return;
      }
    
      console.log(`📅 Filtrando por campaña: ${this.campanaSeleccionada}`);
    
      if (this.tablaSeleccionada === 'Personal') {
        this.personalService.getPersonalPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
      
            // 🔥 Transformamos los valores de `activo` y `dfa_personal` con tipado correcto
            const dataTransformada = response.data.map((item: Personal) => ({
              ...item,
              activo: item.activo ? "Si" : "No",
              dfa_personal: item.dfa_personal ? "Si" : "No", // ✅ Maneja `null` y `false` como "NO"
            }));
      
            console.log(`📊 Datos transformados filtrados por campaña "${this.campanaSeleccionada}":`, dataTransformada);
      
            // 🟢 Asignamos los datos transformados a la tabla
            this.dataSource.data = dataTransformada;
          },
          (error) => {
            console.error('❌ Error al obtener datos filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Vehículos') {
        // ✅ Ahora filtramos por Vehículos
        this.vehiculosService.getVehiculosPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`🚗 Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos de vehículos filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Carreteras') {
        this.carreterasService.getCarreterasPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`📊 Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Recursos') {
        // ✅ Filtrado por Recursos
        this.recursosService.getRecursosPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`🏗️ Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos de recursos filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Tareas') {
        // ✅ Filtrado por Tareas
        this.tareasService.getTareasPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`📋 Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos de tareas filtradas por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Tener CTA') {
        this.tenerCtaService.getTenerCtaPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`📋 Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos de tener_cta filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Estados Comunicación') {
        // ✅ Filtrado por Estados Comunicación
        this.estadosComunicacionService.getEstadosComunicacionPorCampania(this.campanaSeleccionada).subscribe(
          (response) => {
            console.log(`✅ Datos recibidos:`, response);
            this.dataSource.data = response.data || [];
            console.log(`📡 Datos filtrados por campaña "${this.campanaSeleccionada}":`, this.dataSource.data);
          },
          (error) => {
            console.error('❌ Error al obtener datos de Estados Comunicación filtrados por campaña:', error);
            this.dataSource.data = [];
          }
        );
      } else if (this.tablaSeleccionada === 'Estados') {
        // ✅ Estados se carga sin filtro de campaña
        this.cargarDatosEstados();
      } 
      else {
        console.warn('⚠️ Aún no se ha implementado la filtración para esta tabla.');
        this.dataSource.data = [];
      }
    }
    
    cargarCampanasDisponibles(): void {
      this.campaniasService.getCampanias().subscribe(
        (response: { data: any[] }) => {
          this.campanasDisponibles = response.data.map(c => c.titulo_campania);
          console.log('📅 Campañas disponibles:', this.campanasDisponibles);
        },
        (error) => {
          console.error('❌ Error al obtener campañas:', error);
          this.campanasDisponibles = []; // Evita que quede en undefined
        }
      );
    }
  
    onTablaSeleccionada(): void {
      if (!this.tablaSeleccionada) {
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }
    
      console.log(`📌 Tabla seleccionada: ${this.tablaSeleccionada}`);
    
      switch (this.tablaSeleccionada) {
        case 'Personal':
          this.cargarDatosPersonal();
          break;
        case 'Vehículos':
          this.cargarDatosVehiculos();
          break;
        case 'Estados':
          this.cargarDatosEstados();
          break;
        case 'Carreteras':
          this.cargarDatosCarreteras();
          break;
        case 'Recursos':
          this.cargarDatosRecursos();
          break;
        case 'Tareas':
          this.cargarDatosTareas();
          break;
        case 'Campañas':
          this.cargarDatosCampanias();
          break;
        case 'Estados Comunicación': 
          this.cargarDatosEstadosComunicacion();
          break;
        case 'Tener CTA': 
          this.cargarDatosTenerCta();
          break;
        default:
          this.dataSource.data = [];
          this.displayedColumns = [];
          break;
      }
    
      // ✅ Asegurar que las columnas se actualizan
      if (this.columnasAlias[this.tablaSeleccionada]) {
        this.displayedColumns = Object.keys(this.columnasAlias[this.tablaSeleccionada]);
        console.log(`📌 Columnas mostradas para ${this.tablaSeleccionada}:`, this.displayedColumns);
      }
    }

    cargarDatosPersonal(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }
    
      // ✅ Si hay campaña seleccionada, obtenemos los datos filtrados
      this.personalService.getPersonalPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          console.log("🔄 Datos originales recibidos:", response.data);
    
          // 🔥 Transformamos los valores de `activo` y `dfa_personal`, manejando `null`
          const data = response.data.map((item) => ({
            ...item,
            activo: item.activo === true ? "Si" : "No",
            dfa_personal: item.dfa_personal === true ? "Si" : "No", // ✅ Convierte null en "No"
          }));
    
          console.log("✅ Datos transformados para la tabla:", data);
    
          this.dataSource.data = data;
    
          this.displayedColumns = this.columnasAlias["Personal"]
            ? Object.keys(this.columnasAlias["Personal"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos filtrados de Personal:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
    
     
    cargarDatosVehiculos(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return; // 🚨 Salimos de la función si no hay campaña seleccionada
      }
    
      // ✅ Si hay campaña seleccionada, obtenemos los datos filtrados
      this.vehiculosService.getVehiculosPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
    
          this.displayedColumns = this.columnasAlias["Vehículos"]
            ? Object.keys(this.columnasAlias["Vehículos"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos filtrados de Vehículos:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
  
    cargarDatosEstados(): void {
      this.estadosService.getEstados().subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
          this.displayedColumns = this.columnasAlias["Estados"]
            ? Object.keys(this.columnasAlias["Estados"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos de Estados:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
  
    cargarDatosCarreteras(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return; // 🚨 Salimos de la función si no hay campaña seleccionada
      }
    
      this.carreterasService.getCarreterasPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
    
          this.displayedColumns = this.columnasAlias["Carreteras"]
            ? Object.keys(this.columnasAlias["Carreteras"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos filtrados de Carreteras:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
  
    cargarDatosRecursos(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }
    
      // ✅ Si hay campaña seleccionada, obtenemos los datos filtrados
      this.recursosService.getRecursosPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
    
          this.displayedColumns = this.columnasAlias["Recursos"]
            ? Object.keys(this.columnasAlias["Recursos"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos filtrados de Recursos:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
  
    cargarDatosTareas(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }
    
      // ✅ Si hay campaña seleccionada, obtenemos los datos filtrados
      this.tareasService.getTareasPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
    
          this.displayedColumns = this.columnasAlias["Tareas"]
            ? Object.keys(this.columnasAlias["Tareas"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos filtrados de Tareas:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
    
    
    cargarDatosCampanias(): void {
      this.campaniasService.getCampanias().subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
          this.displayedColumns = this.columnasAlias["Campañas"]
          ? Object.keys(this.columnasAlias["Campañas"])
          : data.length > 0 ? Object.keys(data[0]) : [];
      },
        (error: any) => {
          console.error('❌ Error al cargar datos de Campañas:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
  
    cargarDatosEstadosComunicacion(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }

      this.estadosComunicacionService.getEstadosComunicacionPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data; // Datos recibidos del backend
          this.dataSource.data = data;

          // Generar las columnas dinámicamente según las claves del primer elemento
          this.displayedColumns = this.columnasAlias["Estados Comunicación"]
          ? Object.keys(this.columnasAlias["Estados Comunicación"])
          : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos de Estados Comunicación:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }

  
    cargarDatosTenerCta(): void {
      if (!this.campanaSeleccionada) {
        console.warn('⚠️ No se ha seleccionado ninguna campaña, limpiando datos.');
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }
    
      // ✅ Si hay campaña seleccionada, obtenemos los datos filtrados
      this.tenerCtaService.getTenerCtaPorCampania(this.campanaSeleccionada).subscribe(
        (response: { data: any[] }) => {
          const data = response.data;
          this.dataSource.data = data;
    
          // Generar las columnas dinámicamente según las claves del primer elemento
          this.displayedColumns = this.columnasAlias["Tener CTA"]
            ? Object.keys(this.columnasAlias["Tener CTA"])
            : data.length > 0 ? Object.keys(data[0]) : [];
        },
        (error: any) => {
          console.error('❌ Error al cargar datos de Tener CTA:', error);
          this.dataSource.data = [];
          this.displayedColumns = [];
        }
      );
    }
  
      // Método para seleccionar un registro al hacer clic en una fila
    seleccionarRegistro(row: any): void {
      this.registroSeleccionado = row; // Guarda el registro seleccionado
    }
  
    eliminarRegistro(): void {
      // Verifica si hay un registro seleccionado
      if (!this.registroSeleccionado) {
        console.warn('❌ No hay ningún registro seleccionado para eliminar.');
        this.snackBar.open('Por favor, seleccione un registro para eliminar.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        return;
      }
    
      // Confirmación antes de eliminar
  
      const dialogRef = this.dialog.open(ConfirmDialogComponent);
  
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      // Switch para manejar cada tabla
      switch (this.tablaSeleccionada) {
        case 'Personal':
          this.personalService
            .eliminarPersonal(this.registroSeleccionado.id_personal)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosPersonal(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
          break;
    
        case 'Vehículos':
          this.vehiculosService
            .eliminarVehiculo(this.registroSeleccionado.id_vehiculo)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosVehiculos(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        case 'Carreteras':
          this.carreterasService
            .eliminarCarretera(this.registroSeleccionado.id_carretera)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosCarreteras(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        case 'Recursos':
          this.recursosService
            .eliminarRecurso(this.registroSeleccionado.id_recurso)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosRecursos(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        case 'Tareas':
          this.tareasService
            .eliminarTarea(this.registroSeleccionado.id_tarea)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosTareas(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
  
        case 'Estados':
          this.estadosService
            .eliminarEstado(this.registroSeleccionado.id_estado)
            .subscribe(
              () => {
                console.log('✅ Estado eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosEstados(); // Recargar datos
            },
            (error) => {
              console.error('❌ Error al eliminar el registro:', error);
              this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          );
          break;
    
        case 'Campañas':
          this.campaniasService
            .eliminarCampania(this.registroSeleccionado.id_campania)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosCampanias(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        case 'Estados Comunicación':
          this.estadosComunicacionService
            .eliminarEstadoComunicacion(
              this.registroSeleccionado.id_estado_comunicacion
            )
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosEstadosComunicacion(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        case 'Tener CTA':
          this.tenerCtaService
            .eliminarTenerCta(this.registroSeleccionado.id_tener_cta)
            .subscribe(
              () => {
                console.log('✅ Registro eliminado correctamente.');
                this.snackBar.open('Registro eliminado correctamente.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
                this.cargarDatosTenerCta(); // Recargar datos
              },
              (error) => {
                console.error('❌ Error al eliminar el registro:', error);
                this.snackBar.open('Error al eliminar el registro.', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
            break;
    
        default:
          console.warn('❌ No se encontró una tabla válida para eliminar.');
          break;
        }
      }
    });
    }
  
    openAddDialog() {
      const dialogRef = this.dialog.open(AddMatenimientoDialogComponent, {
        data: { tablaSeleccionada: this.tablaSeleccionada }, // Pasamos la tabla seleccionada
      });
    
      // Suscríbete al evento de 'registroAñadido' que emite el hijo
      dialogRef.componentInstance.registroAñadido.subscribe((registroAñadido: boolean) => {
        if (registroAñadido) {
          console.log('Registro añadido correctamente');
          this.updateTable();  // Recargamos los datos de la tabla
        }
      });
    }
  
    openEditDialog(): void {
      if (this.registroSeleccionado) {
        const dialogRef = this.dialog.open(EditMantenimientoDialogComponent, {
          data: { 
            tablaSeleccionada: this.tablaSeleccionada, 
            registroSeleccionado: this.registroSeleccionado // Pasa los datos del registro
          }
        });
    
        dialogRef.componentInstance.registroEditado.subscribe((registroEditado: boolean) => {
          if (registroEditado) {
            console.log('Registro editado correctamente');
            this.updateTable();  // Recarga la tabla después de la edición
          }
        });
      } else {
        this.snackBar.open('Por favor, seleccione un registro para editar.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    }
    
    
  
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
  
    updateTable() {
      switch (this.tablaSeleccionada) {
        case 'Personal':
          this.cargarDatosPersonal();  // Recargar datos de Personal
          break;
        case 'Vehículos':
          this.cargarDatosVehiculos();  // Recargar datos de Vehículos
          break;
        case 'Estados':
          this.cargarDatosEstados();  // Recargar datos de Estados
          break;
        case 'Carreteras':
          this.cargarDatosCarreteras();  // Recargar datos de Carreteras
          break;
        case 'Recursos':
          this.cargarDatosRecursos();  // Recargar datos de Recursos
          break;
        case 'Tareas':
          this.cargarDatosTareas();  // Recargar datos de Tareas
          break;
        case 'Campañas':
          this.cargarDatosCampanias();  // Recargar datos de Campañas
          break;
        case 'Estados Comunicación':
          this.cargarDatosEstadosComunicacion();  // Recargar datos de Estados Comunicación
          break;
        case 'Tener CTA':
          this.cargarDatosTenerCta();  // Recargar datos de Tener CTA
          break;
        default:
          console.warn('❌ No se ha encontrado una tabla válida');
          break;
      }
    }
  
    cerrarDialog(): void {
      this.dialogRef.close();
    }
}
