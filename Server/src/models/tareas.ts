import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todas las tareas disponibles.
 */
export function getAllTareas() {
  return sequelize.query(
    `SELECT Id_tarea, Descripcion_Tarea, Color_Tarea_R, Color_Tarea_G, Color_Tarea_B, Id_Campania_Tareas 
     FROM Tareas ORDER BY Id_tarea`,
    { type: QueryTypes.SELECT }
  );
}