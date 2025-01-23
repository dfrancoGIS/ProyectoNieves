import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de Equipos
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquiposNuevosComponent } from './components/equipos/equipos-nuevos/equipos-nuevos.component';
import { EquiposModificacionComponent } from './components/equipos/equipos-modificacion/equipos-modificacion.component';
import { EquiposBajaComponent } from './components/equipos/equipos-baja/equipos-baja.component';
import { DetalleEquipoComponent } from './components/equipos/detalle-equipo/detalle-equipo.component';
import { BusquedaEquipoComponent } from './components/equipos/busqueda-equipo/busqueda-equipo.component';

// Componente de Carreteras
import { CarreterasComponent } from './components/carreteras/carreteras.component';

// Componente de Equipos Entrantes
import { EquiposEntrantesComponent } from './components/equipos-entrantes/equipos-entrantes.component';

// Componente de Comunicaciones
import { ComunicacionesComponent } from './components/comunicaciones/comunicaciones.component';

// Componente de Retenes 
import { RetenesComponent } from './components/retenes/retenes.component';

// Componente de Cuadrillas
import { CuadrillasComponent } from './components/cuadrillas/cuadrillas.component';

const routes: Routes = [
  { path: '', component: EquiposComponent }, // Página de inicio en Equipos
  { path: 'equipos', component: EquiposComponent, children: [
    { path: '', redirectTo: 'nuevos', pathMatch: 'full' }, // Si se pulsa en Equipos, redirige a 'nuevos'
    { path: 'nuevos', component: EquiposNuevosComponent },
    { path: 'modificacion', component: EquiposModificacionComponent },
    { path: 'baja', component: EquiposBajaComponent },
    { path: 'detalle/:id', component: DetalleEquipoComponent },
    { path: 'busqueda', component: BusquedaEquipoComponent },
  ]},

  { path: 'carreteras', component: CarreterasComponent }, // Página de carreteras
  { path: 'equipos-entrantes', component: EquiposEntrantesComponent }, // Equipos Entrantes
  { path: 'comunicaciones', component: ComunicacionesComponent }, // Comunicaciones
  { path: 'retenes', component: RetenesComponent }, // Nueva ruta para Retenes
  { path: 'cuadrillas', component: CuadrillasComponent }, // Nueva ruta para Cuadrillas

  // Ruta 404 - Página no encontrada
  { path: '**', redirectTo: '/' } // Si la URL no existe, redirige a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
