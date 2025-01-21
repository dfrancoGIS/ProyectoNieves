import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public router: Router, private dialog: MatDialog) {
    console.log(router.url)
  }
  cerrarSesion() {
    console.log('Cerrando sesión...');
  }

  toggleLayers() {
    console.log('Alternando capas...');
  }

  clickLogo() {
    console.log('Redirigiendo a inicio...');
    this.router.navigate(['/']); 
  }


  abrirEquipos() { this.router.navigate(['/equipos']); }
  abrirComunicaciones() { this.router.navigate(['/comunicaciones']); }
  abrirCarreteras() { this.router.navigate(['/carreteras']); }
  abrirCuadrillas() { this.router.navigate(['/cuadrillas']); }
  abrirRetenes() { this.router.navigate(['/retenes']); }
  abrirDocumentos() { this.router.navigate(['/documentos-informes']); }
  abrirConsultas() { this.router.navigate(['/generador-consultas']); }
  abrirEntrantes() { this.router.navigate(['/equipos-entrantes']); }
  abrirMeteorologia() { this.router.navigate(['/estaciones-meteorologicas']); }
  abrirPaneles() { this.router.navigate(['/paneles']); }
  abrirFundentes() { this.router.navigate(['/fundentes']); }
  abrirConfiguracion() { this.router.navigate(['/configuracion']); }
}
