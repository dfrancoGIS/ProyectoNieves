import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// ✅ Obtener todos los estados
export function getAllEstados() {
  return sequelize.query(
    `SELECT Id_Estado, Descripcion_Estado FROM Estados`, 
    { type: QueryTypes.SELECT }
  );
}
