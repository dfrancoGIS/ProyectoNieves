import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carretera } from 'src/app/interfaces/carretera';

@Component({
    selector: 'app-editar-carretera-dialog',
    templateUrl: './editar-carretera-dialog.component.html',
    styleUrls: ['./editar-carretera-dialog.component.scss']
})
export class EditarCarreteraDialogComponent {
    form: FormGroup;

    prioridades = [1, 2, 3, 4, 5];
    estados = ['ABIERTO / IREKITA', 'CERRADO / ITXITA', 'CADENAS / KATEAK'];

    constructor(
        public dialogRef: MatDialogRef<EditarCarreteraDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Carretera,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            nombre: [{ value: data.nombre, disabled: true }],
            prioridad: [data.prioridad, Validators.required],
            estado: [data.estado, Validators.required]
        });
    }

    guardarCambios() {
        if (this.form.valid) {
            this.dialogRef.close({ ...this.data, ...this.form.value });
        }
    }

    cancelar() {
        this.dialogRef.close();
    }
}
