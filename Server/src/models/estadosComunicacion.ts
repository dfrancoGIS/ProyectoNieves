import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import { getLastCampaignId } from './equipos';

/**
 * Obtiene todos los estados de comunicación disponibles en la última campaña activa.
 */
export async function getAllEstadosComunicacion() {
    const idCampania = await getLastCampaignId();
    if (!idCampania) {
        throw new Error("No hay campañas activas disponibles.");
    }

    return sequelize.query(
        `SELECT Id_Estado_Comunicacion, Descripcion_Estado_Comunicacion, Id_Campania_Estados_Comunicacion
         FROM Estados_Comunicacion
         WHERE Id_Campania_Estados_Comunicacion = :idCampania`,
        { 
            replacements: { idCampania }, 
            type: QueryTypes.SELECT 
        }
    );
}

/**
 * Inserta un nuevo estado de comunicación en la base de datos.
 */
export async function registrarNuevoEstadoComunicacion(descripcion: string) {
    const idCampania = await getLastCampaignId();
    if (!idCampania) {
        throw new Error("No hay campañas activas disponibles.");
    }

    return sequelize.query(
        `INSERT INTO Estados_Comunicacion (Descripcion_Estado_Comunicacion, Id_Campania_Estados_Comunicacion)
         VALUES (:descripcion, :idCampania)`,
        {
            replacements: { descripcion, idCampania },
            type: QueryTypes.INSERT,
        }
    );
}
