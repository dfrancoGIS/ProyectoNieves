import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NuevaCampaniaDialogComponent } from 'src/app/dialogs/nueva-campania-dialog/nueva-campania-dialog.component';
import { MantenimientoTablasDialogComponent } from 'src/app/dialogs/mantenimiento-tablas-dialog/mantenimiento-tablas-dialog.component';
import { HistoricoMantenimientoTablasComponent } from 'src/app/dialogs/historico-mantenimiento-tablas/historico-mantenimiento-tablas.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {

  constructor(private router: Router, private dialog: MatDialog) {}

  abrirMantenimientoTablas() {
    this.dialog.open(MantenimientoTablasDialogComponent, {
      width: '800px',
      height: '700px',
      disableClose: true
    });
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

  abrirHistoricoTablas() {
    this.dialog.open(HistoricoMantenimientoTablasComponent, {
      width: '800px',
      height: '700px',
      disableClose: true
    });
  }
}
