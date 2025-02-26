import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Carretera } from 'src/app/interfaces/carretera';
import { CarreterasService } from 'src/app/services/carreteras.service'; // ✅ Importar el servicio

@Component({
    selector: 'app-editar-carretera-dialog',
    templateUrl: './editar-carretera-dialog.component.html',
    styleUrls: ['./editar-carretera-dialog.component.scss']
})
export class EditarCarreteraDialogComponent implements OnInit {
    form: FormGroup;
    estados: string[] = []; // Se cargará dinámicamente

    constructor(
        public dialogRef: MatDialogRef<EditarCarreteraDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Carretera,
        private fb: FormBuilder,
        private carreterasService: CarreterasService // ✅ Inyectar el servicio
    ) {
        this.form = this.fb.group({
            nombre: [{ value: data.nombre, disabled: true }, Validators.required], // Nombre bloqueado
            prioridad: [{ value: data.prioridad, disabled: true }, Validators.required], // Prioridad bloqueada
            estado: [data.estado, Validators.required] // Estado editable
        });
    }

    ngOnInit() {
        this.cargarEstados(); // Cargar los estados al inicializar el componente
    }

    cargarEstados() {
        this.carreterasService.getEstados().subscribe({
            next: (response: any) => {
                this.estados = response.data.map((estado: any) => estado.descripcion_estado); // Extraer los nombres de los estados
            },
            error: (error: any) => {
                console.error('Error al obtener los estados:', error);
                alert('No se pudieron cargar los estados.');
            }
        });
    }

    guardarCambios() {
        if (this.form.valid) {
            const estadoActualizado = this.form.value.estado; // Captura el nuevo estado
            this.dialogRef.close({ ...this.data, estado: estadoActualizado }); // Retorna los cambios al componente padre
        }
    }

    cancelar() {
        this.dialogRef.close();
    }
}
