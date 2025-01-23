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

    carreteras: Carretera[] = [
        { id: 1, nombre: 'A-132', prioridad: 1, estado: 'ABIERTO / IREKITA' },
        { id: 2, nombre: 'A-124', prioridad: 1, estado: 'ABIERTO / IREKITA' },
        { id: 3, nombre: 'N-1', prioridad: 1, estado: 'ABIERTO / IREKITA' },
        { id: 4, nombre: 'N-102', prioridad: 2, estado: 'CERRADO / ITXITA' },
        { id: 5, nombre: 'A-2128', prioridad: 2, estado: 'ABIERTO / IREKITA' },
        { id: 6, nombre: 'AP-1', prioridad: 2, estado: 'ABIERTO / IREKITA' },
        { id: 7, nombre: 'A-2124', prioridad: 3, estado: 'CADENAS / KATEAK' },
        { id: 8, nombre: 'A-2522', prioridad: 3, estado: 'ABIERTO / IREKITA' },
        { id: 9, nombre: 'A-2624', prioridad: 3, estado: 'ABIERTO / IREKITA' },
        { id: 10, nombre: 'A-4005', prioridad: 4, estado: 'ABIERTO / IREKITA' },
        { id: 11, nombre: 'A-4016', prioridad: 4, estado: 'ABIERTO / IREKITA' },
        { id: 12, nombre: 'A-5005', prioridad: 4, estado: 'ABIERTO / IREKITA' },
        { id: 13, nombre: 'A-2126', prioridad: 5, estado: 'ABIERTO / IREKITA' },
        { id: 14, nombre: 'A-2128', prioridad: 5, estado: 'ABIERTO / IREKITA' },
        { id: 15, nombre: 'A-2628', prioridad: 5, estado: 'CERRADO / ITXITA' }
    ];

    carreterasFiltradas: Carretera[] = [...this.carreteras];

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    obtenerCarreterasPorPrioridad(prioridad: number): Carretera[] {
        return this.carreterasFiltradas.filter(carretera => carretera.prioridad === prioridad);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        if (filterValue) {
            this.carreterasFiltradas = this.carreteras.filter(carretera =>
                carretera.nombre.toLowerCase().includes(filterValue)
            );
        } else {
            this.carreterasFiltradas = [...this.carreteras]; // Restaurar lista original
        }
    }

    editarCarretera(carretera: Carretera) {
        const dialogRef = this.dialog.open(EditarCarreteraDialogComponent, {
            width: '600px',
            data: { ...carretera }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = this.carreteras.findIndex(c => c.id === result.id);
                if (index !== -1) {
                    this.carreteras[index] = result;
                    this.carreterasFiltradas = [...this.carreteras];
                }
            }
        });
    }
}
