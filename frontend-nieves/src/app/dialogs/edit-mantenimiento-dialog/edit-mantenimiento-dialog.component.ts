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
  selector: 'app-edit-mantenimiento-dialog',
  templateUrl: './edit-mantenimiento-dialog.component.html',
  styleUrls: ['./edit-mantenimiento-dialog.component.scss']
})
export class EditMantenimientoDialogComponent {

form:FormGroup;  // Creamos una propiedad form de tipo FormGroup

  // Variables para cada tabla
nombre_personal: string = this.data?.nombre_personal || '';  // Usamos this.data para asignar valores al abrir el diálogo
apellido1_personal: string = this.data?.apellido1_personal || '';
apellido2_personal: string = this.data?.apellido2_personal || '';
alias_personal: string = this.data?.alias_personal || '';
ocupacion_personal: string = this.data?.ocupacion_personal || '';
tfno1_personal: string = this.data?.tfno1_personal || '';
tfno2_personal: string = this.data?.tfno2_personal || '';
ext_personal: string = this.data?.ext_personal || '';
departamento_personal: string = this.data?.departamento_personal || '';
dfa_personal: boolean = this.data?.dfa_personal || false;
id_campania_personal: number | null = this.data?.id_campania_personal || null;
activo: boolean = this.data?.activo ?? false;

// Carreteras
carretera: string = this.data?.carretera || '';
direccion_carretera: string = this.data?.direccion_carretera || '';
pk_inferior: number = this.data?.pk_inferior || 0;
pk_superior: number = this.data?.pk_superior || 0;
prioridad_carretera: number = this.data?.prioridad_carretera || 0;
zona_carretera: string = this.data?.zona_carretera || '';
estado: number = this.data?.estado || 0;
id_campania_carreteras: number | null = this.data?.id_campania_carreteras || null;
id_visor: number = this.data?.id_visor || 0;

// Recursos
id_recurso: string = this.data?.id_recurso || '';  
empresa_recurso: string = this.data?.empresa_recurso || '';
id_campania_recursos: number | null = this.data?.id_campania_recursos || null;

// Vehículos
descripcion_vehiculo: string = this.data?.descripcion_vehiculo || '';
recurso_vehiculo: string = this.data?.recurso_vehiculo || '';
empresa_vehiculo: string = this.data?.empresa_vehiculo || '';
tfno_vehiculo: string = this.data?.tfno_vehiculo || '';
ext_vehiculo: string = this.data?.ext_vehiculo || '';
id_campania_vehiculos: number | null = this.data?.id_campania_vehiculos || null;

// Tareas
descripcion_tarea: string = this.data?.descripcion_tarea || '';
color_tarea_r: number = this.data?.color_tarea_r || 0;
color_tarea_g: number = this.data?.color_tarea_g || 0;
color_tarea_b: number = this.data?.color_tarea_b || 0;
id_campania_tareas: number | null = this.data?.id_campania_tareas || null;

// Estados
descripcion_estado: string = this.data?.descripcion_estado || '';
color_estado_r: number = this.data?.color_estado_r || 0;
color_estado_g: number = this.data?.color_estado_g || 0;
color_estado_b: number = this.data?.color_estado_b || 0;

// Estados de comunicación
descripcion_estado_comunicacion: string = this.data?.descripcion_estado_comunicacion || '';
id_campania_estados_comunicacion: number | null = this.data?.id_campania_estados_comunicacion || null;

// Tener CTA
descripcion_tener_cta: string = this.data?.descripcion_tener_cta || '';
id_campania_tener_cta: number | null = this.data?.id_campania_tener_cta || null;

  constructor(
    public dialogRef: MatDialogRef<EditMantenimientoDialogComponent>,
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
  nombre_personal: [this.data?.nombre_personal || '', Validators.required],  // Solo el nombre es obligatorio
  apellido1_personal: [this.data?.apellido1_personal || ''],
  apellido2_personal: [this.data?.apellido2_personal || ''],
  alias_personal: [this.data?.alias_personal || ''],
  ocupacion_personal: [this.data?.ocupacion_personal || ''],
  tfno1_personal: [this.data?.tfno1_personal || ''],
  tfno2_personal: [this.data?.tfno2_personal || ''],
  ext_personal: [this.data?.ext_personal || ''],
  departamento_personal: [this.data?.departamento_personal || ''],
  dfa_personal: [this.data?.dfa_personal || false],  // Este es un checkbox
  id_campania_personal: [this.data?.id_campania_personal || null],  // Este campo ya no es obligatorio
  activo: [this.data?.activo ?? false] ,

  // Campos específicos para Carreteras
  carretera: [this.data?.carretera || '', Validators.required],  // Hacemos obligatorio el campo 'carretera'
  direccion_carretera: [this.data?.direccion_carretera || ''],
  pk_inferior: [this.data?.pk_inferior || 0],
  pk_superior: [this.data?.pk_superior || 0],
  prioridad_carretera: [this.data?.prioridad_carretera || 0],
  zona_carretera: [this.data?.zona_carretera || ''],
  estado: [this.data?.estado || 0],  // Estado siempre será 1
  id_campania_carreteras: [this.data?.id_campania_carreteras || null],
  id_visor: [this.data?.id_visor || 0],

  // Campos específicos para Recursos
  id_recurso: [this.data?.id_recurso || '', Validators.required],
  empresa_recurso: [this.data?.empresa_recurso || '', Validators.required],  
  id_campania_recursos: [this.data?.id_campania_recursos || null],

  // Campos específicos para vehículos
  id_vehiculo: [this.data?.id_vehiculo || '', Validators.required],
  descripcion_vehiculo: [this.data?.descripcion_vehiculo || '', Validators.required],
  recurso_vehiculo: [this.data?.recurso_vehiculo || '', Validators.required],
  empresa_vehiculo: [this.data?.empresa_vehiculo || ''],
  tfno_vehiculo: [this.data?.tfno_vehiculo || ''],
  ext_vehiculo: [this.data?.ext_vehiculo || ''],
  id_campania_vehiculos: [this.data?.id_campania_vehiculos || null],

  // Campos específicos para Tareas
  descripcion_tarea: [this.data?.descripcion_tarea || '', Validators.required],
  color_tarea_r: [this.data?.color_tarea_r || 0],
  color_tarea_g: [this.data?.color_tarea_g || 0],
  color_tarea_b: [this.data?.color_tarea_b || 0],
  id_campania_tareas: [this.data?.id_campania_tareas || null],

  // Campos específicos para Estados
  descripcion_estado: [this.data?.descripcion_estado || '', Validators.required],
  color_estado_r: [this.data?.color_estado_r || 0],
  color_estado_g: [this.data?.color_estado_g || 0],
  color_estado_b: [this.data?.color_estado_b || 0],

  // Campos específicos para Estados de comunicación
  descripcion_estado_comunicacion: [this.data?.descripcion_estado_comunicacion || '', Validators.required],
  id_campania_estados_comunicacion: [this.data?.id_campania_estados_comunicacion || null],

  // Campos específicos para Tener CTA
  descripcion_tener_cta: [this.data?.descripcion_tener_cta || '', Validators.required],
  id_campania_tener_cta: [this.data?.id_campania_tener_cta || null],


  });

      // Configuramos el formulario dinámico según la tabla seleccionada
      this.setupForm();
}

@Output() registroEditado: EventEmitter<any> = new EventEmitter<any>();

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

setupPersonalForm() {
  const personalData = this.data?.registro; // Esto asegura que data y registro estén definidos antes de intentar acceder a ellos

  if (personalData) {
    this.form.patchValue({
      nombre_personal: personalData.nombre_personal || '',
      apellido1_personal: personalData.apellido1_personal || '',
      apellido2_personal: personalData.apellido2_personal || '',
      alias_personal: personalData.alias_personal || '',
      ocupacion_personal: personalData.ocupacion_personal || '',
      tfno1_personal: personalData.tfno1_personal || '',
      tfno2_personal: personalData.tfno2_personal || '',
      ext_personal: personalData.ext_personal || '',
      departamento_personal: personalData.departamento_personal || '',
      dfa_personal: personalData.dfa_personal || false,
      id_campania_personal: personalData.id_campania_personal || null,
      id_personal: personalData.id_personal || '', // Asegúrate de incluir el ID del personal también
      activo: personalData.activo || false,
    });
  } else {
    console.error("No se han recibido datos para el personal");
  }

  // Limpiar validadores de otros formularios
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  // Actualizamos la validez del formulario para que los validadores se apliquen correctamente
  this.form.updateValueAndValidity();
}

setupVehiculosForm() {
  const vehiculoData = this.data.registroSeleccionado;  // Asumimos que 'registroSeleccionado' es el vehículo que vamos a editar

  this.form.patchValue({
    descripcion_vehiculo: vehiculoData.descripcion_vehiculo || '',
    recurso_vehiculo: vehiculoData.recurso_vehiculo || '',
    empresa_vehiculo: vehiculoData.empresa_vehiculo || '',
    tfno_vehiculo: vehiculoData.tfno_vehiculo || '',
    ext_vehiculo: vehiculoData.ext_vehiculo || '',
    id_campania_vehiculos: vehiculoData.id_campania_vehiculos || null,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  // Actualizamos la validez del formulario para que los validadores se apliquen correctamente
  this.form.updateValueAndValidity();
}

setupRecursosForm() {
  const recursoData = this.data.registroSeleccionado;  // Asumimos que 'registroSeleccionado' es el recurso que vamos a editar

  this.form.patchValue({
    id_recurso: recursoData.id_recurso || '',
    empresa_recurso: recursoData.empresa_recurso || '',
    id_campania_recursos: recursoData.id_campania_recursos || null,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  // Actualizamos la validez del formulario para que los validadores se apliquen correctamente
  this.form.updateValueAndValidity();
}

setupCarreterasForm() {
  const carreteraData = this.data.registroSeleccionado;  // Obtenemos los datos de la carretera seleccionada

  this.form.patchValue({
    carretera: carreteraData.carretera || '',
    direccion_carretera: carreteraData.direccion_carretera || '',
    pk_inferior: carreteraData.pk_inferior || 0,
    pk_superior: carreteraData.pk_superior || 0,
    prioridad_carretera: carreteraData.prioridad_carretera || 0,
    zona_carretera: carreteraData.zona_carretera || '',
    estado: carreteraData.estado || 1,  // Asignamos el valor por defecto 1 si no está disponible
    id_campania_carreteras: carreteraData.id_campania_carreteras || null,
    id_visor: carreteraData.id_visor || 0,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  // Aseguramos que los validadores sean actualizados
  this.form.updateValueAndValidity();
}


setupTareasForm() {
  const tareaData = this.data.registroSeleccionado;  // Asumimos que 'registroSeleccionado' es la tarea que vamos a editar

  this.form.patchValue({
    descripcion_tarea: tareaData.descripcion_tarea || '',
    color_tarea_r: tareaData.color_tarea_r || 0,
    color_tarea_g: tareaData.color_tarea_g || 0,
    color_tarea_b: tareaData.color_tarea_b || 0,
    id_campania_tareas: tareaData.id_campania_tareas || null,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  // Actualizamos la validez del formulario para que los validadores se apliquen correctamente
  this.form.updateValueAndValidity();
}

setupEstadosForm() {
  const estadoData = this.data.registroSeleccionado;  // Obtenemos los datos del estado seleccionado

  this.form.patchValue({
    descripcion_estado: estadoData.descripcion_estado || '',
    color_estado_r: estadoData.color_estado_r || 0,
    color_estado_g: estadoData.color_estado_g || 0,
    color_estado_b: estadoData.color_estado_b || 0,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  this.form.updateValueAndValidity();  // Aseguramos que los validadores se actualicen correctamente
}

setupEstadosComunicacionForm() {
  const estadoComunicacionData = this.data.registroSeleccionado;  // Obtenemos los datos del estado de comunicación seleccionado

  this.form.patchValue({
    descripcion_estado_comunicacion: estadoComunicacionData.descripcion_estado_comunicacion || '',
    id_campania_estados_comunicacion: estadoComunicacionData.id_campania_estados_comunicacion || null,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_tener_cta')!.clearValidators();

  this.form.updateValueAndValidity();  // Aseguramos que los validadores se actualicen correctamente
}

setupTenerCTA() {
  const tenerCTAData = this.data.registroSeleccionado;  // Obtenemos los datos de "Tener CTA" seleccionados

  this.form.patchValue({
    descripcion_tener_cta: tenerCTAData.descripcion_tener_cta || '',
    id_campania_tener_cta: tenerCTAData.id_campania_tener_cta || null,
  });

  // Limpiar validadores de otros formularios
  this.form.get('nombre_personal')!.clearValidators();
  this.form.get('carretera')!.clearValidators();
  this.form.get('id_vehiculo')!.clearValidators();
  this.form.get('descripcion_vehiculo')!.clearValidators();
  this.form.get('recurso_vehiculo')!.clearValidators();
  this.form.get('id_recurso')!.clearValidators();
  this.form.get('empresa_recurso')!.clearValidators();
  this.form.get('descripcion_tarea')!.clearValidators();
  this.form.get('descripcion_estado')!.clearValidators();
  this.form.get('descripcion_estado_comunicacion')!.clearValidators();

  // Aseguramos que los validadores sean actualizados
  this.form.updateValueAndValidity();
}

  // Métodos para cerrar el diálogo
  onClose(): void {
    this.dialogRef.close();
  }

// Método para editar un registro
onEdit(): void {
  if (this.form.valid) {
    let formData = this.form.value;

    // Obtener el ID del personal desde los datos del registro
    const idPersonal = this.data.registroSeleccionado?.id_personal;
    // Obtener el ID de la carretera desde los datos del registro
    const idCarretera = this.data.registroSeleccionado?.id_carretera;
    // Obtener el ID del recurso desde los datos del registro
    const idRecurso = this.data.registroSeleccionado?.id_recurso;
    // Obtener el ID del vehículo desde los datos del registro
    const idVehiculo = this.data.registroSeleccionado?.id_vehiculo;
    // Obtener el ID de la tarea desde los datos del registro
    const idTarea = this.data.registroSeleccionado?.id_tarea;
    // Obtener el ID del estado desde los datos del registro
    const idEstado = this.data.registroSeleccionado?.id_estado;
    // Obtener el ID del estado de comunicación desde los datos del registro
    const idEstadoComunicacion = this.data.registroSeleccionado?.id_estado_comunicacion;
    // Obtener el ID del registro
    const idTenerCta = this.data.registroSeleccionado?.id_tener_cta;

    // Limpiar los campos no relevantes para cada tabla seleccionada
    this.limpiarCamposFormulario(this.data.tablaSeleccionada);

    console.log('Editando registro:', formData);

    // Verifica que la tabla seleccionada sea la correcta
    if (this.data.tablaSeleccionada === 'Personal') {
      // Pasa tanto el ID como los datos del formulario
      this.personalService.editarPersonal(idPersonal, formData).subscribe(
        response => {
          console.log('Registro actualizado correctamente', response);
          this.snackBar.open('Personal actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }

    if (this.data.tablaSeleccionada === 'Carreteras') {
      // Pasa tanto el ID como los datos del formulario
      this.carreterasService.editarCarretera(idCarretera, formData).subscribe(
        response => {
          console.log('Carretera actualizada correctamente', response);
          this.snackBar.open('Carretera actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }

    if (this.data.tablaSeleccionada === 'Recursos') {
      // Pasa tanto el ID como los datos del formulario
      this.recursosService.editarRecurso(idRecurso, formData).subscribe(
        response => {
          console.log('Recurso actualizado correctamente', response);
          this.snackBar.open('Recurso actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }

    if (this.data.tablaSeleccionada === 'Vehículos') {
      // Pasa tanto el ID como los datos del formulario
      this.vehiculosService.editarVehiculo(idVehiculo, formData).subscribe(
        response => {
          console.log('Vehículo actualizado correctamente', response);
          this.snackBar.open('Vehículo actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }

    // Verifica que la tabla seleccionada sea la correcta
    if (this.data.tablaSeleccionada === 'Tareas') {
      if (!idTarea) {
        console.error('❌ No se ha encontrado el ID de la tarea');
        return;
      }
      // Pasa tanto el ID como los datos del formulario
      this.tareasService.editarTarea(idTarea, formData).subscribe(
        response => {
          console.log('Tarea actualizada correctamente', response);
          this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }
  
    // Verifica que la tabla seleccionada sea la correcta
    if (this.data.tablaSeleccionada === 'Estados') {
      if (!idEstado) {
        console.error('❌ No se ha encontrado el ID del estado');
        return;
      }
      // Pasa tanto el ID como los datos del formulario
      this.estadosService.editarEstado(idEstado, formData).subscribe(
        response => {
          console.log('Estado actualizado correctamente', response);
          this.snackBar.open('Estado actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }

    if (this.data.tablaSeleccionada === 'Estados Comunicación') {
      if (!idEstadoComunicacion) {
        console.error('❌ No se ha encontrado el ID del estado de comunicación');
        return;
      }
      // Pasa tanto el ID como los datos del formulario
      this.estadosComunicacionService.editarEstadoComunicacion(idEstadoComunicacion, formData).subscribe(
        response => {
          console.log('Estado de comunicación actualizado correctamente', response);
          this.snackBar.open('Estado de comunicación actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }
    // Verifica que la tabla seleccionada sea la correcta
    if (this.data.tablaSeleccionada === 'Tener CTA') {
      // Pasa tanto el ID como los datos del formulario
      this.tenerCtaService.editarTenerCta(idTenerCta, formData).subscribe(
        response => {
          console.log('Registro actualizado correctamente', response);
          this.snackBar.open('Estado de comunicación actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
          this.registroEditado.emit(true);
        },
        error => this.handleError(error)
      );
    }
  } else {
    console.log('Formulario inválido');
    this.snackBar.open('Formulario inválido', 'Cerrar', { duration: 3000 });
  }
}

// Método genérico para manejar errores
handleError(error: any): void {
  console.log('Error al editar el registro:', error);
  this.snackBar.open('Error al editar el registro', 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  });
}

ngOnInit(): void {
  console.log("Datos recibidos en el diálogo:", this.data); // Verifica que data esté pasando correctamente
  if (this.data?.registroSeleccionado) {
    this.form.patchValue(this.data.registroSeleccionado); // Aquí debes actualizar el formulario con los datos
  } else {
    console.error('❌ No se recibieron datos correctamente.');
  }
}

}