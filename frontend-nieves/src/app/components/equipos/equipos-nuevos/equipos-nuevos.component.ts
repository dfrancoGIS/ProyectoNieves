import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditShiftDialogComponent } from 'src/app/dialogs/edit-shift-dialog/edit-shift-dialog.component';
import { CalendarioTurnosComponent } from '../../calendario-turnos/calendario-turnos.component'; // Ajusta la ruta si difiere

@Component({
  selector: 'app-equipos-nuevos',
  templateUrl: './equipos-nuevos.component.html',
  styleUrls: ['./equipos-nuevos.component.scss']
})
export class EquiposNuevosComponent implements OnInit, OnDestroy {

  // 1. Referenciamos el componente hijo <app-calendario-turnos>
  @ViewChild(CalendarioTurnosComponent) calendario!: CalendarioTurnosComponent;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    console.log("EquiposNuevosComponent cargado correctamente.");
  }

  ngOnDestroy(): void {
    console.log("EquiposNuevosComponent destruido.");
  }

  nuevaActivacion(): void {
    // 2. Abrimos el primer formulario EditShiftDialogComponent
    const dialogRef = this.matDialog.open(EditShiftDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    });

    // 3. Escuchamos el afterClosed(): se dispara al cerrar ambos pasos (EditShiftDialog + SecondStepDialog)
    dialogRef.afterClosed().subscribe(() => {
      console.log("Se cerraron los formularios de activación. Refrescando calendario...");
      // 4. Llamamos al método cargarActivaciones() del componente hijo
      this.calendario.cargarActivaciones();
    });
  }
}

