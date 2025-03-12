import { Component, OnInit } from '@angular/core';
import { ActivacionService } from 'src/app/services/activacion.service';
import { MatDialog } from '@angular/material/dialog';
import { EditShiftDialogComponent } from 'src/app/dialogs/edit-shift-dialog/edit-shift-dialog.component';

export interface Shift {
  day: Date;
  startHour: number;
  endHour: number;
  title?: string;
}

export interface Activacion {
  numero_turno: number;
  fecha_activacion: string;
  hora_inicio: string;
  hora_fin: string;
  duracion_turno: string;
  activado_por: string;
  empresa_recurso: string;
  recurso: string;
  vehiculo: string;
  tipo_turno: string;
  zona_asignada: string;
  personal_asignado_1: string;
  ocupacion_asignado_1: string;
  personal_asignado_2: string;
  ocupacion_asignado_2: string;
}


export interface Resource {
  name: string;
  shifts: Shift[];
}

@Component({
  selector: 'app-calendario-turnos',
  templateUrl: './calendario-turnos.component.html',
  styleUrls: ['./calendario-turnos.component.scss']
})
export class CalendarioTurnosComponent implements OnInit {

  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  visibleDays: Date[] = [];

  categories = [
    { name: 'Personal', resources: [] as Resource[] },
    { name: 'Quitanieves', resources: [] as Resource[] }
  ];

  constructor(private activacionService: ActivacionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeDays(new Date());
  }

  initializeDays(startDate: Date) {
    this.visibleDays = [];
    for (let i = 0; i < 3; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      this.visibleDays.push(day);
    }
    this.cargarActivaciones();
  }

  clearAllShifts() {
    this.categories.forEach(cat => {
      cat.resources.forEach(res => res.shifts = []); // Borra solo los turnos, no los recursos
    });
  }
  
  cargarActivaciones() {
    this.activacionService.obtenerActivaciones().subscribe((response: { data: Activacion[] }) => {
      const activaciones: Activacion[] = response.data;
  
      // Solo limpiamos los turnos, NO los recursos
      this.clearAllShifts();
  
      activaciones.forEach((act: Activacion) => {
        const categoriaNombre = act.tipo_turno.toLowerCase().includes('personal') ? 'Personal' : 'Quitanieves';
        const categoria = this.categories.find(c => c.name === categoriaNombre);
  
        if (!categoria) return;
  
        let recursoExistente = categoria.resources.find(r => r.name === act.recurso);
  
        // Si el recurso no está en la tabla, lo añadimos (pero no lo duplicamos)
        if (!recursoExistente) {
          recursoExistente = { name: act.recurso, shifts: [] };
          categoria.resources.push(recursoExistente);
        }
  
        let startHour = parseInt(act.hora_inicio.split(':')[0], 10);
        let endHour = parseInt(act.hora_fin.split(':')[0], 10);
        if (endHour === 0) endHour = 24;
  
        if (startHour < endHour) {
          recursoExistente.shifts.push({
            day: new Date(act.fecha_activacion),
            startHour,
            endHour,
            title: '1'
          });
        } else {
          // Turno que cruza de día
          recursoExistente.shifts.push({
            day: new Date(act.fecha_activacion),
            startHour,
            endHour: 24,
            title: '1'
          });
  
          const diaSiguiente = new Date(act.fecha_activacion);
          diaSiguiente.setDate(diaSiguiente.getDate() + 1);
  
          recursoExistente.shifts.push({
            day: diaSiguiente,
            startHour: 0,
            endHour: endHour === 24 ? 0 : endHour,
            title: '1'
          });
        }
      });
      console.log('Categorías tras insertar:', this.categories);
    });
  }
  
  shiftType(day: Date, hour: number, resource: Resource): string {
    const shiftsToday = resource.shifts.filter(
      shift => shift.day.toDateString() === day.toDateString()
    );
    const shiftsTomorrow = resource.shifts.filter(shift => {
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      return shift.day.toDateString() === nextDay.toDateString();
    });
  
    const isStart = shiftsToday.some(s => s.startHour === hour);
    const isEnd = shiftsToday.some(s => s.endHour === hour + 1);
    const endsNow = shiftsToday.some(s => s.endHour === hour);
    const startsNow = shiftsToday.some(s => s.startHour === hour);
  
    // 🔥 Nuevo: Comprobamos cuántos turnos del mismo recurso cubren esta hora.
    //   Ej.: Si hour=8, buscamos turnos con startHour<9 y endHour>8.
    const overlapsThisHour = shiftsToday.filter(s => s.startHour < (hour + 1) && s.endHour > hour);
  
    // Si más de 1 turno está activo en esta hora → shift-change (morado)
    if (overlapsThisHour.length > 1) {
      return 'shift-change';
    }
  
    // Detectar el cambio de turno (fin e inicio en la misma hora) — lo mantenemos
    const isChange = endsNow && startsNow;
  
    // Caso especial: cambio de día a las 00 horas
    if (hour === 0) {
      const endsYesterdayAtMidnight = resource.shifts.some(s => {
        const prevDay = new Date(day);
        prevDay.setDate(day.getDate() - 1);
        return s.day.toDateString() === prevDay.toDateString() && s.endHour === 24;
      });
  
      if (endsYesterdayAtMidnight && startsNow) {
        return 'shift-change'; // Morado al inicio del día si hay arrastre de turno
      }
    }
  
    if (isChange) {
      return 'shift-change'; // Morado para cambio exacto de turno en la misma hora
    }
  
    // Última hora del turno sin solapamiento posterior (verde)
    if (isEnd) {
      const noNextShiftStartsNow = !shiftsToday.some(s => s.startHour === hour + 1);
      const noNextDayShiftStartsAtZero = !(hour === 23 && shiftsTomorrow.some(s => s.startHour === 0));
  
      if (noNextShiftStartsNow && noNextDayShiftStartsAtZero) {
        return 'start-end-shift'; // Verde
      }
    }
  
    // Primera hora del turno sin solapamiento previo (verde)
    if (isStart) {
      const noPreviousShiftEndsNow = !shiftsToday.some(s => s.endHour === hour);
      const noYesterdayShiftEndsAtMidnight = !(hour === 0 && resource.shifts.some(s => {
        const prevDay = new Date(day);
        prevDay.setDate(day.getDate() - 1);
        return s.day.toDateString() === prevDay.toDateString() && s.endHour === 24;
      }));
  
      if (noPreviousShiftEndsNow && noYesterdayShiftEndsAtMidnight) {
        return 'start-end-shift'; // Verde
      }
    }
  
    return '';
  }
  
  
  openCrearTurno(): void {
    const dialogRef = this.dialog.open(EditShiftDialogComponent, {
      width: '600px'
      // data: si quieres pasar algo a EditShiftDialog
    });

    // Espera a que CIERRAS todos los formularios (EditShiftDialog + SecondStepDialog)
    dialogRef.afterClosed().subscribe(() => {
      console.log('🎉 Cerrados diálogos. Refrescando la tabla...');
      this.cargarActivaciones(); // <-- actualiza la tabla
    });
  }
  

  getDayTotal(resource: Resource, day: Date): number {
    return resource.shifts
      .filter(shift => shift.day.toDateString() === day.toDateString())
      .reduce((sum, shift) => sum + (shift.endHour - shift.startHour), 0);
  }

  getCategoryDayTotal(category: { resources: Resource[] }, day: Date): number {
    return category.resources.reduce((sum, resource) => sum + this.getDayTotal(resource, day), 0);
  }

  getResourceTotal(resource: Resource): number {
    return resource.shifts.reduce((sum, shift) => sum + (shift.endHour - shift.startHour), 0);
  }

  getCategoryTotal(category: { resources: Resource[] }): number {
    return category.resources.reduce((sum, resource) => sum + this.getResourceTotal(resource), 0);
  }

  prevDays() {
    if (this.visibleDays.length) {
      const firstDay = this.visibleDays[0];
      const newStart = new Date(firstDay);
      newStart.setDate(firstDay.getDate() - 1); // solo retrocede 1 día
      this.initializeDays(newStart);
    }
  }

  nextDays() {
    if (this.visibleDays.length) {
      const firstDay = this.visibleDays[0];
      const newStart = new Date(firstDay);
      newStart.setDate(firstDay.getDate() + 1); // solo avanza 1 día
      this.initializeDays(newStart);
    }
  }

  shiftMatches(day: Date, hour: number, shift: Shift): boolean {
    const sameDay = shift.day.toDateString() === day.toDateString();
    return sameDay && hour >= shift.startHour && hour < shift.endHour;
  }
  

  editShift(shift: Shift, recurso: string) {
    console.log("🛠️ Editar turno:", shift, "Recurso:", recurso);
  
    const fechaStr = shift.day.toISOString().split('T')[0];
    const horaInicioStr = `${shift.startHour}:00`;
  
    this.activacionService.obtenerActivacionPorFechaHoraRecurso(fechaStr, horaInicioStr, recurso)
      .subscribe(activacion => {
        if (activacion) {
          console.log("✅ Activación encontrada, abriendo formulario:", activacion);
  
          this.dialog.open(EditShiftDialogComponent, {
            width: '600px',
            data: { activacion }
          }).afterClosed().subscribe(result => {
            if (result) {
              console.log("✅ Activación editada, recargando datos...");
              this.cargarActivaciones();
            }
          });
  
        } else {
          console.warn("⚠️ No se encontró una activación para el turno seleccionado.");
        }
      }, error => {
        console.error("❌ Error al buscar la activación:", error);
      });
  }
  

}
