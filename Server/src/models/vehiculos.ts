import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';  

/**
 * Obtiene todos los vehículos usando la función de PostgreSQL.
 */
export function getAllVehiculos() {
    return sequelize.query(
        `SELECT * FROM obtener_vehiculos_ultima_campania()`,
        { type: QueryTypes.SELECT }
    );
}

/**
 * ✅ Obtener vehículos filtrados por título de campaña (llamando a la función en PostgreSQL)
 */
export function getVehiculosPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_vehiculos_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}

/**
 * Obtiene todos los vehículos de la campaña con el `id_campania_vehiculos` más alto.
 */
export function getVehiculosUltimaCampania() {
    return sequelize.query(
        `
        SELECT * 
        FROM dbo.vehiculos
        WHERE id_campania_vehiculos = (
            SELECT MAX(id_campania_vehiculos) 
            FROM dbo.vehiculos
        )
        `,
        { type: QueryTypes.SELECT }
    );
}

// Función para eliminar un vehículo por su ID
export function eliminarVehiculo(id_vehiculo: string): Promise<void> {
    return sequelize.query(
      `
      CALL dbo.eliminar_vehiculo(:id_vehiculo);
      `,
      {
        type: QueryTypes.RAW,
        replacements: { id_vehiculo }, // Reemplazo para evitar inyección de SQL
      }
    ).then(() => {
      // Devolvemos void explícitamente porque no necesitamos los resultados
    });
  }

  // Función para insertar un vehículo
export function insertarVehiculo(
  id_vehiculo: string,
  descripcion_vehiculo: string,
  recurso_vehiculo: string,
  empresa_vehiculo: string,
  tfno_vehiculo: string,
  ext_vehiculo: string,
  id_campania_vehiculos: number
) {
  return sequelize.query(
    'CALL dbo.insertar_vehiculo(:id_vehiculo, :descripcion_vehiculo, :recurso_vehiculo, :empresa_vehiculo, :tfno_vehiculo, :ext_vehiculo, :id_campania_vehiculos)',
    {
      replacements: {
        id_vehiculo,
        descripcion_vehiculo,
        recurso_vehiculo,
        empresa_vehiculo,
        tfno_vehiculo,
        ext_vehiculo,
        id_campania_vehiculos,
      },
      type: QueryTypes.RAW, // Ejecutar el procedimiento almacenado
    }
  );
}

export async function editarVehiculo(id: string, datos: any): Promise<void> {
  try {
    console.log("🔍 Verificando datos antes de actualizar:", { id, ...datos });

    await sequelize.query(
      `CALL dbo.actualizar_vehiculo(:id_vehiculo, :descripcion_vehiculo, :recurso_vehiculo, :empresa_vehiculo, :tfno_vehiculo, :ext_vehiculo, :id_campania_vehiculos);`,
      {
        replacements: {
          id_vehiculo: id,
          descripcion_vehiculo: datos.descripcion_vehiculo,
          recurso_vehiculo: datos.recurso_vehiculo,
          empresa_vehiculo: datos.empresa_vehiculo,
          tfno_vehiculo: datos.tfno_vehiculo,
          ext_vehiculo: datos.ext_vehiculo,
          id_campania_vehiculos: datos.id_campania_vehiculos,
        },
        type: QueryTypes.RAW,
      }
    );
  } catch (error: unknown) {
    console.error("❌ Error al actualizar vehículo:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido al actualizar el vehículo");
  }
}

export function getVehiculosPorRecurso(recurso: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_vehiculos_por_recurso(:recurso);`,
    {
      type: QueryTypes.SELECT,
      replacements: { recurso },
    }
  );
}

