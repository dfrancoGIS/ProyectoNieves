import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-estacion-dialog',
  templateUrl: './historial-estacion-dialog.component.html',
  styleUrls: ['./historial-estacion-dialog.component.scss']
})
export class HistorialEstacionDialogComponent {

  variables: string[] = ['Temperatura', 'Humedad', 'Visibilidad', 'Viento'];
  periodos: string[] = ['Última hora', 'Últimas 24h', 'Última semana'];

  variableSeleccionada: string = this.variables[0];
  periodoSeleccionado: string = this.periodos[0];

  datosHistoricos: { fecha: string, valor: number }[] = [];
  unidadMedida: string = '';

  constructor(
    public dialogRef: MatDialogRef<HistorialEstacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  consultarHistorico() {
    // Simulación de datos históricos basados en selección
    this.datosHistoricos = [];

    for (let i = 0; i < 5; i++) {
      let fecha = new Date();
      fecha.setHours(fecha.getHours() - i);

      let valor = this.obtenerValorHistorico();

      this.datosHistoricos.push({
        fecha: fecha.toLocaleString('es-ES'),
        valor: valor
      });
    }

    this.unidadMedida = this.obtenerUnidad();
  }

  obtenerValorHistorico(): number {
    switch (this.variableSeleccionada) {
      case 'Temperatura': return Math.random() * (30 - 5) + 5;
      case 'Humedad': return Math.random() * (100 - 50) + 50;
      case 'Visibilidad': return Math.random() * (5000 - 1000) + 1000;
      case 'Viento': return Math.random() * (15 - 1) + 1;
      default: return 0;
    }
  }

  obtenerUnidad(): string {
    switch (this.variableSeleccionada) {
      case 'Temperatura': return '°C';
      case 'Humedad': return '%';
      case 'Visibilidad': return 'm';
      case 'Viento': return 'km/h';
      default: return '';
    }
  }
}
