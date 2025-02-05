import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-registro-cambios',
  templateUrl: './registro-cambios.component.html',
  styleUrls: ['./registro-cambios.component.scss']
})
export class RegistroCambiosComponent implements OnInit {
  // Definir las columnas de la tabla
  columns = [
    { columnDef: 'usuario', header: 'Usuario', cell: (row: any) => `${row.usuario}` },
    { columnDef: 'fecha', header: 'Fecha y Hora', cell: (row: any) => `${row.fecha}` },
    { columnDef: 'operacion', header: 'Operación', cell: (row: any) => `${row.operacion}` },
    { columnDef: 'tabla', header: 'Tabla Afectada', cell: (row: any) => `${row.tabla}` },
    { columnDef: 'detalles', header: 'Detalles', cell: (row: any) => `${row.detalles}` }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // Simulando datos (futuro: API)
    this.dataSource.data = [
      { usuario: 'Juan Pérez', fecha: '2024-02-03 14:30', operacion: 'Añadir', tabla: 'Fundentes', detalles: 'Añadió 500kg de Sal' },
      { usuario: 'María López', fecha: '2024-02-03 15:00', operacion: 'Eliminar', tabla: 'Cuadrillas', detalles: 'Eliminó cuadrilla 12' }
    ];

    this.dataSource.paginator = this.paginator;
  }

  // Método para filtrar registros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}

