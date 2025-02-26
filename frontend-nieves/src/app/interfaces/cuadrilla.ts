export interface Cuadrilla {
    id_recurso_cuadrilla: string;
    descripcion_cuadrilla: string;
    localidad_recurso: string | null;
    responsable_recurso: string;
    vehiculo_recurso: string | null;
    modelo_recurso: string | null;
    equipo1_recurso: string | null;
    equipo2_recurso: string | null;
    equipo3_recurso: string | null;
    cuadrilla?: string;  // 🔹 Agregar esta línea
}
