import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import { getLastCampaignId } from './equipos';

/**
 * Obtiene todas las comunicaciones de la última campaña activa.
 */
export async function getAllComunicaciones() {
    const idCampania = await getLastCampaignId();
    if (!idCampania) {
        throw new Error("❌ No hay campañas activas.");
    }

    return sequelize.query(
        `SELECT c.Id_Comunicacion, c.Fecha_Hora_Comunicacion, c.Equipo_Comunicacion, e.Recurso_Equipo,
                v.Id_Vehiculo, v.Descripcion_Vehiculo, 
                c.Zona_Comunicacion, z.Orden_Zona, 
                c.Prioridad_Comunicacion, c.Carretera_Comunicacion, 
                c.PK_Inicio_Comunicaciones, c.PK_Fin_Comunicaciones, 
                c.Tarea_Comunicacion, t.Descripcion_Tarea,
                c.Estado_Ctra_Comunicacion, es.Descripcion_Estado, 
                c.Tener_Cta_Comunicacion, tc.Descripcion_Tener_Cta,
                c.Observaciones_Comunicacion
         FROM Comunicaciones c
         LEFT JOIN Equipos e ON c.Equipo_Comunicacion = e.Id_Equipo
         LEFT JOIN Vehiculos v ON e.Vehiculo_Equipo = v.Id_Vehiculo
         LEFT JOIN Zonas z ON c.Zona_Comunicacion = z.Id_Zona
         LEFT JOIN Tareas t ON c.Tarea_Comunicacion = t.Id_Tarea
         LEFT JOIN Estados es ON c.Estado_Ctra_Comunicacion = es.Id_Estado
         LEFT JOIN Tener_Cta tc ON c.Tener_Cta_Comunicacion = tc.Id_Tener_Cta
         WHERE c.Id_Campania_Comunicacion = :idCampania`,
        {
            replacements: { idCampania },
            type: QueryTypes.SELECT
        }
    );
}

/**
 * Obtiene el ID de una carretera en base a su nombre.
 */
export async function getCarreteraIdByNombre(nombre: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Carretera FROM Carreteras WHERE LTRIM(RTRIM(UPPER(Carretera))) = LTRIM(RTRIM(UPPER(:nombre)))`,
        { replacements: { nombre }, type: QueryTypes.SELECT }
    );

    // Log para verificar si se encuentra la carretera
    console.log(`🔎 Buscando ID de carretera para: '${nombre}' → Resultado:`, result[0]?.Id_Carretera);

    return result[0]?.Id_Carretera || null;
}

/**
 * Obtiene una comunicación específica por ID.
 */
export async function getComunicacionById(idComunicacion: number) {
    return sequelize.query(
        `SELECT * FROM Comunicaciones WHERE Id_Comunicacion = :idComunicacion`,
        {
            replacements: { idComunicacion },
            type: QueryTypes.SELECT
        }
    );
}
/**
 * Obtiene el siguiente ID de comunicación.
 */
export async function getNextIdComunicacion() {
    const result: any = await sequelize.query(
        `SELECT MAX(Id_Comunicacion) + 1 AS nextId FROM Comunicaciones`,
        { type: QueryTypes.SELECT }
    );
    return result[0]?.nextId || 1;
}

/**
 * Obtiene el ID del equipo en base a su recurso.
 */
export async function getEquipoIdByRecurso(recurso: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Equipo FROM Equipos WHERE LTRIM(RTRIM(UPPER(Recurso_Equipo))) = LTRIM(RTRIM(UPPER(:recurso)))`,
        { replacements: { recurso }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Equipo || null;
}


/**
 * Obtiene el ID del recurso en base a su nombre.
 */
export async function getRecursoIdByNombre(nombre: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Recurso FROM Recursos WHERE Empresa_Recurso = :nombre`,
        { replacements: { nombre }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Recurso || null;
}

/**
 * Obtiene el ID de la zona en base a su nombre.
 */
export async function getZonaIdByNombre(nombre: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Zona FROM Zonas WHERE LTRIM(RTRIM(UPPER(Id_Zona))) = LTRIM(RTRIM(UPPER(:nombre)))`,
        { replacements: { nombre }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Zona || null;
}

/**
 * Obtiene los PK de una carretera en base a su nombre.
 */
export async function getPKByCarretera(nombre: string) {
    const result: any = await sequelize.query(
        `SELECT PK_Inferior, PK_Superior FROM Carreteras WHERE LTRIM(RTRIM(UPPER(Carretera))) = LTRIM(RTRIM(UPPER(:nombre)))`,
        { replacements: { nombre }, type: QueryTypes.SELECT }
    );
    return result[0] || { PK_Inferior: null, PK_Superior: null };
}

/**
 * Obtiene el ID de la tarea en base a su descripción.
 */
export async function getTareaIdByDescripcion(descripcion: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Tarea FROM Tareas WHERE Descripcion_Tarea = :descripcion`,
        { replacements: { descripcion }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Tarea || null;
}

/**
 * Obtiene el ID del estado en base a su descripción.
 */
export async function getEstadoIdByDescripcion(descripcion: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Estado FROM Estados WHERE Descripcion_Estado = :descripcion`,
        { replacements: { descripcion }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Estado || null;
}

/**
 * Obtiene el ID de "Tener en cuenta" en base a su descripción.
 */
export async function getTenerCtaIdByDescripcion(descripcion: string) {
    const result: any = await sequelize.query(
        `SELECT Id_Tener_Cta FROM Tener_Cta WHERE LTRIM(RTRIM(UPPER(Descripcion_Tener_Cta))) = LTRIM(RTRIM(UPPER(:descripcion)))`,
        { replacements: { descripcion }, type: QueryTypes.SELECT }
    );
    return result[0]?.Id_Tener_Cta || null;
}

/**
 * Inserta una nueva comunicación en la base de datos.
 */
export async function registrarComunicacion(
    equipo: string,
    recurso: string,
    zona: string,
    prioridad: number,
    carretera: string,
    tarea: string,
    estadoCarretera: string,
    tenerCta: string,
    observaciones: string
) {
    const idComunicacion = await getNextIdComunicacion();
    console.log("🟢 ID de Comunicación generado:", idComunicacion);

    const idEquipo = await getEquipoIdByRecurso(equipo);
    console.log("🔹 ID de Equipo:", idEquipo);

    const idRecurso = await getRecursoIdByNombre(recurso);
    console.log("🔹 ID de Recurso:", idRecurso);

    const idZona = await getZonaIdByNombre(zona);
    console.log("🔹 ID de Zona:", idZona);

    const { PK_Inferior, PK_Superior } = await getPKByCarretera(carretera);
    console.log("🔹 PK Inicio:", PK_Inferior, "PK Fin:", PK_Superior);

    const idCarretera = await getCarreteraIdByNombre(carretera);
    console.log("🔹 ID de Carretera:", idCarretera);

    if (!idCarretera) {
        throw new Error(`❌ Error: No se encontró un ID para la carretera '${carretera}'. Verifica que el nombre es correcto.`);
    }

    const idTarea = await getTareaIdByDescripcion(tarea);
    console.log("🔹 ID de Tarea:", idTarea);

    const idEstado = await getEstadoIdByDescripcion(estadoCarretera);
    console.log("🔹 ID de Estado de Carretera:", idEstado);

    const idTenerCta = await getTenerCtaIdByDescripcion(tenerCta);
    console.log("🔹 ID de Tener en cuenta:", idTenerCta);

    const idCampania = await getLastCampaignId();
    console.log("🔹 ID de Campaña:", idCampania);

    // Si alguno es null, mostramos el error específico
    if (!idEquipo || !idRecurso || !idZona || !idTarea || !idEstado || !idTenerCta || !idCampania) {
        throw new Error(`❌ Error: Algunos identificadores no se resolvieron correctamente:
        - idEquipo: ${idEquipo}
        - idRecurso: ${idRecurso}
        - idZona: ${idZona}
        - PK_Inferior: ${PK_Inferior}, PK_Superior: ${PK_Superior}
        - idCarretera: ${idCarretera}
        - idTarea: ${idTarea}
        - idEstado: ${idEstado}
        - idTenerCta: ${idTenerCta}
        - idCampania: ${idCampania}`);
    }

    const fechaHora = new Date().toISOString().slice(0, 19).replace('T', ' '); // Fecha actual en formato SQL

    return await sequelize.query(
        `INSERT INTO Comunicaciones (Equipo_Comunicacion, Recurso_Comunicacion, Zona_Comunicacion, 
                                     Prioridad_Comunicacion, Carretera_Comunicacion, PK_Inicio_Comunicaciones, 
                                     PK_Fin_Comunicaciones, Tarea_Comunicacion, Estado_Ctra_Comunicacion, 
                                     Tener_Cta_Comunicacion, Observaciones_Comunicacion, Fecha_Hora_Comunicacion, Id_Campania_Comunicacion)
         VALUES (:idEquipo, :idRecurso, :idZona, :prioridad, :idCarretera, :PK_Inferior, :PK_Superior, 
                 :idTarea, :idEstado, :idTenerCta, :observaciones, :fechaHora, :idCampania)`,
        {
            replacements: {
                idEquipo, idRecurso, idZona, prioridad, idCarretera, PK_Inferior, PK_Superior, 
                idTarea, idEstado, idTenerCta, observaciones, fechaHora, idCampania
            },
           

            type: QueryTypes.INSERT
        }
    );
}




