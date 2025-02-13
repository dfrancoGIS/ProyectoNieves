import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener las carreteras con su estado
export function getCarreterasConEstado() {
  return sequelize.query('SELECT * FROM select_carreteras_con_estado()', {
    type: QueryTypes.SELECT,
  });
}

// Función para actualizar el estado de una carretera
export function updateEstadoCarretera(id_carretera: number, nuevo_estado: string) {
  return sequelize.query('CALL actualizar_estado_carretera(:id, :estado)', {
    replacements: { id: id_carretera, estado: nuevo_estado },
    type: QueryTypes.RAW, // Ejecuta el procedimiento almacenado
  });
}
