import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Obtener los datos de `tener_cta` con el último id_campania_tener_cta
export function getTenerCtaUltimaCampania() {
  return sequelize.query(
    `
    SELECT * 
    FROM dbo.tener_cta
    WHERE id_campania_tener_cta = (
      SELECT MAX(id_campania_tener_cta)
      FROM dbo.tener_cta
    )
    `,
    { type: QueryTypes.SELECT }
  );
}

// Función para obtener los registros de "tener_cta" filtrados por campaña
export function getTenerCtaPorCampania(titulo_campania: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_tener_cta_por_campania(:titulo_campania)`,
    {
      replacements: { titulo_campania },
      type: QueryTypes.SELECT,
    }
  );
}

// Función para eliminar un registro de 'tener_cta' por su ID
export function eliminarTenerCta(v_id_tener_cta: number): Promise<void> {
  return sequelize.query(
    `
    CALL dbo.eliminar_tener_cta(:v_id_tener_cta);
    `,
    {
      replacements: { v_id_tener_cta }, // Reemplazamos el valor para evitar inyección SQL
      type: QueryTypes.RAW,
    }
  ).then(() => {
    // No se necesita devolver nada, solo resolvemos la promesa.
  });
}

// Función para insertar un nuevo registro en tener_cta
export function insertarTenerCta(descripcion_tener_cta: string, id_campania_tener_cta: number) {
  return sequelize.query(
    `CALL dbo.insertar_tener_cta(:descripcion_tener_cta, :id_campania_tener_cta);`,
    {
      replacements: { descripcion_tener_cta, id_campania_tener_cta },
      type: QueryTypes.RAW,
    }
  );
}

export async function editarTenerCta(id: string, datos: any): Promise<void> {
  try {
    await sequelize.query(
      `
      CALL dbo.actualizar_tener_cta(:id_tener_cta, :descripcion_tener_cta, :id_campania_tener_cta);
      `,
      {
        replacements: {
          id_tener_cta: id,  // ID que se desea actualizar
          descripcion_tener_cta: datos.descripcion_tener_cta,
          id_campania_tener_cta: datos.id_campania_tener_cta
        },
        type: QueryTypes.RAW,  // Usamos un raw query para llamar al procedimiento almacenado
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el registro: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el registro');
    }
  }
}