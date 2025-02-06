import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistorialEstacionDialogComponent } from 'src/app/dialogs/historial-estacion-dialog/historial-estacion-dialog.component';
import { EstacionMeteorologica } from 'src/app/interfaces/estacion-meteorologica';

@Component({
  selector: 'app-estaciones-meteorologicas',
  templateUrl: './estaciones-meteorologicas.component.html',
  styleUrls: ['./estaciones-meteorologicas.component.scss']
})
export class EstacionesMeteorologicasComponent implements OnInit, OnDestroy {
  
  fechaHoraGlobal: { fecha: string; hora: string } = this.obtenerFechaHoraActual();
  private intervaloTiempo!: any;

  // Definimos las estaciones meteorológicas
  estaciones: EstacionMeteorologica[] = [
    { ubicacion: "HERRERA", carretera: "A-2124", pk: "32+380", altura: 1108, temperatura: 4.8, visibilidad: 2000, humedad: 100, viento: 0.9 },
    { ubicacion: "OPAKUA", carretera: "A-2128", pk: "34+280", altura: 1014, temperatura: 5.2, visibilidad: 1800, humedad: 95, viento: 1.2 },
    { ubicacion: "AZAZETA", carretera: "A-132", pk: "17+440", altura: 889, temperatura: 6.0, visibilidad: 2500, humedad: 90, viento: 2.5 },
    { ubicacion: "ARAIA", carretera: "A-1", pk: "385+420", altura: 591, temperatura: 8.2, visibilidad: 3000, humedad: 85, viento: 3.0 },
    { ubicacion: "ALTUBE", carretera: "N-622", pk: "22+090", altura: 635, temperatura: 7.5, visibilidad: 2800, humedad: 88, viento: 1.8 },
    { ubicacion: "PEÑA MARIA", carretera: "A-1", pk: "336+980", altura: 508, temperatura: 9.0, visibilidad: 3200, humedad: 80, viento: 4.2 },
    { ubicacion: "LUKO", carretera: "N-240", pk: "10+170", altura: 522, temperatura: 8.5, visibilidad: 2900, humedad: 82, viento: 3.5 },
    { ubicacion: "LLODIO", carretera: "A-625", pk: "370+900", altura: 176, temperatura: 10.2, visibilidad: 3500, humedad: 75, viento: 5.0 },
    { ubicacion: "KRUZETA", carretera: "A-2620", pk: "24+190", altura: 691, temperatura: 7.0, visibilidad: 2700, humedad: 87, viento: 2.2 }
  ];

  // Dividimos las estaciones en superiores e inferiores para el diseño
  estacionesSuperiores: EstacionMeteorologica[] = [];
  estacionesInferiores: EstacionMeteorologica[] = [];

  // Variables para la configuración de alertas
  estacionSeleccionada = "";
  variableSeleccionada = "";
  umbral: number = 0;

  constructor(private dialog: MatDialog) {
    // Dividimos las estaciones en dos grupos (5 superiores y 4 inferiores)
    this.estacionesSuperiores = this.estaciones.slice(0, 5);
    this.estacionesInferiores = this.estaciones.slice(5);

    // Inicia la actualización de la fecha y hora en tiempo real
    this.intervaloTiempo = setInterval(() => {
      this.fechaHoraGlobal = this.obtenerFechaHoraActual();
    }, 1000);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // Limpiar el intervalo para evitar fugas de memoria cuando el componente se destruye
    if (this.intervaloTiempo) {
      clearInterval(this.intervaloTiempo);
    }
  }

  // Método para obtener la fecha y hora actual en Álava (zona horaria de España)
  obtenerFechaHoraActual(): { fecha: string; hora: string } {
    const ahora = new Date();
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    return {
      fecha: new Intl.DateTimeFormat('es-ES', { ...opcionesFecha, timeZone: 'Europe/Madrid' }).format(ahora),
      hora: new Intl.DateTimeFormat('es-ES', { ...opcionesHora, timeZone: 'Europe/Madrid' }).format(ahora),
    };
  }

  // Método para ver el histórico de una estación meteorológica
  abrirDialogoEstacion(estacion: EstacionMeteorologica): void {
    this.dialog.open(HistorialEstacionDialogComponent, {
      width: '600px',
      data: estacion
    });
  }

  // Método para guardar alertas configuradas por el usuario
  guardarAlerta(): void {
    if (!this.estacionSeleccionada || !this.variableSeleccionada) {
      alert("Seleccione una estación y una variable antes de guardar la alerta.");
      return;
    }

    console.log(`Alerta guardada para ${this.estacionSeleccionada} en ${this.variableSeleccionada} con umbral ${this.umbral}`);
    // Aquí puedes integrar lógica para guardar las alertas
  }
}
