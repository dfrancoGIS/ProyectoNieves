import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Módulos de Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

// Módulos de Formularios y HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Módulo de Angular Router
import { RouterModule } from '@angular/router';

// Módulo de Angular Common
import { CommonModule } from '@angular/common';

// Componentes
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquiposNuevosComponent } from './components/equipos/equipos-nuevos/equipos-nuevos.component';
import { EquiposModificacionComponent } from './components/equipos/equipos-modificacion/equipos-modificacion.component';
import { EquiposBajaComponent } from './components/equipos/equipos-baja/equipos-baja.component';
import { DetalleEquipoComponent } from './components/equipos/detalle-equipo/detalle-equipo.component';
import { BusquedaEquipoComponent } from './components/equipos/busqueda-equipo/busqueda-equipo.component';
import { CarreterasComponent } from './components/carreteras/carreteras.component';

// Diálogos
import { NuevoEquipoDialogComponent } from './dialogs/nuevo-equipo-dialog/nuevo-equipo-dialog.component';
import { NuevaComunicacionDialogComponent } from './dialogs/nueva-comunicacion-dialog/nueva-comunicacion-dialog.component';
import { EditarCarreteraDialogComponent } from './dialogs/editar-carretera-dialog/editar-carretera-dialog.component';
import { EquiposEntrantesComponent } from './components/equipos-entrantes/equipos-entrantes.component';
import { ComunicacionesComponent } from './components/comunicaciones/comunicaciones.component';
import { RetenesComponent } from './components/retenes/retenes.component';
import { CuadrillasComponent } from './components/cuadrillas/cuadrillas.component';

@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    EquiposNuevosComponent,
    EquiposModificacionComponent,
    EquiposBajaComponent,
    DetalleEquipoComponent,
    BusquedaEquipoComponent,
    NuevoEquipoDialogComponent,
    NuevaComunicacionDialogComponent,
    CarreterasComponent,
    EditarCarreteraDialogComponent,
    EquiposEntrantesComponent,
    ComunicacionesComponent,
    RetenesComponent,
    CuadrillasComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    // Módulos de Angular Material
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    MatTreeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    DragDropModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
