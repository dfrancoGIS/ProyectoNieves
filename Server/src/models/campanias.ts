import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener todas las campañas
export function getCampanias() {
    return sequelize.query(
      `
      SELECT *
      FROM dbo."Campañas"
      `,
      { type: QueryTypes.SELECT }
    );
}

// Función para obtener campañas filtradas por titulo_campania
export function getCampaniasFiltradas(tituloCampania: string) {
  return sequelize.query(
    `
    SELECT *
    FROM dbo."Campañas"
    WHERE titulo_campania = :tituloCampania
    `,
    {
      replacements: { tituloCampania },
      type: QueryTypes.SELECT
    }
  );
}

// Función para eliminar una campaña por su ID
export function eliminarCampania(id_campania: number): Promise<void> {
  return sequelize.query(
    `
    CALL dbo.eliminar_campanias(:id_campania);
    `,
    {
      replacements: { id_campania },
      type: QueryTypes.RAW,
    }
  ).then(() => {});
}

// ✅ Actualizar la fecha de fin de la campaña anterior
export async function actualizarFinCampaniaAnterior(fechaFinAnterior: string): Promise<void> {
  try {
    await sequelize.query(
      `CALL dbo.actualizar_fin_campania(:fechaFinAnterior)`,
      {
        replacements: { fechaFinAnterior },
        type: QueryTypes.RAW,
      }
    );
  } catch (error) {
    console.error('❌ Error al actualizar la fecha de fin de la campaña anterior:', error);
    throw new Error('Error al actualizar la fecha de fin de la campaña anterior.');
  }
}

// ✅ Insertar una nueva campaña y devolver su ID
export async function insertarNuevaCampania(titulo: string, fechaInicio: string): Promise<number> {
  try {
    const result = await sequelize.query(
      `
      INSERT INTO dbo."Campañas" (titulo_campania, inicio_campania, fin_campania)
      VALUES (:titulo, :fechaInicio, NULL)
      RETURNING id_campania;
      `,
      {
        replacements: { titulo, fechaInicio },
        type: QueryTypes.SELECT,
      }
    );

    return (result as any)[0].id_campania; // Devuelve el ID de la nueva campaña
  } catch (error) {
    console.error('❌ Error al insertar la nueva campaña:', error);
    throw new Error('Error al insertar la nueva campaña.');
  }
}

// ✅ Replicar datos de la última campaña a la nueva
export async function replicarDatosNuevaCampania(idCampaniaAnterior: number, idCampaniaNueva: number): Promise<void> {
  try {
    await sequelize.query(
      `CALL dbo.replicar_datos_nueva_campania(:idCampaniaAnterior, :idCampaniaNueva)`,
      {
        replacements: { idCampaniaAnterior, idCampaniaNueva },
        type: QueryTypes.RAW,
      }
    );
  } catch (error) {
    console.error('❌ Error al replicar datos de la campaña anterior:', error);
    throw new Error('Error al replicar datos de la campaña anterior.');
  }
}
