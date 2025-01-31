import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los registros de "Tener_Cta" de la última campaña activa.
 */
export async function getTenerCta() {
    return sequelize.query(
        `SELECT Id_Tener_Cta, Descripcion_Tener_Cta, Id_Campania_Tener_Cta
         FROM Tener_Cta`,
        { type: QueryTypes.SELECT }
    );
}
