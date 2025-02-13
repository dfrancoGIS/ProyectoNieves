import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener los datos del historial de equipos
export function getHistorialEquipos() {
  return sequelize.query(
    `SELECT DISTINCT ON (recurso_equipo) * 
     FROM obtener_historico_equipos()
     ORDER BY recurso_equipo, fecha_inicio DESC`, // Seleccionamos el más reciente por cada recurso
    { type: QueryTypes.SELECT }
  );
}
