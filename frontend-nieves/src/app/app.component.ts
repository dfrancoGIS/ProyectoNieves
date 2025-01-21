import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- IMPORTANTE: Importar Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-nieves';
  opened = true; // Sidebar inicia abierto

  // ✅ CORRECCIÓN: Inyectar Router en el constructor
  constructor(public router: Router) {}

  toggleSidenav() {
    this.opened = !this.opened;
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
  }

  toggleLayers() {
    console.log('Alternando capas...');
  }

  clickLogo() {
    console.log('Redirigiendo a inicio...');
    this.router.navigate(['/']);  // ✅ Ya no dará error
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
