import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-salmuera-dialog',
  templateUrl: './editar-salmuera-dialog.component.html',
  styleUrls: ['./editar-salmuera-dialog.component.scss']
})
export class EditarSalmueraDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarSalmueraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: string; cantidadActual: number },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      cantidad: [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  modificarCantidad(añadir: boolean): void {
    const cantidadIngresada = this.form.value.cantidad;
    let nuevaCantidad = this.data.cantidadActual;

    if (añadir) {
      nuevaCantidad += cantidadIngresada;
    } else {
      nuevaCantidad -= cantidadIngresada;
      if (nuevaCantidad < 0) nuevaCantidad = 0;
    }

    this.dialogRef.close(nuevaCantidad);
  }
}
