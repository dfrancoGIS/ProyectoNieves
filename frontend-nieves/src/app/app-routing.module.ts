import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquiposNuevosComponent } from './components/equipos/equipos-nuevos/equipos-nuevos.component';
import { EquiposModificacionComponent } from './components/equipos/equipos-modificacion/equipos-modificacion.component';
import { EquiposBajaComponent } from './components/equipos/equipos-baja/equipos-baja.component';
import { DetalleEquipoComponent } from './components/equipos/detalle-equipo/detalle-equipo.component';
import { BusquedaEquipoComponent } from './components/equipos/busqueda-equipo/busqueda-equipo.component';

const routes: Routes = [
  { path: '', component: EquiposComponent }, // Página raíz
  { path: 'equipos', component: EquiposComponent, children: [
    { path: '', redirectTo: 'nuevos', pathMatch: 'full' }, // Redirigir a 'nuevos' solo al hacer clic en equipos
    { path: 'nuevos', component: EquiposNuevosComponent },
    { path: 'modificacion', component: EquiposModificacionComponent },
    { path: 'baja', component: EquiposBajaComponent },
    { path: 'detalle/:id', component: DetalleEquipoComponent },
    { path: 'busqueda', component: BusquedaEquipoComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

