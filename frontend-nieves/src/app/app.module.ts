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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { CarreterasComponent } from './components/carreteras/carreteras.component';
import { FundentesComponent } from './components/fundentes/fundentes.component';
// Diálogos
import { NuevoEquipoDialogComponent } from './dialogs/nuevo-equipo-dialog/nuevo-equipo-dialog.component';
import { NuevaComunicacionDialogComponent } from './dialogs/nueva-comunicacion-dialog/nueva-comunicacion-dialog.component';
import { EditarCarreteraDialogComponent } from './dialogs/editar-carretera-dialog/editar-carretera-dialog.component';
import { EquiposEntrantesComponent } from './components/equipos-entrantes/equipos-entrantes.component';
import { ComunicacionesComponent } from './components/comunicaciones/comunicaciones.component';
import { RetenesComponent } from './components/retenes/retenes.component';
import { CuadrillasComponent } from './components/cuadrillas/cuadrillas.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { NuevaCampaniaDialogComponent } from './dialogs/nueva-campania-dialog/nueva-campania-dialog.component';
import { EditarSalmueraDialogComponent } from './dialogs/editar-salmuera-dialog/editar-salmuera-dialog.component';
import { EditarSalDialogComponent } from './dialogs/editar-sal-dialog/editar-sal-dialog.component';
import { RegistroCambiosComponent } from './components/registro-cambios/registro-cambios.component';
import { DocumentosInformesComponent } from './components/documentos-informes/documentos-informes.component';
import { MantenimientoTablasDialogComponent } from './dialogs/mantenimiento-tablas-dialog/mantenimiento-tablas-dialog.component';
import { EstacionesMeteorologicasComponent } from './components/estaciones-meteorologicas/estaciones-meteorologicas.component';
import { HistorialEstacionDialogComponent } from './dialogs/historial-estacion-dialog/historial-estacion-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AddMatenimientoDialogComponent } from './dialogs/add-matenimiento-dialog/add-matenimiento-dialog.component';
import { EditMantenimientoDialogComponent } from './dialogs/edit-mantenimiento-dialog/edit-mantenimiento-dialog.component';
import { HistoricoMantenimientoTablasComponent } from './dialogs/historico-mantenimiento-tablas/historico-mantenimiento-tablas.component';



@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    EquiposNuevosComponent,
    NuevoEquipoDialogComponent,
    NuevaComunicacionDialogComponent,
    CarreterasComponent,
    EditarCarreteraDialogComponent,
    EquiposEntrantesComponent,
    ComunicacionesComponent,
    RetenesComponent,
    CuadrillasComponent,
    ConfiguracionComponent,
    NuevaCampaniaDialogComponent,
    FundentesComponent,
    EditarSalmueraDialogComponent,
    EditarSalDialogComponent,
    RegistroCambiosComponent,
    DocumentosInformesComponent,
    MantenimientoTablasDialogComponent,
    EstacionesMeteorologicasComponent,
    HistorialEstacionDialogComponent,
    ConfirmDialogComponent,
    AddMatenimientoDialogComponent,
    EditMantenimientoDialogComponent,
    HistoricoMantenimientoTablasComponent,
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
    MatTabsModule,
    NgxMatSelectSearchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
