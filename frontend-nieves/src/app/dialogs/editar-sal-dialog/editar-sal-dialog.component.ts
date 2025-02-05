import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-sal-dialog',
  templateUrl: './editar-sal-dialog.component.html',
  styleUrls: ['./editar-sal-dialog.component.scss']
})
export class EditarSalDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarSalDialogComponent>,
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
      if (nuevaCantidad < 0) nuevaCantidad = 0; // Evitar valores negativos
    }

    this.dialogRef.close(nuevaCantidad);
  }
}

