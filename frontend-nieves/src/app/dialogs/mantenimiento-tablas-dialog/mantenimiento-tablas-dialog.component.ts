import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mantenimiento-tablas-dialog',
  templateUrl: './mantenimiento-tablas-dialog.component.html',
  styleUrls: ['./mantenimiento-tablas-dialog.component.scss']
})
export class MantenimientoTablasDialogComponent implements OnInit {

  // Definir las columnas de la tabla
  columns = [
    { columnDef: 'id', header: 'ID', cell: (element: any) => element.id },
    { columnDef: 'nombre', header: 'Nombre', cell: (element: any) => element.nombre },
    { columnDef: 'descripcion', header: 'Descripción', cell: (element: any) => element.descripcion }
  ];

  // Definir columnas visibles en la tabla
  displayedColumns = this.columns.map(c => c.columnDef);

  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource([
    { id: 1, nombre: 'Registro 1', descripcion: 'Descripción del registro 1' },
    { id: 2, nombre: 'Registro 2', descripcion: 'Descripción del registro 2' },
    { id: 3, nombre: 'Registro 3', descripcion: 'Descripción del registro 3' },
    { id: 4, nombre: 'Registro 4', descripcion: 'Descripción del registro 4' },
    { id: 5, nombre: 'Registro 5', descripcion: 'Descripción del registro 5' },
    { id: 6, nombre: 'Registro 6', descripcion: 'Descripción del registro 6' },
    { id: 7, nombre: 'Registro 7', descripcion: 'Descripción del registro 7' },
    { id: 8, nombre: 'Registro 8', descripcion: 'Descripción del registro 8' },
    { id: 9, nombre: 'Registro 9', descripcion: 'Descripción del registro 9' },
    { id: 10, nombre: 'Registro 10', descripcion: 'Descripción del registro 10' }
  ]);

  constructor(private dialogRef: MatDialogRef<MantenimientoTablasDialogComponent>) {}

  ngOnInit(): void {}

  // Método para filtrar registros en la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Método para cerrar el diálogo
  cerrarDialog() {
    this.dialogRef.close();
  }

  // Método para añadir un nuevo registro
  agregarRegistro() {
    const nuevoRegistro = { id: this.dataSource.data.length + 1, nombre: 'Nuevo Registro', descripcion: 'Descripción' };
    this.dataSource.data = [...this.dataSource.data, nuevoRegistro];
  }

  // Método para eliminar el registro seleccionado
  eliminarRegistro(registro: any) {
    this.dataSource.data = this.dataSource.data.filter(r => r.id !== registro.id);
  }

  // Método para editar un registro
  editarRegistro(registro: any) {
    const index = this.dataSource.data.findIndex(r => r.id === registro.id);
    if (index !== -1) {
      this.dataSource.data[index].nombre = 'Registro Editado';
      this.dataSource.data[index].descripcion = 'Descripción Editada';
      this.dataSource.data = [...this.dataSource.data]; // Refrescar la tabla
    }
  }
}
