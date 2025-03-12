import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

export async function insertarActivacion(
  numeroTurno: number,
  fecha: string,
  hora: string,
  duracionTurno: number,
  activadoPor: string,
  empresaRecurso: string,
  recurso: string,
  vehiculo: string | null,
  tipoTurno: string,
  zona: string,
  personal1: string,
  rolPersonal1: string,
  personal2: string | null,
  rolPersonal2: string | null
): Promise<void> {
  try {
    await sequelize.query(
      `CALL dbo.insertar_activacion(
        :p_numeroTurno,
        :p_fecha,
        :p_hora,
        :p_duracionTurno,
        :p_activadoPor,
        :p_empresaRecurso,
        :p_recurso,
        :p_vehiculo,
        :p_tipoTurno,
        :p_zona,
        :p_personal1,
        :p_rolPersonal1,
        :p_personal2,
        :p_rolPersonal2
      );`,
      {
        replacements: {
          p_numeroTurno: numeroTurno,
          p_fecha: fecha,
          p_hora: hora,
          p_duracionTurno: duracionTurno,
          p_activadoPor: activadoPor,
          p_empresaRecurso: empresaRecurso,
          p_recurso: recurso,
          p_vehiculo: vehiculo || null,
          p_tipoTurno: tipoTurno,
          p_zona: zona,
          p_personal1: personal1,
          p_rolPersonal1: rolPersonal1,
          p_personal2: personal2 || null, // 🔹 Si es null, lo dejamos explícito
          p_rolPersonal2: rolPersonal2 || null // 🔹 Si es null, lo dejamos explícito
        },
        type: QueryTypes.RAW, // 🔹 Mejor práctica para procedimientos almacenados
      }
    );
  } catch (error) {
    console.error('❌ Error al insertar la activación:', error);
    throw new Error(`❌ Error al insertar la activación: ${error instanceof Error ? error.message : error}`);
  }
}

export async function editarActivacion(
  idActivacion: number,
  numeroTurno: number,
  fechaActivacion: string,
  duracionTurno: number,
  horaInicio: string,
  activadoPor: string,
  empresaRecurso: string,
  recurso: string,
  vehiculo: string | null,
  tipoTurno: string,
  zonaAsignada: string,
  personalAsignado1: string,
  ocupacionAsignado1: string,
  personalAsignado2: string | null,
  ocupacionAsignado2: string | null
): Promise<void> {
  try {
    await sequelize.query(
      `CALL dbo.sp_editar_activacion(
        :p_idActivacion,
        :p_numeroTurno,
        :p_fechaActivacion,
        :p_duracionTurno,
        :p_horaInicio,
        :p_activadoPor,
        :p_empresaRecurso,
        :p_recurso,
        :p_vehiculo,
        :p_tipoTurno,
        :p_zonaAsignada,
        :p_personalAsignado1,
        :p_ocupacionAsignado1,
        :p_personalAsignado2,
        :p_ocupacionAsignado2
      );`,
      {
        replacements: {
          p_idActivacion: idActivacion,
          p_numeroTurno: numeroTurno,
          p_fechaActivacion: fechaActivacion,
          p_duracionTurno: duracionTurno,
          p_horaInicio: horaInicio,
          p_activadoPor: activadoPor,
          p_empresaRecurso: empresaRecurso,
          p_recurso: recurso,
          p_vehiculo: vehiculo || null,
          p_tipoTurno: tipoTurno,
          p_zonaAsignada: zonaAsignada,
          p_personalAsignado1: personalAsignado1,
          p_ocupacionAsignado1: ocupacionAsignado1,
          p_personalAsignado2: personalAsignado2 || null,
          p_ocupacionAsignado2: ocupacionAsignado2 || null
        },
        type: QueryTypes.RAW, // Usamos RAW porque es un procedimiento almacenado
      }
    );
  } catch (error) {
    console.error('❌ Error al editar la activación:', error);
    throw new Error(`❌ Error al editar la activación: ${error instanceof Error ? error.message : error}`);
  }
}

/**
 * ✅ Recuperar todas las activaciones
 */
export async function obtenerActivaciones(): Promise<any[]> {
  try {
    const activaciones = await sequelize.query(
      `SELECT * FROM dbo.obtener_todas_activaciones();`,
      {
        type: QueryTypes.SELECT, // 🔹 Devolvemos un array de objetos
      }
    );

    return activaciones;
  } catch (error) {
    console.error('❌ Error al obtener las activaciones:', error);
    throw new Error(`❌ Error al obtener activaciones: ${error instanceof Error ? error.message : error}`);
  }

}

/**
 * ✅ Buscar una activación específica por fecha, hora y recurso
 */
export async function obtenerActivacionPorFechaHoraRecurso(
  fecha: string,
  horaInicio: string,
  recurso: string
): Promise<any | null> {
  try {
    const activacion = await sequelize.query(
      `SELECT * FROM dbo.activaciones 
       WHERE fecha_activacion = CAST(:p_fecha AS DATE) 
       AND TRIM(LOWER(recurso)) = TRIM(LOWER(:p_recurso))
       AND hora_inicio = CAST(:p_horaInicio AS TIME)
       LIMIT 1;`,
      {
        replacements: { 
          p_fecha: fecha, 
          p_horaInicio: horaInicio, 
          p_recurso: recurso 
        },
        type: QueryTypes.SELECT,
      }
    );

    return activacion.length > 0 ? activacion[0] : null;
  } catch (error) {
    console.error('❌ Error al buscar la activación:', error);
    throw new Error(`❌ Error al buscar activación: ${error instanceof Error ? error.message : error}`);
  }
}

