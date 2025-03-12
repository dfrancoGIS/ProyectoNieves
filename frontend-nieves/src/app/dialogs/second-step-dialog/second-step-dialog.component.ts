import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ZonasService } from 'src/app/services/zonas.service';
import { PersonalService } from 'src/app/services/personal.service'; // ✅ Importamos el servicio de personal
import { ActivacionService } from 'src/app/services/activacion.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-second-step-dialog',
  templateUrl: './second-step-dialog.component.html',
  styleUrls: ['./second-step-dialog.component.scss']
})
export class SecondStepDialogComponent implements OnInit {
  secondStepForm: FormGroup;
  zonaControl = new FormControl('');
  personalControl = new FormControl('');
  rolControl = new FormControl('');
  loading: boolean = false;


  zonasDisponibles: string[] = [];
  filteredZonas: string[] = [];
  personalDisponible: { display: string, value: string, role: string }[] = []; // ✅ Ahora incluye role
  filteredPersonal: { display: string, value: string, role: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private activacionService: ActivacionService,
    private zonasService: ZonasService,
    private personalService: PersonalService, // ✅ Inyectamos el servicio de personal
    private dialogRef: MatDialogRef<SecondStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shiftData: any }
  ) {
    this.secondStepForm = this.fb.group({
      zona: ['', Validators.required],
      personal1: ['', Validators.required],
      personal2: [''],
      rolPersonal1: ['', Validators.required],
      rolPersonal2: ['']
    });
  }

  ngOnInit(): void {
    this.zonasService.getZonas().subscribe(response => {
      this.zonasDisponibles = response.data.map((z: any) => z.id_zona);
      this.filteredZonas = [...this.zonasDisponibles];
      if (this.data?.shiftData?.zona_asignada) {
        this.secondStepForm.patchValue({ zona: this.data.shiftData.zona_asignada });
      }
    });
  
    this.personalService.getPersonal().subscribe(response => {
      this.personalDisponible = response.data
        .filter((p: any) => p.activo === true)
        .map((p: any) => ({
          display: `${p.nombre_personal} ${p.apellido1_personal ?? ''} ${p.apellido2_personal ?? ''}`.trim(),
          value: String(p.id_personal),
          role: p.ocupacion_personal || 'Sin rol'
        }));
      this.filteredPersonal = [...this.personalDisponible];
  
      if (this.data?.shiftData?.idActivacion) {
        const personal1 = this.personalDisponible.find(p => p.value === String(this.data.shiftData.personalAsignado1));
        const personal2 = this.personalDisponible.find(p => p.value === String(this.data.shiftData.personalAsignado2));
      
        this.secondStepForm.patchValue({
          zona: this.data.shiftData.zonaAsignada ?? '',
          personal1: personal1 || '',
          rolPersonal1: personal1?.role || '',
          personal2: personal2 || '',
          rolPersonal2: personal2?.role || ''
        });
      }      
    });
  }

  filtrarZonas(event: Event): void {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredZonas = this.zonasDisponibles.filter(zona =>
      zona.toLowerCase().includes(valor)
    );
  }

filtrarPersonal(event: Event): void {
  const valor = (event.target as HTMLInputElement).value.toLowerCase().trim();

  // Si el campo está vacío, mostramos la lista completa
  if (!valor) {
    this.filteredPersonal = [...this.personalDisponible];
    return;
  }

  // Filtramos la lista de personalDisponible
  this.filteredPersonal = this.personalDisponible.filter(persona =>
    persona.display.toLowerCase().includes(valor)
  );
}

setPersonalSeleccionado(event: any, persona: any, personalControl: string, rolControl: string): void {
  if (event.isUserInput) {
    this.secondStepForm.controls[personalControl].setValue(persona);
    this.secondStepForm.controls[rolControl].setValue(persona.role);
  }
}

  setPersonalDisplay(event: any, persona: { display: string; value: string; role: string }, personalControl: string, rolControl: string): void {
    if (event.isUserInput) {
      this.secondStepForm.controls[personalControl].setValue(persona); // 🔹 Guardar el objeto completo (con display)
      this.secondStepForm.controls[rolControl].setValue(persona.role);
    }
  }
  
  // ✅ Ajustamos displayPersona para aceptar objetos con `display`
  displayPersona(persona: any): string {
    return persona && persona.display ? persona.display : '';
  }

  generarTurnosSubsecuentes(turnoBase: any): void {
    console.log('🔍 Generando subsecuentes en horario LOCAL para:', turnoBase);
  
    // Validación: Solo permitir turnos base 1 o 2
    if (turnoBase.numeroTurno !== '1' && turnoBase.numeroTurno !== '2') {
      console.log(`⛔ No se generan turnos adicionales para el turno ${turnoBase.numeroTurno}`);
      return; // Salir de la función si el turno base no es 1 o 2
    }
  
    // 1) Convertir fecha/hora a Date local
    const [year, month, day] = turnoBase.fecha.split('-').map(Number);
    const [horaBase, minutoBase] = turnoBase.hora.split(':').map(Number);
  
    let currentDateTime = new Date(year, month - 1, day, horaBase, minutoBase);
  
    // 2) Para dejar un turno fantasma en medio, sumamos duracion * 2
    const duracion = turnoBase.duracionTurno || 8;
    const saltoEntreTurnos = duracion * 2;
  
    // 3) Cantidad de turnos extra (4)
    const turnosExtra = 4;
  
    // 4) númeroTurno (p.ej. '1') => number
    let turnoActual = parseInt(turnoBase.numeroTurno, 10) || 1;
  
    for (let i = 1; i <= turnosExtra; i++) {
      currentDateTime.setHours(currentDateTime.getHours() + saltoEntreTurnos);
      turnoActual += 2;
  
      // 5) Reconstruir fecha/hora en local
      const anio = currentDateTime.getFullYear();
      const mes = String(currentDateTime.getMonth() + 1).padStart(2, '0');
      const diaNum = String(currentDateTime.getDate()).padStart(2, '0');
      const hr = String(currentDateTime.getHours()).padStart(2, '0');
      const min = String(currentDateTime.getMinutes()).padStart(2, '0');
  
      const nuevoTurno = {
        ...turnoBase,
        fecha: `${anio}-${mes}-${diaNum}`,
        hora: `${hr}:${min}`,
        numeroTurno: turnoActual.toString()
      };
  
      console.log(`📌 Insertando turno adicional #${turnoActual}`, nuevoTurno);
  
      // 6) Insertar en la BD
      this.activacionService.insertarActivacion(nuevoTurno).subscribe({
        next: (resp) => console.log(`✅ Turno ${turnoActual} insertado`, resp),
        error: (err) => console.error(`❌ Error en turno ${turnoActual}`, err)
      });
    }
  }
  
  
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onFinish(): void {
    if (this.secondStepForm.valid) {
      this.loading = true;
  
      const secondStepData = this.secondStepForm.value;
  
      const turnoFinal: any = {
        numeroTurno: this.data.shiftData.numeroTurno,
        fecha: this.data.shiftData.fecha || this.data.shiftData.fechaActivacion,
        hora: this.data.shiftData.hora.includes(':') ? this.data.shiftData.hora : `${this.data.shiftData.hora}:00`,
        activadoPor: this.data.shiftData.activadoPor,
        empresaRecurso: this.data.shiftData.empresaRecurso,
        recurso: this.data.shiftData.recurso,
        vehiculo: this.data.shiftData.vehiculo || null,
        duracionTurno: Number(this.data.shiftData.duracionTurno),
        tipoTurno: this.data.shiftData.tipoTurno || '',
        zona: secondStepData.zona,
        personal1: typeof secondStepData.personal1 === 'object' ? secondStepData.personal1.value : secondStepData.personal1,
        rolPersonal1: secondStepData.rolPersonal1,  // ⚠️ Añadido
        personal2: typeof secondStepData.personal2 === 'object' ? secondStepData.personal2.value : secondStepData.personal2,
        rolPersonal2: secondStepData.rolPersonal2 || null, // ⚠️ Añadido (opcional)
      };
  
      console.log('📌 Objeto enviado al backend:', turnoFinal);
  
      // Ahora sí se envía correctamente al backend
      this.activacionService.insertarActivacion(turnoFinal).subscribe({
        next: (response) => {
          console.log('✅ Activación creada:', response);
          this.generarTurnosSubsecuentes(turnoFinal); 
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('❌ Error al crear activación:', error);
          console.error('⚠️ Detalle del error:', error.error);
          this.loading = false;
        }
      });
    }
  }  
}  