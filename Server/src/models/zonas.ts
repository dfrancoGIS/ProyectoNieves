import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todas las zonas disponibles.
 */
export function getAllZonas() {
  return sequelize.query(
    `SELECT Id_Zona, Orden_Zona 
     FROM Zonas ORDER BY Orden_Zona`,
    { type: QueryTypes.SELECT }
  );
}
