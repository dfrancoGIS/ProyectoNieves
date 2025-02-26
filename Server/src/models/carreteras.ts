import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener las carreteras con su estado
export function getCarreterasConEstado() {
  return sequelize.query('SELECT * FROM select_carreteras_con_estado()', {
    type: QueryTypes.SELECT,
  });
}


// Obtener las carreteras filtradas por título de campaña (usando la función en la BDD)
export function getCarreterasPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_carreteras_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}

// Función para actualizar el estado de una carretera
export function updateEstadoCarretera(id_carretera: number, nuevo_estado: string) {
  return sequelize.query('CALL dbo.actualizar_estado_carretera(:id, :estado)', {
    replacements: { id: id_carretera, estado: nuevo_estado },
    type: QueryTypes.RAW, // Ejecuta el procedimiento almacenado
  });
}

// Función para obtener las carreteras asociadas a la última campaña
export function getCarreterasUltimaCampania() {
  return sequelize.query(
    `
    SELECT * 
    FROM dbo.carreteras
    WHERE id_campania_carreteras = (
      SELECT MAX(id_campania_carreteras)
      FROM dbo.carreteras
    )
    `,
    { type: QueryTypes.SELECT }
  );
}

// Función para eliminar una carretera
export function eliminarCarretera(idCarretera: number) {
  return sequelize.query(
    `
    CALL dbo.eliminar_carretera(:idCarretera);
    `,
    {
      replacements: { idCarretera },
      type: QueryTypes.RAW,
    }
  );
}

// Función para insertar una nueva carretera usando el procedimiento
export function insertarCarretera(carretera: any) {
  return sequelize.query(
    `
    CALL dbo.insertar_carretera(
      :carretera, 
      :direccion_carretera, 
      :pk_inferior, 
      :pk_superior, 
      :prioridad_carretera, 
      :zona_carretera, 
      :estado, 
      :id_campania_carreteras, 
      :id_visor
    );
    `,
    {
      replacements: {
        carretera: carretera.carretera,
        direccion_carretera: carretera.direccion_carretera,
        pk_inferior: carretera.pk_inferior,
        pk_superior: carretera.pk_superior,
        prioridad_carretera: carretera.prioridad_carretera,
        zona_carretera: carretera.zona_carretera,
        estado: carretera.estado,
        id_campania_carreteras: carretera.id_campania_carreteras,
        id_visor: carretera.id_visor,
      },
      type: QueryTypes.RAW, // Llamada al procedimiento almacenado
    }
  );
}

export async function editarCarretera(id: string, datos: any): Promise<void> {
  try {
    // Realiza la actualización de la carretera
    await sequelize.query(
      `
      UPDATE dbo.carreteras
      SET 
        carretera = :carretera,
        direccion_carretera = :direccion_carretera,
        pk_inferior = :pk_inferior,
        pk_superior = :pk_superior,
        prioridad_carretera = :prioridad_carretera,
        zona_carretera = :zona_carretera,
        estado = :estado,
        id_campania_carreteras = :id_campania_carreteras,
        id_visor = :id_visor
      WHERE id_carretera = :id
      `,
      {
        replacements: {
          id,
          carretera: datos.carretera,
          direccion_carretera: datos.direccion_carretera,
          pk_inferior: datos.pk_inferior,
          pk_superior: datos.pk_superior,
          prioridad_carretera: datos.prioridad_carretera,
          zona_carretera: datos.zona_carretera,
          estado: datos.estado,
          id_campania_carreteras: datos.id_campania_carreteras,
          id_visor: datos.id_visor
        },
        type: QueryTypes.UPDATE,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar la carretera: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar la carretera');
    }
  }
}



