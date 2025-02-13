import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener las zonas ordenadas
export function getZonasCarretera() {
  return sequelize.query('SELECT * FROM get_zonas() ORDER BY orden_zona ASC', {
    type: QueryTypes.SELECT,
  });
}

