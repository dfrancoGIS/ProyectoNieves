import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carretera } from 'src/app/interfaces/carretera';
import { EditarCarreteraDialogComponent } from '../../dialogs/editar-carretera-dialog/editar-carretera-dialog.component';

@Component({
    selector: 'app-carreteras',
    templateUrl: './carreteras.component.html',
    styleUrls: ['./carreteras.component.scss']
})
export class CarreterasComponent implements OnInit {

    prioridades = [1, 2, 3, 4, 5];

    estados = [
        'ABIERTO / IREKITA', 'CERRADO / ITXITA', 'CADENAS / KATEAK',
        'ABIERTA PRECAUCIÓN / IREKITA KONTUZ', 'ALERTA NIEVE / KONTA ETA ELURRA',
        'CERRADA ACCIDENTE / ITXITA ISTRIPUAGATIK', 'CERRADA PESADOS / ITXITA IBILGAILU ASTUNENTZAT'
    ];

    getEstadoClase(estado: string): string {
        switch (estado) {
            case 'ABIERTO / IREKITA':
                return 'estado-verde';
            case 'CERRADO / ITXITA':
            case 'CERRADA ACCIDENTE / ITXITA ISTRIPUAGATIK':
                return 'estado-negro';
            case 'CADENAS / KATEAK':
            case 'CERRADA PESADOS / ITXITA IBILGAILU ASTUNENTZAT':
                return 'estado-rojo';
            case 'ABIERTA PRECAUCIÓN / IREKITA KONTUZ':
            case 'ALERTA NIEVE / KONTA ETA ELURRA':
                return 'estado-amarillo';
            default:
                return '';
        }
    }
     

    prioridadSeleccionada: number | null = null;
    carreterasSeleccionadas: string[] = [];
    carreterasFiltradas: Carretera[] = [];
    nuevoEstado: string = '';

    carreteras: Carretera[] = [
        { id: 1, nombre: 'A-132', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'ELORRIOGA' },
        { id: 2, nombre: 'A-124', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'BRIÑAS-SAN VICENTE' },
        { id: 3, nombre: 'N-1', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'MADRID-IRUN' },
        { id: 4, nombre: 'N-102', prioridad: 2, estado: 'CERRADO / ITXITA', direccion: 'BURGOS' },
        { id: 5, nombre: 'A-2128', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'ZAMBRANA-MIRANDA' },
        { id: 6, nombre: 'AP-1', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'IRUN-MADRID' },
        { id: 7, nombre: 'A-2124', prioridad: 3, estado: 'CADENAS / KATEAK', direccion: 'AMURRIO-ARTZINIEGA' },
        { id: 8, nombre: 'A-2522', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'BELUNZA-MADARIA' },
        { id: 9, nombre: 'A-2624', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'VITORIA-GASTEIZ' },
        { id: 10, nombre: 'A-4005', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'ZURBANO' },
        { id: 11, nombre: 'A-4016', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'ETURA' },
        { id: 12, nombre: 'A-5005', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'MENDARO' },
        { id: 13, nombre: 'A-2126', prioridad: 5, estado: 'ABIERTO / IREKITA', direccion: 'LUCO-URBINA' },
        { id: 14, nombre: 'A-2628', prioridad: 5, estado: 'CERRADO / ITXITA', direccion: 'PT. ORDÚÑA' },
        { id: 15, nombre: 'A-123', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'LLODIO-AMURRIO' },
        { id: 16, nombre: 'A-126', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'NANCLARES-VITORIA' },
        { id: 17, nombre: 'A-129', prioridad: 1, estado: 'CERRADO / ITXITA', direccion: 'ESPEJO-MANZANOS' },
        { id: 18, nombre: 'A-130', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'OYON-LOGROÑO' },
        { id: 19, nombre: 'A-135', prioridad: 2, estado: 'CADENAS / KATEAK', direccion: 'VILLANUEVA-LEGUTIO' },
        { id: 20, nombre: 'A-138', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'URKABUSTAIZ-ZUIA' },
        { id: 21, nombre: 'A-142', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'IZARRA-MURGIA' },
        { id: 22, nombre: 'A-145', prioridad: 3, estado: 'CERRADO / ITXITA', direccion: 'AGURAIN-ZALDUONDO' },
        { id: 23, nombre: 'A-148', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'SAN MILLAN-MAROÑO' },
        { id: 24, nombre: 'A-150', prioridad: 3, estado: 'CADENAS / KATEAK', direccion: 'VITORIA-ANDAGOYA' },
        { id: 25, nombre: 'A-153', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'MIRANDA-TREVIÑO' },
        { id: 26, nombre: 'A-157', prioridad: 4, estado: 'CERRADO / ITXITA', direccion: 'LEGUTIO-UBIDE' },
        { id: 27, nombre: 'A-160', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'ZIGOITIA-ALTUBE' },
        { id: 28, nombre: 'A-163', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'PEÑACERRADA-SALINAS' },
        { id: 29, nombre: 'A-166', prioridad: 5, estado: 'ABIERTO / IREKITA', direccion: 'OKONDO-ARTZINIEGA' },
        { id: 30, nombre: 'A-169', prioridad: 5, estado: 'CERRADO / ITXITA', direccion: 'VITORIA-ARGOTE' },
        { id: 31, nombre: 'A-172', prioridad: 5, estado: 'ABIERTO / IREKITA', direccion: 'ARRAZUA-URKABUSTAIZ' },
        { id: 32, nombre: 'A-175', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'BERANTEVILLA-ZAMBRANA' },
        { id: 33, nombre: 'A-178', prioridad: 1, estado: 'CADENAS / KATEAK', direccion: 'LAPUEBLA-LAGUARDIA' },
        { id: 34, nombre: 'A-181', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'AYALA-OKONDO' },
        { id: 35, nombre: 'A-184', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'MURGIA-ALTUBE' },
        { id: 36, nombre: 'A-187', prioridad: 2, estado: 'CERRADO / ITXITA', direccion: 'DURANA-ARRAZUA' },
        { id: 37, nombre: 'A-190', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'ARTZINIEGA-AMURRIO' },
        { id: 38, nombre: 'A-193', prioridad: 3, estado: 'CADENAS / KATEAK', direccion: 'LEZAMA-URRETXU' },
        { id: 39, nombre: 'A-196', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'ZAMBRANA-BERANTEVILLA' },
        { id: 40, nombre: 'A-199', prioridad: 3, estado: 'CERRADO / ITXITA', direccion: 'IRUÑA-VITORIA' },
        { id: 41, nombre: 'A-202', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'LAGUARDIA-OYON' },
        { id: 42, nombre: 'A-205', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'LAUDIO-AMURRIO' },
        { id: 43, nombre: 'A-208', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'ZUAZO-MAROÑO' },
        { id: 44, nombre: 'A-211', prioridad: 5, estado: 'CERRADO / ITXITA', direccion: 'LIZARRA-BASTIDA' },
        { id: 45, nombre: 'A-214', prioridad: 5, estado: 'ABIERTO / IREKITA', direccion: 'OTAZAR-MURGIA' },
        { id: 46, nombre: 'A-217', prioridad: 5, estado: 'CADENAS / KATEAK', direccion: 'LEGUTIO-MIRANDA' },
        { id: 47, nombre: 'A-220', prioridad: 5, estado: 'ABIERTO / IREKITA', direccion: 'LLODIO-OKONDO' },
        { id: 48, nombre: 'A-223', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'ARTZINIEGA-VITORIA' },
        { id: 49, nombre: 'A-226', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'SANTURTZI-LLODIO' },
        { id: 50, nombre: 'A-229', prioridad: 1, estado: 'ABIERTO / IREKITA', direccion: 'VITORIA-MIRANDA' },
        { id: 51, nombre: 'A-232', prioridad: 2, estado: 'CERRADO / ITXITA', direccion: 'PUEBLA DE LABARCA-LOGROÑO' },
        { id: 52, nombre: 'A-235', prioridad: 2, estado: 'ABIERTO / IREKITA', direccion: 'ZALDUONDO-MONTES DE VITORIA' },
        { id: 53, nombre: 'A-238', prioridad: 2, estado: 'CADENAS / KATEAK', direccion: 'OYON-LOGROÑO' },
        { id: 54, nombre: 'A-241', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'MIRANDA-TREVIÑO' },
        { id: 55, nombre: 'A-244', prioridad: 3, estado: 'ABIERTO / IREKITA', direccion: 'LEGUTIO-URKABUSTAIZ' },
        { id: 56, nombre: 'A-247', prioridad: 3, estado: 'CERRADO / ITXITA', direccion: 'SALINAS-BARRIA' },
        { id: 57, nombre: 'A-250', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'PEÑACERRADA-VALLE DE ARANA' },
        { id: 58, nombre: 'A-253', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'LAUDIO-MURGIA' },
        { id: 59, nombre: 'A-256', prioridad: 4, estado: 'ABIERTO / IREKITA', direccion: 'ARTZINIEGA-LLODIO' },
        { id: 60, nombre: 'A-259', prioridad: 5, estado: 'CERRADO / ITXITA', direccion: 'VITORIA-GASTEIZ' }
    ];

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.carreterasFiltradas = [...this.carreteras]; // Inicializa con todas las carreteras
    }

    obtenerCarreterasPorPrioridad(prioridad: number): Carretera[] {
        return this.carreterasFiltradas.filter(carretera => carretera.prioridad === prioridad);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.carreterasFiltradas = filterValue
            ? this.carreteras.filter(carretera => carretera.nombre.toLowerCase().includes(filterValue))
            : [...this.carreteras]; // Restaurar lista original si no hay filtro
    }

    editarCarretera(carretera: Carretera) {
        const dialogRef = this.dialog.open(EditarCarreteraDialogComponent, {
            width: '600px',
            data: { ...carretera } // Pasa también la dirección al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = this.carreteras.findIndex(c => c.id === result.id);
                if (index !== -1) {
                    this.carreteras[index].estado = result.estado;
                    this.carreteras[index].direccion = result.direccion; // ✅ Actualiza también la dirección
                    this.carreterasFiltradas = [...this.carreteras]; // Refresca la vista
                }
            }
        });
    }

    filtrarCarreterasPorPrioridad(): void {
        if (this.prioridadSeleccionada !== null) {
            this.carreterasFiltradas = this.carreteras.filter(
                c => c.prioridad === this.prioridadSeleccionada
            );
        } else {
            this.carreterasFiltradas = [...this.carreteras]; // Mostrar todas si no hay filtro
        }
    }

    actualizarEstados(): void {
        if (!this.nuevoEstado || this.carreterasSeleccionadas.length === 0) {
            alert('Debe seleccionar carreteras y un nuevo estado.');
            return;
        }

        if (this.carreterasSeleccionadas.includes('todas')) {
            this.carreteras.forEach(carretera => {
                if (carretera.prioridad === this.prioridadSeleccionada) {
                    carretera.estado = this.nuevoEstado;
                }
            });
        } else {
            this.carreteras.forEach(carretera => {
                if (this.carreterasSeleccionadas.includes(carretera.nombre)) {
                    carretera.estado = this.nuevoEstado;
                }
            });
        }

        alert('Estados actualizados correctamente.');

        // Reset de selección
        this.carreterasSeleccionadas = [];
        this.nuevoEstado = '';
        this.prioridadSeleccionada = null;
        this.carreterasFiltradas = [...this.carreteras];
    }
}
