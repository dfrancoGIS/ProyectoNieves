import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los recursos.
 */
export function getAllRecursos() {
  return sequelize.query(
    `SELECT Id_Recurso, Empresa_Recurso, Id_Campania_Recursos 
     FROM Recursos`,
    { type: QueryTypes.SELECT }
  );
}
