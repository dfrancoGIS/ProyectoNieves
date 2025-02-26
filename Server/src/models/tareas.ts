import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener las tareas asociadas a la última campaña
export function getTareasUltimaCampania() {
  return sequelize.query(
    `
    SELECT *
    FROM dbo.tareas
    WHERE id_campania_tareas = (
      SELECT MAX(id_campania_tareas)
      FROM dbo.tareas
    )
    `,
    { type: QueryTypes.SELECT }
  );
}

// Función para eliminar una tarea por su ID
export function eliminarTarea(id_tarea: number): Promise<void> {
  return sequelize.query(
    `
    CALL dbo.eliminar_tarea(:id_tarea);
    `,
    {
      replacements: { id_tarea },
      type: QueryTypes.RAW,
    }
  ).then(() => {
    // Aquí no necesitamos devolver nada, simplemente resolvemos la promesa.
  });
}

// Función para insertar una tarea
export function insertarTarea(descripcion_tarea: string, color_tarea_r: number, color_tarea_g: number, color_tarea_b: number, id_campania_tareas: number) {
  return sequelize.query(
    'CALL dbo.insertar_tarea(:descripcion_tarea, :color_tarea_r, :color_tarea_g, :color_tarea_b, :id_campania_tareas)',
    {
      replacements: { descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas },
      type: QueryTypes.RAW,
    }
  );
}

export function getTareasPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_tareas_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}


export async function editarTarea(id: string, datos: any): Promise<void> {
  try {
    // Aquí utilizamos una consulta SQL para actualizar el registro de la tarea
    await sequelize.query(
      `
      UPDATE dbo.tareas
      SET 
        descripcion_tarea = :descripcion_tarea,
        color_tarea_r = :color_tarea_r,
        color_tarea_g = :color_tarea_g,
        color_tarea_b = :color_tarea_b,
        id_campania_tareas = :id_campania_tareas
      WHERE id_tarea = :id
      `,
      {
        replacements: {
          id,
          descripcion_tarea: datos.descripcion_tarea,
          color_tarea_r: datos.color_tarea_r,
          color_tarea_g: datos.color_tarea_g,
          color_tarea_b: datos.color_tarea_b,
          id_campania_tareas: datos.id_campania_tareas,
        },
        type: QueryTypes.UPDATE,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el registro de la tarea: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el registro de la tarea');
    }
  }
}
