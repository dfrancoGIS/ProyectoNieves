import { Component } from '@angular/core';

@Component({
  selector: 'app-equipos-entrantes',
  templateUrl: './equipos-entrantes.component.html',
  styleUrls: ['./equipos-entrantes.component.scss']
})
export class EquiposEntrantesComponent {
  showChild: boolean = false;  // Agregar esta línea

  carreteras: string[] = ['N-622', 'N-1 EGUINO', 'N-1 CASTILLA', 'N-240', 'A-132', 'AYALA', 'RIOJA', 'SIN ZONA'];

  dataSource = [
    { 'N-622': 'COPO 6', 'N-1 EGUINO': 'COPO 2', 'N-1 CASTILLA': 'COPO 4', 'N-240': 'COPO 9', 'A-132': '', 'AYALA': '', 'RIOJA': '', 'SIN ZONA': 'COPO 1' },
    { 'N-622': 'COPO 7', 'N-1 EGUINO': 'COPO 3', 'N-1 CASTILLA': 'COPO 5', 'N-240': 'COPO 11', 'A-132': '', 'AYALA': '', 'RIOJA': '', 'SIN ZONA': '' }
  ];

  displayedColumns = this.carreteras;
}
