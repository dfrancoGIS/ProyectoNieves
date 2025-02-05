import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarSalDialogComponent } from 'src/app/dialogs/editar-sal-dialog/editar-sal-dialog.component';
import { EditarSalmueraDialogComponent } from 'src/app/dialogs/editar-salmuera-dialog/editar-salmuera-dialog.component';

@Component({
  selector: 'app-fundentes',
  templateUrl: './fundentes.component.html',
  styleUrls: ['./fundentes.component.scss']
})
export class FundentesComponent {
  kilosSal: number = 5000; // Inicialmente 5000 kg de sal
  kilosSalmuera: number = 3000; // Inicialmente 3000 kg de salmuera

  constructor(private router: Router, private dialog: MatDialog) {
    this.obtenerCantidadSal();
    this.obtenerCantidadSalmuera();
  }

  abrirControlSal(): void {
    const dialogRef = this.dialog.open(EditarSalDialogComponent, {
      width: '600px',
      data: { tipo: 'sal', cantidadActual: this.kilosSal }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.kilosSal = result; // Actualiza el valor tras cerrar el diálogo
      }
    });
  }

  abrirControlSalmuera(): void {
    const dialogRef = this.dialog.open(EditarSalmueraDialogComponent, {
      width: '600px',
      data: { tipo: 'salmuera', cantidadActual: this.kilosSalmuera }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.kilosSalmuera = result; // Actualiza el valor tras cerrar el diálogo
      }
    });
  }

  obtenerCantidadSal(): void {
    // Simulamos una consulta (futuro: API)
    this.kilosSal = 5000;
  }

  obtenerCantidadSalmuera(): void {
    // Simulamos una consulta (futuro: API)
    this.kilosSalmuera = 3000;
  }
}
