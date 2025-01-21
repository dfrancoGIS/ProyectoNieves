import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Equipo } from 'src/app/interfaces/equipo';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-nuevo-equipo-dialog',
  templateUrl: './nuevo-equipo-dialog.component.html',
  styleUrls: ['./nuevo-equipo-dialog.component.scss']
})
export class NuevoEquipoDialogComponent implements OnInit, AfterViewInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private equiposService: EquiposService,
    private dialogRef: MatDialogRef<NuevoEquipoDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      extension: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
      ocupacion: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {}

  insertarNuevoEquipo() {
    if (this.form.invalid) return;

    const nuevoEquipo: Equipo = {
      IDEQUIPO: 0,  // Se asigna un ID por defecto (debería ser autoincremental en el backend)
      NOMBRE: this.form.value.nombre,
      EXTENSION: this.form.value.extension,
      TELEFONO1: this.form.value.telefono1,
      TELEFONO2: this.form.value.telefono2 || '-',
      OCUPACION: this.form.value.ocupacion,
      DEPARTAMENTO: this.form.value.departamento
    };

    this.equiposService.insertEquipo(nuevoEquipo).subscribe({
      next: () => {
        console.log('Equipo insertado correctamente');
        this.dialogRef.close(nuevoEquipo); // Cierra el diálogo y devuelve el nuevo equipo
      },
      error: (err: any) => console.error('Error al insertar equipo', err)
    });
  }

  cancelar() {
    this.dialogRef.close(); // Cierra el diálogo sin guardar cambios
  }
}
