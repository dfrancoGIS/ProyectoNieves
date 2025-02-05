import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NuevaCampaniaDialogComponent } from 'src/app/dialogs/nueva-campania-dialog/nueva-campania-dialog.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {

  constructor(private router: Router, private dialog: MatDialog) {}

  abrirMantenimientoTablas() {
    this.router.navigate(['/mantenimiento-tablas']); // Redirigir a mantenimiento de tablas
  }

  abrirNuevaCampania() {
    this.dialog.open(NuevaCampaniaDialogComponent, {
      width: '600px',
      data: {}
    });
  }

  abrirRegistroCambios() {
    this.router.navigate(['/registro-cambios']);
  }
}
