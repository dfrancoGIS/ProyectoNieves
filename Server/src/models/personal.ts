import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para llamar al procedimiento almacenado `get_personal`
export function getPersonal() {
  return sequelize.query(
    'SELECT * FROM get_personal()', // Llamada directa a la función
    {
      type: QueryTypes.SELECT,
    }
  );
}
