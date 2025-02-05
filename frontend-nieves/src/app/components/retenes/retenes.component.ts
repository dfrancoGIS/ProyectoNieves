import { Component } from '@angular/core';

@Component({
  selector: 'app-retenes',
  templateUrl: './retenes.component.html',
  styleUrls: ['./retenes.component.scss']
})
export class RetenesComponent {
  showChild: boolean = false;
  selectedTeam: string = '';
  selectedHistory: string = '';

  retenes = { // ✅ Agregar esta propiedad
    responsable: false
  };

  displayedTeams: string[] = ['COPO 7', 'COPO 11', 'COPO 20', 'COPO 1'];
  historyOptions: string[] = ['Historial 1', 'Historial 2', 'Historial 3'];
  color: string = '#d3d3d3';
  clickedRows = new Set<any>();

  // Columnas y datos para la tabla superior
  displayedColumnsSuperior: string[] = ['recurso', 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', 'vehiculo'];
  dataSourceSuperior = [
    { recurso: 'COPO 7', fechaInicio: '13/01/2012', horaInicio: '20:00', fechaFin: '16/01/2012', horaFin: '08:00', vehiculo: 'Nissan Terrano II' },
    { recurso: 'COPO 11', fechaInicio: '16/12/2011', horaInicio: '20:00', fechaFin: '19/12/2011', horaFin: '08:00', vehiculo: 'Pick Up con cuchilla 2 m' },
    { recurso: 'COPO 20', fechaInicio: '09/12/2011', horaInicio: '20:00', fechaFin: '12/12/2011', horaFin: '08:00', vehiculo: 'Peugeot Partner Combi' },
    { recurso: 'COPO 1', fechaInicio: '02/12/2011', horaInicio: '20:00', fechaFin: '05/12/2011', horaFin: '08:00', vehiculo: 'Pick Up con cuchilla 2.3 m' },
  ];

  // Columnas y datos para la tabla inferior
  displayedColumns: string[] = ['nombre', 'extension', 'telefono1', 'telefono2', 'ocupacion', 'departamento', 'action1', 'action2', 'action3'];
  dataSource = [
    { nombre: 'Ángel López Martínez', extension: '15111', telefono1: '628141559', telefono2: '-', ocupacion: 'Carreteras', departamento: 'Carreteras' },
    { nombre: 'Ander Insagube Perez', extension: '-', telefono1: '-', telefono2: '-', ocupacion: 'Carreteras', departamento: 'Carreteras' }
  ];

  // **Nueva definición de columnas para solucionar el error**
  columns = [
    { columnDef: 'nombre', header: 'Nombre y apellidos', cell: (element: any) => `${element.nombre}` },
    { columnDef: 'extension', header: 'Extensión', cell: (element: any) => `${element.extension}` },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (element: any) => `${element.telefono1}` },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (element: any) => `${element.telefono2}` },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (element: any) => `${element.ocupacion}` },
    { columnDef: 'departamento', header: 'Departamento', cell: (element: any) => `${element.departamento}` }
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource = this.dataSource.filter(row =>
      row.nombre.toLowerCase().includes(filterValue) ||
      row.extension.includes(filterValue) ||
      row.telefono1.includes(filterValue) ||
      row.telefono2.includes(filterValue) ||
      row.ocupacion.toLowerCase().includes(filterValue) ||
      row.departamento.toLowerCase().includes(filterValue)
    );
  }

  newSelectedTeam() {
    console.log('Equipo seleccionado:', this.selectedTeam);
  }

  highlightRow(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
  }

  viewEquipo(row: any) {
    console.log('Ver detalles de:', row);
  }

  editarEquipo(row: any) {
    console.log('Editar equipo:', row);
  }

  bajaEquipo(row: any) {
    console.log('Dar de baja a:', row);
  }

  generateExcel() {
    console.log('Generando archivo Excel...');
  }
}
