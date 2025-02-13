import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los recursos.
 */
export function getAllRecursos() {
  return sequelize.query(
      `SELECT * FROM obtener_recursos();`,
      { type: QueryTypes.SELECT }
  );
}
