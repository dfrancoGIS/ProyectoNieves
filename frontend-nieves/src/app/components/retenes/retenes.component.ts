import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-retenes',
  templateUrl: './retenes.component.html',
  styleUrls: ['./retenes.component.scss']
})
export class RetenesComponent {
  showChild: boolean = false;
  selectedTeam: string = '';
  selectedHistory: string = '';
  modoAltaReten: boolean = false;
  retenSeleccionado: any = null; 
  modoEdicionReten: boolean = false;

  retenes = { // 
    responsable: false
  };

  constructor(private dialog: MatDialog) {}

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
  displayedColumns: string[] = ['nombre', 'extension', 'telefono1', 'telefono2', 'ocupacion', 'departamento'];
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

  seleccionarReten(row: any): void {
    this.retenSeleccionado = row;
    console.log('Retén seleccionado:', this.retenSeleccionado);
  }

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

  // Método para iniciar el modo alta
iniciarAltaReten(): void {
  this.modoAltaReten = true;
  console.log('Iniciando alta de retén');
}

// Iniciar la edición de un retén
iniciarEdicionReten(): void {
  if (!this.retenSeleccionado) {
    console.warn('No hay ningún retén seleccionado para editar.');
    return;
  }
  this.modoEdicionReten = true;
  console.log('Editando retén:', this.retenSeleccionado);
}

eliminarReten(): void {
  if (!this.retenSeleccionado) {
    console.warn('No hay ningún retén seleccionado para eliminar.');
    return;
  }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      mensaje:
        'Atención: TODOS los datos relacionados con el equipo serán eliminados de la base de datos. ¿Está seguro de que desea eliminar el equipo?',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('Retén eliminado:', this.retenSeleccionado);
      this.dataSourceSuperior = this.dataSourceSuperior.filter(
        (reten) => reten !== this.retenSeleccionado
      );
      this.retenSeleccionado = null;
    } else {
      console.log('Eliminación cancelada.');
    }
  });
}


// Confirmar la acción (alta o edición)
confirmarReten(): void {
  if (this.modoAltaReten) {
    console.log('Confirmar nuevo retén.');
    // Aquí iría la lógica para guardar el nuevo retén
    // Por ejemplo, agregarlo a dataSourceSuperior
    const nuevoReten = { ...this.retenSeleccionado }; // Simulación
    this.dataSourceSuperior.push(nuevoReten);
  } else if (this.modoEdicionReten) {
    console.log('Confirmar edición del retén:', this.retenSeleccionado);
    // Aquí iría la lógica para guardar los cambios del retén editado
  }

  // Resetear los modos
  this.modoAltaReten = false;
  this.modoEdicionReten = false;
}

// Cancelar la acción (alta o edición)
cancelarReten(): void {
  console.log('Acción cancelada.');
  this.modoAltaReten = false;
  this.modoEdicionReten = false;
}

}
