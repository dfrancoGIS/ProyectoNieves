import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los registros de la tabla `estados` dentro del esquema `dbo`.
 */
export function getAllEstados() {
    return sequelize.query(
        `
        SELECT * 
        FROM dbo.estados
        `,
        { type: QueryTypes.SELECT }
    );
}


export function eliminarEstado(id_estado: number): Promise<void> {
  return sequelize.query(
    `
    CALL dbo.eliminar_estado(:id_estado);
    `,
    {
      replacements: { id_estado },  // Asegúrate de pasar el parámetro correctamente
      type: QueryTypes.RAW,
    }
  ).then(() => {
    // Promesa resuelta correctamente
  });
}

export const insertarEstado = async (descripcion_estado: string, color_estado_r: number, color_estado_g: number, color_estado_b: number) => {
  try {
    await sequelize.query(
      'CALL dbo.insertar_estado(:descripcion_estado, :color_estado_r, :color_estado_g, :color_estado_b)',
      {
        replacements: { descripcion_estado, color_estado_r, color_estado_g, color_estado_b },
        type: QueryTypes.RAW,
      }
    );
  } catch (error: any) {
    throw new Error(`Error al insertar estado: ${(error as Error).message}`);
  }
};

export async function editarEstado(id: string, datos: any): Promise<void> {
  try {
    // Realizamos la consulta para actualizar el estado
    await sequelize.query(
      `
      UPDATE dbo.estados
      SET 
        descripcion_estado = :descripcion_estado,
        color_estado_r = :color_estado_r,
        color_estado_g = :color_estado_g,
        color_estado_b = :color_estado_b
      WHERE id_estado = :id
      `,
      {
        replacements: {
          id,
          descripcion_estado: datos.descripcion_estado,
          color_estado_r: datos.color_estado_r,
          color_estado_g: datos.color_estado_g,
          color_estado_b: datos.color_estado_b
        },
        type: QueryTypes.UPDATE,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el estado: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el estado');
    }
  }
}