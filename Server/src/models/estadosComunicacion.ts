import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener los estados de comunicación asociados al último id_campania_estados_comunicacion
export function getEstadosComunicacionUltimaCampania() {
  return sequelize.query(
    `
    SELECT *
    FROM dbo.estados_comunicacion
    WHERE id_campania_estados_comunicacion = (
      SELECT MAX(id_campania_estados_comunicacion)
      FROM dbo.estados_comunicacion
    )
    `,
    { type: QueryTypes.SELECT }
  );
}

/**
 * Obtener los estados de comunicación filtrados por campaña llamando a la función almacenada
 */
export function getEstadosComunicacionPorCampania(tituloCampana: string) {
  return sequelize.query(
    `
    SELECT * FROM dbo.filtrar_estados_comunicacion_por_campania(:tituloCampana);
    `,
    {
      replacements: { tituloCampana },
      type: QueryTypes.SELECT,
    }
  );
}

// Función para eliminar un estado de comunicación por su ID
export function eliminarEstadoComunicacion(id_estado_comunicacion: number): Promise<void> {
  return sequelize.query(
    `
    CALL dbo.eliminar_estado_comunicacion(:id_estado_comunicacion);
    `,
    {
      replacements: { id_estado_comunicacion },  // Usar la variable de reemplazo para evitar inyección
      type: QueryTypes.RAW,
    }
  ).then(() => {
    // No necesitamos devolver nada, solo indicamos que se completó
  });
}

// Función para insertar un nuevo estado de comunicación
export function insertarEstadoComunicacion(descripcion_estado_comunicacion: string, id_campania_estados_comunicacion: number) {
  return sequelize.query(
    'CALL dbo.insertar_estado_comunicacion(:descripcion_estado_comunicacion, :id_campania_estados_comunicacion)',
    {
      replacements: { descripcion_estado_comunicacion, id_campania_estados_comunicacion },
      type: QueryTypes.RAW,
    }
  );
}

export async function editarEstadoComunicacion(id: string, datos: any): Promise<void> {
  try {
    // Realizamos la consulta para actualizar el estado de comunicación
    await sequelize.query(
      `
      UPDATE dbo.estados_comunicacion
      SET 
        descripcion_estado_comunicacion = :descripcion_estado_comunicacion,
        id_campania_estados_comunicacion = :id_campania_estados_comunicacion
      WHERE id_estado_comunicacion = :id
      `,
      {
        replacements: {
          id,
          descripcion_estado_comunicacion: datos.descripcion_estado_comunicacion,
          id_campania_estados_comunicacion: datos.id_campania_estados_comunicacion
        },
        type: QueryTypes.UPDATE,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el estado de comunicación: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el estado de comunicación');
    }
  }
}