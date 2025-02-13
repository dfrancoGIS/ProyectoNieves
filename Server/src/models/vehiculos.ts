import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';  

/**
 * Obtiene todos los vehículos usando la función de PostgreSQL.
 */
export function getAllVehiculos() {
    return sequelize.query(
        `SELECT * FROM obtener_vehiculos_ultima_campania()`,
        { type: QueryTypes.SELECT }
    );
}

