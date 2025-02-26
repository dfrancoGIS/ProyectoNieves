import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalService } from '../../services/personal.service';
import { CarreterasService } from '../../services/carreteras.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecursosService } from '../../services/recursos.service';
import { VehiculosService } from '../../services/vehiculos.service';
import { TareasService } from 'src/app/services/tareas.service';
import { EstadosService } from 'src/app/services/estados.service';
import { EstadosComunicacionService } from 'src/app/services/estados-comunicacion.service';
import { TenerCtaService } from 'src/app/services/tener-cta.service';

@Component({
  selector: 'app-add-matenimiento-dialog',
  templateUrl: './add-matenimiento-dialog.component.html',
  styleUrls: ['./add-matenimiento-dialog.component.scss']
})
export class AddMatenimientoDialogComponent {

  // Variables para cada tabla
  // Personal
  nombre_personal: string = '';
  apellido1_personal: string = '';
  apellido2_personal: string = '';
  alias_personal: string = '';
  ocupacion_personal: string = '';
  tfno1_personal: string = '';
  tfno2_personal: string = '';
  ext_personal: string = '';
  departamento_personal: string = '';
  dfa_personal: boolean = false;
  id_campania_personal: number | null = null;  // O con un valor numérico por defecto
  activo: boolean = false; 
  form: FormGroup;

  // Carreteras
  carretera: string = '';
  direccion_carretera: string = '';
  pk_inferior: number = 0;
  pk_superior: number = 0;
  prioridad_carretera: number = 0;
  zona_carretera: string = '';
  estado: number = 0;
  id_campania_carreteras: number | null = null;
  id_visor: number = 0;

  // Recursos
  id_recurso: string = '';  
  empresa_recurso:string = '';
  id_campania_recursos: number | null = null;

  // Vehículos
  id_vehiculo: string = '';
  descripcion_vehiculo: string = '';
  recurso_vehiculo: string = '';
  empresa_vehiculo: string = '';
  tfno_vehiculo: string = '';
  ext_vehiculo: string = '';
  id_campania_vehiculos: number | null = null;

  // Tareas
  descripcion_tarea: string = '';
  color_tarea_r: number = 0;
  color_tarea_g: number = 0;
  color_tarea_b: number = 0;
  id_campania_tareas: number | null = null;

  // Estados
  descripcion_estado: string = '';
  color_estado_r: number = 0;
  color_estado_g: number = 0;
  color_estado_b: number = 0;

  //estados de comunicacion
  descripcion_estado_comunicacion: string = '';
  id_campania_estados_comunicacion: number | null = null;

  // Tener CTA
  descripcion_tener_cta: string = '';
  id_campania_tener_cta: number | null = null;


  constructor(
    public dialogRef: MatDialogRef<AddMatenimientoDialogComponent>,
    private personalService: PersonalService,
    private snackBar: MatSnackBar,
    private carreterasService: CarreterasService, 
    private recursosService: RecursosService,
    private vehiculosService: VehiculosService,
    private tareasService: TareasService,
    private estadosService: EstadosService,
    private estadosComunicacionService: EstadosComunicacionService,
    private tenerCtaService: TenerCtaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder  // Inyectamos el FormBuilder para crear el formulario reactivo
  ) {
    // Inicializamos el formulario dentro del constructor
    this.form = this.fb.group({
      // Campos específicos para Personal
      nombre_personal: ['', Validators.required],  // Solo el nombre es obligatorio
      apellido1_personal: '',
      apellido2_personal: '',
      alias_personal: '',
      ocupacion_personal: '',
      tfno1_personal: '',
      tfno2_personal: '',
      ext_personal: '',
      departamento_personal: '',
      dfa_personal: [false],  // Este es un checkbox
      id_campania_personal: [null],  // Este campo ya no es obligatorio
      activo: [false],

      // Campos específicos para Carreteras
      carretera: ['', Validators.required],  // Hacemos obligatorio el campo 'carretera'
      direccion_carretera: '',
      pk_inferior: [0],
      pk_superior: [0],
      prioridad_carretera: [0],
      zona_carretera: '',
      estado: [1],  // Estado siempre será 1
      id_campania_carreteras: [null],
      id_visor: [0],

      // Campos específicos para Recursos
      id_recurso: ['', Validators.required],
      empresa_recurso: ['', Validators.required],  
      id_campania_recursos: [null],

      // campos específicos para vehículos
      id_vehiculo: ['', Validators.required],
      descripcion_vehiculo: ['', Validators.required],
      recurso_vehiculo: ['', Validators.required],
      empresa_vehiculo: '',
      tfno_vehiculo: '',
      ext_vehiculo: '',
      id_campania_vehiculos: [null],

      // Campos específicos para Tareas
      descripcion_tarea: ['', Validators.required],
      color_tarea_r: [0],
      color_tarea_g: [0],
      color_tarea_b: [0],
      id_campania_tareas: [null],

      // Campos específicos para Estados
      descripcion_estado: ['', Validators.required],
      color_estado_r: [0],
      color_estado_g: [0],
      color_estado_b: [0],

      // Campos específicos para Estados de comunicación
      descripcion_estado_comunicacion: ['', Validators.required],
      id_campania_estados_comunicacion: [null],

      // Campos específicos para Tener CTA
      descripcion_tener_cta: ['', Validators.required],
      id_campania_tener_cta: [null],


    });

    // Configuramos el formulario dinámico según la tabla seleccionada
    this.setupForm();
  }

  @Output() registroAñadido: EventEmitter<any> = new EventEmitter<any>();

  // Método para configurar el formulario dinámico
  setupForm() {
    switch (this.data.tablaSeleccionada) {
      case 'Personal':
        this.setupPersonalForm();
        break;
      case 'Vehículos':
        this.setupVehiculosForm();
        break;
      case 'Recursos':
        this.setupRecursosForm();
        break;
      case 'Carreteras':
        this.setupCarreterasForm();
        break;
      case 'Tareas':
        this.setupTareasForm();
        break;
      case 'Estados':
        this.setupEstadosForm();
        break;
      case 'Estados Comunicación':
        this.setupEstadosComunicacionForm();
        break;
      case 'Tener CTA':
        this.setupTenerCTA();  // Recargar datos de Tener CTA
        break;
      default:
        break;
    }
  }

  limpiarCamposFormulario(tablaSeleccionada: string): void {
    const formData = this.form.value;

    switch (tablaSeleccionada) {
      case 'Personal':
        // Eliminar campos específicos de carreteras
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;

      case 'Carreteras':
        // Eliminar campos específicos de Personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.activo;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;

      case 'Vehículos':
        // Eliminar campos específicos de Personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.activo;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // Eliminar campos específicos de carreteras
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;
      case 'Recursos':
        // Eliminar campos específicos de carreteras y personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        delete formData.activo;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;
      case 'Tareas':
        // Eliminar campos específicos de carreteras y personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        delete formData.activo;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;
      case 'Estados':
        // Eliminar campos específicos de carreteras y personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        delete formData.activo;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;
        case 'Estados Comunicación':
        // Eliminar campos específicos de carreteras y personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        delete formData.activo;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de tener cta
        delete formData.descripcion_tener_cta;
        delete formData.id_campania_tener_cta;
        break;
        case 'Tener CTA':
        // Eliminar campos específicos de carreteras y personal
        delete formData.nombre_personal;
        delete formData.apellido1_personal;
        delete formData.apellido2_personal;
        delete formData.alias_personal;
        delete formData.ocupacion_personal;
        delete formData.tfno1_personal;
        delete formData.tfno2_personal;
        delete formData.ext_personal;
        delete formData.departamento_personal;
        delete formData.dfa_personal;
        delete formData.id_campania_personal;
        delete formData.carretera;
        delete formData.direccion_carretera;
        delete formData.pk_inferior;
        delete formData.pk_superior;
        delete formData.prioridad_carretera;
        delete formData.zona_carretera;
        delete formData.estado;
        delete formData.id_campania_carreteras;
        delete formData.id_visor;
        delete formData.activo;
        // eliminar campos especificos de vehiculos
        delete formData.id_vehiculo;
        delete formData.descripcion_vehiculo;
        delete formData.recurso_vehiculo;
        delete formData.empresa_vehiculo;
        delete formData.tfno_vehiculo;
        delete formData.ext_vehiculo;
        delete formData.id_campania_vehiculos;
        // eliminar campos especificos de recursos
        delete formData.id_recurso;
        delete formData.empresa_recurso;
        delete formData.id_campania_recursos;
        // eliminar campos especificos de tareas
        delete formData.descripcion_tarea;
        delete formData.color_tarea_r;
        delete formData.color_tarea_g;
        delete formData.color_tarea_b;
        delete formData.id_campania_tareas;
        // eliminar campos especificos de estados
        delete formData.descripcion_estado;
        delete formData.color_estado_r;
        delete formData.color_estado_g;
        delete formData.color_estado_b;
        // eliminar campos especificos de estados de comunicacion
        delete formData.descripcion_estado_comunicacion;
        delete formData.id_campania_estados_comunicacion;
        break;
      default:
        break;
    }
  }

  // Configuración específica para la tabla 'Personal'
  setupPersonalForm() {
    this.form.patchValue({
      nombre_personal: '',
      apellido1_personal: '',
      apellido2_personal: '',
      alias_personal: '',
      ocupacion_personal: '',
      tfno1_personal: '',
      tfno2_personal: '',
      ext_personal: '',
      departamento_personal: '',
      dfa_personal: false,
      id_campania_personal: null,
      activo: false,
    });
    
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  // Configuración específica para la tabla 'Carreteras'
  setupCarreterasForm() {
    this.form.patchValue({
      carretera: '',
      direccion_carretera: '',
      pk_inferior: 0,
      pk_superior: 0,
      prioridad_carretera: 0,
      zona_carretera: '',
      estado: 1, // Siempre será 1 por defecto
      id_campania_carreteras: null,
      id_visor: 0,
    });

    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupVehiculosForm() {
    this.form.patchValue({
      id_vehiculo: '',
      descripcion_vehiculo: '',
      recurso_vehiculo: '',
      empresa_vehiculo: '',
      tfno_vehiculo: '',
      ext_vehiculo: '',
      id_campania_vehiculos: null,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupRecursosForm() {
    this.form.patchValue({
      id_recurso: '',
      empresa_recurso: '',
      id_campania_recursos: null,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupTareasForm() {
    this.form.patchValue({
      descripcion_tarea: '',
      color_tarea_r: 0,
      color_tarea_g: 0,
      color_tarea_b: 0,
      id_campania_tareas: null,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupEstadosForm() {
    this.form.patchValue({
      descripcion_estado: '',
      color_estado_r: 0,
      color_estado_g: 0,
      color_estado_b: 0,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupEstadosComunicacionForm() {
    this.form.patchValue({
      descripcion_estado_comunicacion: '',
      id_campania_estados_comunicacion: null,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de tener cta
    this.form.get('descripcion_tener_cta')!.clearValidators();
  }

  setupTenerCTA() {
    this.form.patchValue({
      descripcion_tener_cta: '',
      id_campania_tener_cta: null,
    });
    // Limpiar validadores de Personal
    this.form.get('nombre_personal')!.clearValidators();
    // Limpiar validadores de Carreteras
    this.form.get('carretera')!.clearValidators();
    //limpiar validadores de vehiculos
    this.form.get('id_vehiculo')!.clearValidators();
    this.form.get('descripcion_vehiculo')!.clearValidators();
    this.form.get('recurso_vehiculo')!.clearValidators();
    // limpiar validadores de recursos
    this.form.get('id_recurso')!.clearValidators();
    this.form.get('empresa_recurso')!.clearValidators();
    // limpiar validadores de tareas
    this.form.get('descripcion_tarea')!.clearValidators();
    // limpiar validadores de estados
    this.form.get('descripcion_estado')!.clearValidators();
    // limpiar validadores de estados de comunicacion
    this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  }
  // Métodos para cerrar el diálogo
  onClose(): void {
    this.dialogRef.close();
  }

  // Método para añadir el registro
  onAdd(): void {
    if (this.form.valid) {
      let formData = this.form.value;
      // Llamamos a la función para limpiar los campos no relevantes
      this.limpiarCamposFormulario(this.data.tablaSeleccionada);

      console.log('Añadiendo registro:', formData);

      if (this.data.tablaSeleccionada === 'Personal') {
        // Enviar solo los datos de Personal al servicio
        this.personalService.insertarPersonal(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Personal añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true);
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }

      if (this.data.tablaSeleccionada === 'Carreteras') {
        // Enviar solo los datos de Carreteras al servicio
        this.carreterasService.insertarCarretera(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Carretera añadida correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Recursos') {
        // Enviar solo los datos de Carreteras al servicio
        this.recursosService.insertarRecurso(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Recurso añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Vehículos') {
        // Enviar solo los datos de Carreteras al servicio
        this.vehiculosService.insertarVehiculo(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Vehiculo añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Tareas') {
        // Enviar solo los datos de Carreteras al servicio
        this.tareasService.insertarTarea(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Tarea añadida correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Estados') {
        // Enviar solo los datos de Carreteras al servicio
        this.estadosService.insertarEstado(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Estado añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Estados Comunicación') {
        // Enviar solo los datos de Carreteras al servicio
        this.estadosComunicacionService.insertarEstadoComunicacion(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Estado comunicacion añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
      if (this.data.tablaSeleccionada === 'Tener CTA') {
        // Enviar solo los datos de Carreteras al servicio
        this.tenerCtaService.insertarTenerCta(formData).subscribe(
          response => {
            console.log('Registro añadido correctamente', response);
            this.snackBar.open('Tener en cuenta añadido correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.dialogRef.close();
            this.registroAñadido.emit(true); // Emitir para actualizar la tabla
          },
          error => {
            console.log('Error al añadir el registro:', error);
            this.snackBar.open('Error al añadir el registro', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }


}
