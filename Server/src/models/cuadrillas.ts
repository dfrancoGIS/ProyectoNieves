import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todas las cuadrillas disponibles.
 */
export function getAllCuadrillas() {
  return sequelize.query(
    `SELECT Id_Cuadrilla, Descripcion_Cuadrilla 
     FROM Cuadrillas`,
    { type: QueryTypes.SELECT }
  );
}
