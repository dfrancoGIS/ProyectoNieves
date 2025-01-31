import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todas las tablas de mantenimiento.
 */
export function getAllTablasMantenimiento() {
  return sequelize.query(
    `SELECT Tabla, Descripcion, Orden, InfoCampaña, OcultarID 
     FROM Tablas_Mantenimiento ORDER BY Orden`,
    { type: QueryTypes.SELECT }
  );
}
