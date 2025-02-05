import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EquiposService } from '../../../services/equipos.service';

@Component({
  selector: 'app-equipos-nuevos',
  templateUrl: './equipos-nuevos.component.html',
  styleUrls: ['./equipos-nuevos.component.scss']
})
export class EquiposNuevosComponent implements OnInit, OnDestroy {
  equiposCarreteras: any[] = [];
  displayedTeams: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  selectedTeam: string = '';
  displayedColumns: string[] = ['nombre', 'extension', 'telefono1', 'telefono2', 'ocupacion', 'departamento'];

  columns = [
    { columnDef: 'nombre', header: 'Nombre', cell: (row: any) => `${row.nombre}` },
    { columnDef: 'extension', header: 'Extensión', cell: (row: any) => `${row.extension}` },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (row: any) => `${row.telefono1}` },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (row: any) => `${row.telefono2}` },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (row: any) => `${row.ocupacion}` },
    { columnDef: 'departamento', header: 'Departamento', cell: (row: any) => `${row.departamento}` }
  ];

  nuevoEquipo = {
    equipo: '',
    carretera: '',
    recurso: '',
    responsable: false,
    vehiculo: '',
    estado: 'pendiente' 
  };

  constructor(private renderer: Renderer2, private equiposService: EquiposService) {}

  ngOnInit() {
    // this.renderer.setStyle(document.body, 'transform', 'scale(0.8)');
    // this.renderer.setStyle(document.body, 'transform-origin', 'top left');
    // this.renderer.setStyle(document.body, 'width', '125vw');
    // this.renderer.setStyle(document.body, 'height', '125vh');
    // this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');

    this.equiposService.equipos$.subscribe((equipos: any[]) => {
      this.equiposCarreteras = equipos;
      this.displayedTeams = equipos.map(e => e.equipo);
      this.dataSource.data = equipos;
    });
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'transform');
    this.renderer.removeStyle(document.body, 'transform-origin');
    this.renderer.removeStyle(document.body, 'width');
    this.renderer.removeStyle(document.body, 'height');
    this.renderer.removeStyle(document.documentElement, 'overflow');
  }

  agregarEquipo() {
    if (!this.nuevoEquipo.equipo || !this.nuevoEquipo.carretera || !this.nuevoEquipo.vehiculo) {
      alert('Por favor, completa todos los campos antes de agregar.');
      return;
    }
    const nuevoEquipo = { ...this.nuevoEquipo, id: Date.now(), estado: 'pendiente' };
    this.equiposService.insertEquipo(nuevoEquipo).subscribe(() => {
      this.dataSource.data = [...this.dataSource.data, nuevoEquipo];
    });
    this.resetFormulario();
  }

  editarRegistro() {
    if (!this.selectedTeam) return;
    const equipo = this.dataSource.data.find(e => e.equipo === this.selectedTeam);
    if (!equipo) return;
    this.equiposService.updateEquipo(equipo).subscribe();
  }

  eliminarRegistro() {
    if (!this.selectedTeam) return;
    const equipoIndex = this.dataSource.data.findIndex(e => e.equipo === this.selectedTeam);
    if (equipoIndex === -1) return;
    const equipoId = this.dataSource.data[equipoIndex].id;
    this.equiposService.deleteEquipo(equipoId).subscribe(() => {
      this.dataSource.data.splice(equipoIndex, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  resetFormulario() {
    this.nuevoEquipo = {
      equipo: '',
      carretera: '',
      recurso: '',
      responsable: false,
      vehiculo: '',
      estado: 'pendiente'
    };
  }
}