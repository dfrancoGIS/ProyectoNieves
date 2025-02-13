import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// ✅ Obtener todos los estados
export function getAllEstados() {
  return sequelize.query(
    `SELECT id_estado, descripcion_estado FROM dbo.estados`, // Incluye el esquema
    { type: QueryTypes.SELECT }
  );
}

