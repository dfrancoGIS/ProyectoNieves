import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carretera } from 'src/app/interfaces/carretera';
import { EditarCarreteraDialogComponent } from '../../dialogs/editar-carretera-dialog/editar-carretera-dialog.component';
import { CarreterasService } from 'src/app/services/carreteras.service';  // Importa el servicio

@Component({
    selector: 'app-carreteras',
    templateUrl: './carreteras.component.html',
    styleUrls: ['./carreteras.component.scss']
})
export class CarreterasComponent implements OnInit {

    prioridades = [1, 2, 3, 4, 5];
    estados: string[] = []; // Ahora los estados se obtendrán del backend
    carreteras: Carretera[] = [];
    carreterasFiltradas: Carretera[] = [];
    prioridadSeleccionada: number | null = null;
    carreterasSeleccionadas: string[] = [];
    nuevoEstado: string = '';

    constructor(private dialog: MatDialog, private carreterasService: CarreterasService) {}

    ngOnInit() {
        this.cargarCarreteras();  // Cargar carreteras desde el backend
        this.cargarEstados();     // Cargar estados desde el backend
    }

    cargarCarreteras() {
        this.carreterasService.getCarreteras().subscribe((response: any) => {
            console.log('Respuesta de la API:', response); // Para depuración
    
            this.carreteras = response.data.map((c: any) => ({
                id: c.id_carretera, // ✅ Convertir `id_carretera` a `id`
                nombre: c.carretera, // ✅ Convertir `carretera` a `nombre`
                prioridad: c.prioridad_carretera, // ✅ Convertir `prioridad_carretera` a `prioridad`
                estado: c.estado, // ✅ Mantener `estado`
                direccion: c.direccion_carretera ?? 'Desconocida' // ✅ Convertir `direccion_carretera` a `direccion`
            }));
    
            this.carreterasFiltradas = [...this.carreteras]; // Para manipulación y filtrado
        }, (error) => {
            console.error('Error al obtener las carreteras', error);
            this.carreteras = [];
        });
    }

    cargarEstados() {
        this.carreterasService.getEstados().subscribe({
            next: (response: any) => {
                this.estados = response.data.map((estado: any) => estado.descripcion_estado); // Extrae solo los nombres de los estados
                console.log('Estados cargados:', this.estados); // Para depuración
            },
            error: (error) => {
                console.error('Error al obtener los estados:', error);
            }
        });
    }

    getEstadoClase(estado: string): string {
        switch (estado) {
            case 'ABIERTA / IREKITA': return 'estado-verde';
            case 'CERRADA / ITXITA':
            case 'CERRADA ACCIDENTE / ITXITA, ISTRIPUAGATIK': return 'estado-negro';
            case 'CADENAS / KATEEKIN':
            case 'CERRADA PESADOS / ITXITA IBILGAILU ASTUNENTZAT': return 'estado-rojo';
            case 'ABIERTA-PRECAUCIÓN / IREKITA, KONTUZ!':
            case 'ALERTA NIEVE/HIELO / KONTUZ! ELURRA/IZOTZA': return 'estado-amarillo';
            default: return '';
        }
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
            data: { ...carretera }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // Llama al servicio para actualizar en el backend
                this.carreterasService.actualizarEstadoCarretera(result.id, result.estado).subscribe({
                    next: () => {
                        // Actualiza el frontend
                        const index = this.carreteras.findIndex(c => c.id === result.id);
                        if (index !== -1) {
                            this.carreteras[index] = result; // Actualiza toda la carretera
                            this.carreterasFiltradas = [...this.carreteras]; // Refresca la vista
                        }
                    },
                    error: (err) => {
                        console.error('Error al actualizar el estado de la carretera:', err);
                        alert('No se pudo actualizar el estado en el servidor.');
                    }
                });
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
        if (!this.nuevoEstado) {
            alert('Debe seleccionar un nuevo estado.');
            return;
        }
    
        let carreterasAActualizar: Carretera[];
    
        // Si seleccionas "Todas", filtra por prioridad seleccionada
        if (this.carreterasSeleccionadas.includes('todas')) {
            if (this.prioridadSeleccionada !== null) {
                carreterasAActualizar = this.carreteras.filter(
                    carretera => carretera.prioridad === this.prioridadSeleccionada
                );
            } else {
                alert('Debe seleccionar una prioridad para actualizar todas las carreteras.');
                return;
            }
        } else {
            // Si no seleccionaste "Todas", actualiza solo las seleccionadas
            carreterasAActualizar = this.carreteras.filter(carretera =>
                this.carreterasSeleccionadas.includes(carretera.nombre)
            );
        }
    
        // Enviar actualización al backend
        const peticiones = carreterasAActualizar.map(carretera =>
            this.carreterasService.actualizarEstadoCarretera(carretera.id, this.nuevoEstado)
        );
    
        Promise.all(peticiones.map(p => p.toPromise()))
            .then(() => {
                // Actualiza el estado de las carreteras en el frontend
                carreterasAActualizar.forEach(carretera => {
                    carretera.estado = this.nuevoEstado;
                });
    
                alert('Estados actualizados correctamente.');
                this.resetSeleccion();
            })
            .catch(error => {
                console.error("Error al actualizar estado:", error);
            });
    }
    
    resetSeleccion(): void {
        this.carreterasSeleccionadas = [];
        this.nuevoEstado = '';
        this.prioridadSeleccionada = null;
        this.carreterasFiltradas = [...this.carreteras];
    }

    filtrarPorNombreODireccion(event: Event): void {
        const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
        if (filtro) {
            this.carreterasFiltradas = this.carreteras.filter(carretera =>
                carretera.nombre.toLowerCase().includes(filtro) ||
                carretera.direccion.toLowerCase().includes(filtro)
            );
        } else {
            this.carreterasFiltradas = [...this.carreteras]; // Restaurar todas las carreteras si no hay filtro
        }
    }
    
}
