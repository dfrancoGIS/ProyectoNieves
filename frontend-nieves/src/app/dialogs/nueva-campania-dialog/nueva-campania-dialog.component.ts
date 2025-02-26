import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-nueva-campania-dialog',
  templateUrl: './nueva-campania-dialog.component.html',
  styleUrls: ['./nueva-campania-dialog.component.scss']
})
export class NuevaCampaniaDialogComponent implements OnInit {
  form: FormGroup;
  isLoading = false; // 🚀 Estado para mostrar carga mientras se guarda

  constructor(
    public dialogRef: MatDialogRef<NuevaCampaniaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private campaniasService: CampaniasService // 🔹 Inyectamos el servicio aquí
  ) {
    this.form = this.fb.group({
      fechaFinAnterior: ['', Validators.required], // Editable
      fechaInicio: ['', Validators.required],
      tituloCampana: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data?.fechaFinAnterior) {
      this.form.patchValue({ fechaFinAnterior: this.data.fechaFinAnterior });
    }
  }

  guardar() {
    if (this.form.valid) {
      this.isLoading = true; // ⏳ Bloqueamos el botón mientras guarda

      const formValues = this.form.value;

      // Convertir fechas al formato adecuado antes de enviarlas
      const fechaFinAnterior = this.formatFecha(formValues.fechaFinAnterior);
      const fechaInicio = this.formatFecha(formValues.fechaInicio);

      const campaniaData = {
        titulo: formValues.tituloCampana,
        fechaInicio: fechaInicio,
        fechaFinAnterior: fechaFinAnterior
      };

      // 🔹 Llamamos al servicio para guardar la campaña en el backend
      this.campaniasService.crearCampania(
        campaniaData.titulo,
        campaniaData.fechaInicio,
        campaniaData.fechaFinAnterior
      ).subscribe({
        next: (response) => {
          console.log('✅ Campaña creada con éxito:', response);
          this.dialogRef.close(true); // ✅ Cerramos el diálogo y recargamos la vista
        },
        error: (error) => {
          console.error('❌ Error al crear la campaña:', error);
          this.isLoading = false; // 🔄 Volver a habilitar el botón si falla
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  // 📌 Convertir fechas al formato YYYY-MM-DD HH:MM:SS
  private formatFecha(fecha: string | Date): string {
    if (!fecha) return '';

    let dateObj: Date;

    if (typeof fecha === 'string') {
      dateObj = new Date(fecha);
    } else {
      dateObj = fecha;
    }

    const año = dateObj.getFullYear();
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const dia = String(dateObj.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia} 00:00:00`; // Se asume la hora como 00:00:00
  }
}
