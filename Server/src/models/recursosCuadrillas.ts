import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los recursos.
 */
export function getRecursosCuadrillas() {
    return sequelize.query(
        `SELECT * FROM dbo.obtener_recursos_cuadrillas();`,
        { type: QueryTypes.SELECT }
    );
  }