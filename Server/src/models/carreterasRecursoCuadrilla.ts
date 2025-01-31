import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todas las carreteras recurso cuadrilla de la última campaña activa.
 */
export async function getCarreterasRecursoCuadrilla() {
    return sequelize.query(
        `SELECT Id_Carreteras_Recurso_Cuadrilla, Id_Recurso_Cuadrilla, Carretera_Recurso_Cuadrilla, Id_Campania_Carretera_Recurso_Cuadrilla
         FROM Carreteras_Recurso_Cuadrilla`,
        { type: QueryTypes.SELECT }
    );
}
