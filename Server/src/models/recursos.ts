import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener los recursos asociados a la última campaña
export function getRecursosUltimaCampania() {
  return sequelize.query(
    `
    SELECT *
    FROM dbo.recursos
    WHERE id_campania_recursos = (
      SELECT MAX(id_campania_recursos)
      FROM dbo.recursos
    )
    `,
    { type: QueryTypes.SELECT }
  );
}

// Función para obtener las tareas filtradas por título de campaña
export function getTareasPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_tareas_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}

/**
 * ✅ Obtener los registros de recursos filtrados por el título de la campaña
 */
export function getRecursosPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_recursos_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}

/**
 * Obtiene todos los recursos.
 */
export function getAllRecursos() {
  return sequelize.query(
      `SELECT * FROM obtener_recursos();`,
      { type: QueryTypes.SELECT }
  );
}
// Función para eliminar un recurso
export function eliminarRecurso(idRecurso: string) {
  return sequelize.query(
    'CALL dbo.eliminar_recurso(:id_recurso);',
    {
      replacements: { id_recurso: idRecurso },
      type: QueryTypes.RAW,
    }
  );
}


// Función para insertar un recurso
export function insertarRecurso(id_recurso: string, empresa_recurso: string, id_campania_recursos: number) {
  return sequelize.query(
    `CALL dbo.insertar_recurso(:id_recurso, :empresa_recurso, :id_campania_recursos)`,
    {
      replacements: {
        id_recurso,
        empresa_recurso,
        id_campania_recursos,
      },
      type: QueryTypes.RAW,
    }
  );
}

export async function editarRecurso(id: string, datos: any): Promise<void> {
  try {
    // Realizamos la consulta de actualización
    await sequelize.query(
      `
      UPDATE dbo.recursos
      SET 
        id_recurso = :id_recurso,  -- Aquí actualizamos el id_recurso
        empresa_recurso = :empresa_recurso,
        id_campania_recursos = :id_campania_recursos
      WHERE id_recurso = :id_recurso  -- Filtramos por el id_recurso
      `,
      {
        replacements: {
          id_recurso: id,  // El ID que se desea cambiar, que es un texto
          empresa_recurso: datos.empresa_recurso,
          id_campania_recursos: datos.id_campania_recursos,
        },
        type: QueryTypes.UPDATE,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el recurso: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el recurso');
    }
  }
}