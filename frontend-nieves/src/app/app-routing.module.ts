import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de Equipos
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquiposNuevosComponent } from './components/equipos/equipos-nuevos/equipos-nuevos.component';


// Componente de Carreteras
import { CarreterasComponent } from './components/carreteras/carreteras.component';

// Componente de Equipos Entrantes
import { EquiposEntrantesComponent } from './components/equipos-entrantes/equipos-entrantes.component';

// Componente de Comunicaciones
import { ComunicacionesComponent } from './components/comunicaciones/comunicaciones.component';

// Componente de Retenes 
import { RetenesComponent } from './components/retenes/retenes.component';
// Componente de fundentes
import { FundentesComponent } from './components/fundentes/fundentes.component';
// Componente de estaiones meteorologicas
import { EstacionesMeteorologicasComponent } from './components/estaciones-meteorologicas/estaciones-meteorologicas.component';

// Componente de Cuadrillas
import { CuadrillasComponent } from './components/cuadrillas/cuadrillas.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { RegistroCambiosComponent } from './components/registro-cambios/registro-cambios.component';
import { DocumentosInformesComponent } from './components/documentos-informes/documentos-informes.component';


const routes: Routes = [
  { path: '', component: EquiposComponent }, // Página de inicio en Equipos
  { path: 'equipos', component: EquiposComponent, children: [
    { path: '', redirectTo: 'nuevos', pathMatch: 'full' }, // Si se pulsa en Equipos, redirige a 'nuevos'
    { path: 'nuevos', component: EquiposNuevosComponent },

  ]},

  { path: 'carreteras', component: CarreterasComponent }, // Página de carreteras
  { path: 'equipos-entrantes', component: EquiposEntrantesComponent }, // Equipos Entrantes
  { path: 'comunicaciones', component: ComunicacionesComponent }, // Comunicaciones
  { path: 'retenes', component: RetenesComponent }, // Nueva ruta para Retenes
  { path: 'cuadrillas', component: CuadrillasComponent }, // Nueva ruta para Cuadrillas
  { path: 'configuracion', component: ConfiguracionComponent }, //Ruta para configuraciones
  { path: 'fundentes', component: FundentesComponent },
  { path: 'registro-cambios', component: RegistroCambiosComponent },
  { path: 'documentos-informes', component: DocumentosInformesComponent },
  { path: 'estaciones-meteorologicas', component: EstacionesMeteorologicasComponent },

  // Ruta 404 - Página no encontrada
  { path: '**', redirectTo: '/' } // Si la URL no existe, redirige a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
