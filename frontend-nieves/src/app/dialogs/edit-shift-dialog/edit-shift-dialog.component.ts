import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SecondStepDialogComponent } from '../second-step-dialog/second-step-dialog.component';
import { RecursosService } from 'src/app/services/recursos.service';
import { VehiculosService } from 'src/app/services/vehiculos.service';

@Component({
  selector: 'app-edit-shift-dialog',
  templateUrl: './edit-shift-dialog.component.html',
  styleUrls: ['./edit-shift-dialog.component.scss']
})
export class EditShiftDialogComponent implements OnInit {
  isEditMode = false;
  shiftForm: FormGroup;
  minDate: Date = new Date();

  activadoPorOptions: string[] = ['CECO', 'SOS DEIAK', 'PRIVADO', 'RVI', 'Técnico de la Sección'];
  empresasRecurso: string[] = [];
  recursosDisponibles: string[] = [];
  vehiculosDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditShiftDialogComponent>,
    private dialog: MatDialog,
    private recursosService: RecursosService,
    private vehiculosService: VehiculosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data?.activacion;

    this.shiftForm = this.fb.group({
      idActivacion: [null], // 🔹 Para edición
      numeroTurno: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      activadoPor: ['', Validators.required],
      empresaRecurso: ['', Validators.required],
      recurso: ['', Validators.required],
      vehiculo: [''],
      duracionTurno: ['', Validators.required],
      tipoTurno: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.shiftForm.patchValue({
        idActivacion: this.data.activacion.id_activacion ?? null,
        numeroTurno: this.data.activacion.numero_turno ?? '',
        fecha: new Date(this.data.activacion.fecha_activacion), // ✅ Convertimos a Date para evitar errores en el selector
        hora: this.data.activacion.hora_inicio.slice(0, 5) ?? '', // ✅ Tomamos solo "HH:mm"
        activadoPor: this.data.activacion.activado_por ?? '',
        empresaRecurso: '', // 👈 Se asigna después de que las empresas se carguen correctamente
        recurso: this.data.activacion.recurso ?? '',
        vehiculo: this.data.activacion.vehiculo ?? '',
        duracionTurno: this.data.activacion.duracion_turno ? Number(this.data.activacion.duracion_turno) : '', // ✅ Convertimos a número
        tipoTurno: this.data.activacion.tipo_turno ?? '',
      });
    
      console.log("✅ Datos cargados en el formulario:", this.shiftForm.value);
    
      // 🔹 Llamar a `onEmpresaChange` y `onRecursoChange` para actualizar dependencias
      if (this.data.activacion.empresa_recurso) {
        this.onEmpresaChange(this.data.activacion.empresa_recurso);
    
        // ⏳ Esperamos a que se carguen las empresas antes de asignar el valor al formulario
        setTimeout(() => {
          this.shiftForm.controls['empresaRecurso'].setValue(this.data.activacion.empresa_recurso);
        }, 200); // 🕒 Delay pequeño para evitar que la lista aún no esté cargada
      }
    
      if (this.data.activacion.recurso) {
        this.onRecursoChange(this.data.activacion.recurso);
      }
    }    
  }

  ngOnInit(): void {
    // ✅ Cargar empresas de recursos al iniciar
    this.recursosService.getRecursosUltimaCampania().subscribe(response => {
      const empresas = new Set<string>();
      response.data.forEach((r: any) => {
        if (r.empresa_recurso && typeof r.empresa_recurso === 'string') {
          empresas.add(r.empresa_recurso);
        }
      });
      this.empresasRecurso = Array.from(empresas);
    }, error => {
      console.error('❌ Error al obtener empresas de recursos:', error);
    });

    // ✅ Si estamos editando, cargar los datos relacionados con la activación
    if (this.isEditMode && this.data?.activacion) {
      const activacion = this.data.activacion;

      // 🔹 Aseguramos que `idActivacion` y otros datos importantes se cargan correctamente
      this.shiftForm.patchValue({
        idActivacion: activacion.idActivacion ?? null,
        empresaRecurso: activacion.empresaRecurso || '',
        recurso: activacion.recurso || ''
      });

      if (activacion.empresaRecurso) {
        this.onEmpresaChange(activacion.empresaRecurso);
      }

      if (activacion.recurso) {
        this.onRecursoChange(activacion.recurso);
      }
    }
  }

  // ✅ Cargar recursos cuando cambia la empresa
  onEmpresaChange(empresa: string): void {
    if (!empresa) return;

    this.recursosService.getRecursosPorEmpresa(empresa).subscribe(response => {
      this.recursosDisponibles = response.data.map((r: any) => r.id_recurso);
      if (this.isEditMode) {
        this.shiftForm.controls['recurso'].setValue(this.data.activacion?.recurso || '');
      } else {
        this.shiftForm.controls['recurso'].setValue('');
      }
    }, error => {
      console.warn('⚠️ No se pudieron cargar los recursos para la empresa:', empresa);
    });
  }

  // ✅ Cargar vehículos cuando cambia el recurso
  onRecursoChange(recurso: string): void {
    if (!recurso) return;

    this.vehiculosService.getVehiculosPorRecurso(recurso).subscribe(response => {
      this.vehiculosDisponibles = response.data.map((v: any) => `${v.descripcion_vehiculo} (${v.id_vehiculo})`);
      if (this.isEditMode) {
        this.shiftForm.controls['vehiculo'].setValue(this.data.activacion?.vehiculo || '');
      } else {
        this.shiftForm.controls['vehiculo'].setValue('');
      }
    }, error => {
      console.warn('⚠️ No se pudieron cargar los vehículos para el recurso:', recurso);
    });
  }

  // ✅ Guardar cambios o avanzar al siguiente paso
  onNext(): void {
    if (this.shiftForm.valid) {
      const turnoData = this.shiftForm.value;
  
      const dateObj = new Date(turnoData.fecha);
      turnoData.fecha = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  
      const turnoFinal = {
        idActivacion: this.isEditMode ? this.data.activacion.id_activacion : null,
        numeroTurno: turnoData.numeroTurno,
        fecha: turnoData.fecha,
        hora: turnoData.hora,
        activadoPor: turnoData.activadoPor,
        empresaRecurso: turnoData.empresaRecurso,
        recurso: turnoData.recurso,
        vehiculo: turnoData.vehiculo,
        duracionTurno: turnoData.duracionTurno,
        tipoTurno: turnoData.tipoTurno,
        zonaAsignada: this.isEditMode ? this.data.activacion.zona_asignada : '',
        personalAsignado1: this.isEditMode ? this.data.activacion.personal_asignado_1 : '',
        personalAsignado2: this.isEditMode ? this.data.activacion.personal_asignado_2 : '',
      };
  
      console.log("📌 Datos enviados al segundo paso:", turnoFinal);
  
      const secondDialogRef = this.dialog.open(SecondStepDialogComponent, {
        width: '600px',
        data: { shiftData: turnoFinal }
      });
  
      secondDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close(result);
        }
      });
    }
  }  
  

  // ✅ Cerrar sin guardar cambios
  onCancel(): void {
    this.dialogRef.close();
  }
}
