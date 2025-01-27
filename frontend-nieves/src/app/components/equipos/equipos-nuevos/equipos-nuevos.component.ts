import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-equipos-nuevos',
  templateUrl: './equipos-nuevos.component.html',
  styleUrls: ['./equipos-nuevos.component.scss']
})
export class EquiposNuevosComponent implements OnInit, OnDestroy {
  
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(document.body, 'transform', 'scale(0.8)');
    this.renderer.setStyle(document.body, 'transform-origin', 'top left');
    this.renderer.setStyle(document.body, 'width', '125vw'); // Usar `vw` para evitar el scroll horizontal
    this.renderer.setStyle(document.body, 'height', '125vh'); // Ajustar altura para evitar cortes
    this.renderer.setStyle(document.documentElement, 'overflow', 'hidden'); // Ocultar scroll global
  }
  
  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'transform');
    this.renderer.removeStyle(document.body, 'transform-origin');
    this.renderer.removeStyle(document.body, 'width');
    this.renderer.removeStyle(document.body, 'height');
    this.renderer.removeStyle(document.documentElement, 'overflow');
  }

  equiposCarreteras: { equipo: string, carretera: string }[][] = [
    [
      { equipo: 'COPO 13', carretera: 'N-622' },
      { equipo: 'COPO 29', carretera: 'N-1' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 30', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' }
    ],
    [
      { equipo: 'COPO 29', carretera: 'N-622' },
      { equipo: 'COPO 6', carretera: 'N-1 (IR...)' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 1', carretera: 'A-2620' },
      { equipo: '', carretera: '' },
      { equipo: '', carretera: '' },
      { equipo: 'COPO 24', carretera: 'A-126' }
    ]
  ];

  // 📌 Objeto para el formulario
  nuevoEquipo = {
    equipo: '',
    carretera: '',
    zona: 0,
    columna: 0,
    recurso: '',
    responsable: false,
    vehiculo: ''
  };

  selectedTeam: any;
  displayedTeams: string[] = ['COPO 1', 'COPO 2', 'COPO 3', 'COPO 4'];
  grupoSeleccionado: any;
  color: any;

  // 📌 Definir columnas para la tabla
  columns = [
    { columnDef: 'nombre', header: 'Nombre', cell: (row: any) => `${row.nombre}` },
    { columnDef: 'extension', header: 'Extensión', cell: (row: any) => `${row.extension}` },
    { columnDef: 'telefono1', header: 'Teléfono 1', cell: (row: any) => `${row.telefono1}` },
    { columnDef: 'telefono2', header: 'Teléfono 2', cell: (row: any) => `${row.telefono2}` },
    { columnDef: 'ocupacion', header: 'Ocupación', cell: (row: any) => `${row.ocupacion}` },
    { columnDef: 'departamento', header: 'Departamento', cell: (row: any) => `${row.departamento}` }
  ];
  
  displayedColumns: string[] = ['nombre', 'extension', 'telefono1', 'telefono2', 'ocupacion', 'departamento'];

  // 📌 Inicializar dataSource para la tabla
  dataSource = new MatTableDataSource<any>([
    { nombre: 'Ángel López de Paita Portillo', extension: '15111', telefono1: '628141559', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' },
    { nombre: 'Ander Insagube Oja', extension: '', telefono1: '', telefono2: '', ocupacion: 'Carreteras', departamento: 'Carreteras' }
  ]);

  // 📌 Métodos de la tabla
  editarRegistro() {
    console.log("Editar registro");
  }

  agregarRegistro() {
    console.log("Agregar registro");
  }

  /**
   * 📌 Método para agregar un nuevo equipo a la tabla
   */
  agregarEquipo() {
    const { equipo, carretera, zona, columna, vehiculo } = this.nuevoEquipo;

    if (!equipo || !carretera || !vehiculo) {
      alert('Por favor, completa todos los campos antes de agregar.');
      return;
    }

    if (!this.equiposCarreteras[zona][columna].equipo && !this.equiposCarreteras[zona][columna].carretera) {
      this.equiposCarreteras[zona][columna] = { equipo, carretera };

      // Agregar a la tabla de registros
      this.dataSource.data = [...this.dataSource.data, {
        nombre: equipo,
        extension: '',
        telefono1: '',
        telefono2: '',
        ocupacion: 'Carreteras',
        departamento: 'Carreteras'
      }];
    } else {
      alert('La celda seleccionada ya tiene datos. Seleccione otra.');
    }

    // Resetear el formulario
    this.nuevoEquipo = {
      equipo: '',
      carretera: '',
      zona: 0,
      columna: 0,
      recurso: '',
      responsable: false,
      vehiculo: ''
    };
  }
}
