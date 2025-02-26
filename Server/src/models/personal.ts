import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

// Función para obtener los registros de personal de la última campaña
export function getPersonal() {
  return sequelize.query(
    `
    SELECT * 
    FROM dbo.personal
    WHERE id_campania_personal = (
        SELECT MAX(id_campania_personal) 
        FROM dbo.personal
    );
    `,
    {
      type: QueryTypes.SELECT,
    }
  );
}

/**
 * ✅ Obtener los registros de personal filtrados por el título de la campaña (usando la función de la BDD)
 */
export function getPersonalPorCampania(tituloCampana: string) {
  return sequelize.query(
    `SELECT * FROM dbo.filtrar_personal_por_campania(:tituloCampana);`,
    {
      type: QueryTypes.SELECT,
      replacements: { tituloCampana },
    }
  );
}


// Función para eliminar un registro de personal
export function eliminarPersonal(idPersonal: number) {
  return sequelize.query(
    `SELECT dbo.eliminar_personal(:idPersonal);`, // Llama al procedimiento almacenado
    {
      replacements: { idPersonal }, // Reemplaza el parámetro
      type: QueryTypes.RAW, // RAW porque es un procedimiento almacenado
    }
  );
}

// Función para insertar un nuevo personal en la base de datos
export async function insertarPersonal(
  nombre_personal: string,
  apellido1_personal: string,
  apellido2_personal: string,
  alias_personal: string,
  ocupacion_personal: string,
  tfno1_personal: string,
  tfno2_personal: string,
  ext_personal: string,
  departamento_personal: string,
  dfa_personal: boolean,
  id_campania_personal: number,
  activo: boolean  // 🆕 Agregamos el campo activo
): Promise<void> {
  try {
      await sequelize.query(
          `
          CALL dbo.insertar_personal(
              :p_nombre_personal,
              :p_apellido1_personal,
              :p_apellido2_personal,
              :p_alias_personal,
              :p_ocupacion_personal,
              :p_tfno1_personal,
              :p_tfno2_personal,
              :p_ext_personal,
              :p_departamento_personal,
              :p_dfa_personal,
              :p_id_campania_personal,
              :p_activo  -- 🆕 Se añade en la llamada al procedimiento
          );
          `,
          {
              replacements: {
                  p_nombre_personal: nombre_personal,
                  p_apellido1_personal: apellido1_personal,
                  p_apellido2_personal: apellido2_personal,
                  p_alias_personal: alias_personal,
                  p_ocupacion_personal: ocupacion_personal,
                  p_tfno1_personal: tfno1_personal,
                  p_tfno2_personal: tfno2_personal,
                  p_ext_personal: ext_personal,
                  p_departamento_personal: departamento_personal,
                  p_dfa_personal: dfa_personal,
                  p_id_campania_personal: id_campania_personal,
                  p_activo: activo  // 🆕 Se pasa el nuevo valor
              },
              type: QueryTypes.RAW,
          });
  } catch (error: unknown) {
      if (error instanceof Error) {
          throw new Error('Error al insertar el personal: ' + error.message);
      } else {
          throw new Error('Error desconocido al insertar el personal');
      }
  }
}

// Función para editar el registro de personal en la base de datos
export async function editarPersonal(id: string, datos: any): Promise<void> {
  try {
    await sequelize.query(
      `
      UPDATE dbo.personal
      SET 
        nombre_personal = :nombre_personal,
        apellido1_personal = :apellido1_personal,
        apellido2_personal = :apellido2_personal,
        alias_personal = :alias_personal,
        ocupacion_personal = :ocupacion_personal,
        tfno1_personal = :tfno1_personal,
        tfno2_personal = :tfno2_personal,
        ext_personal = :ext_personal,
        departamento_personal = :departamento_personal,
        dfa_personal = :dfa_personal,
        id_campania_personal = :id_campania_personal,
        activo = :activo  -- 🆕 Se agrega el campo activo
      WHERE id_personal = :id
      `,
      {
        replacements: {
          id,
          nombre_personal: datos.nombre_personal,
          apellido1_personal: datos.apellido1_personal,
          apellido2_personal: datos.apellido2_personal,
          alias_personal: datos.alias_personal,
          ocupacion_personal: datos.ocupacion_personal,
          tfno1_personal: datos.tfno1_personal,
          tfno2_personal: datos.tfno2_personal,
          ext_personal: datos.ext_personal,
          departamento_personal: datos.departamento_personal,
          dfa_personal: datos.dfa_personal,
          id_campania_personal: datos.id_campania_personal,
          activo: datos.activo ?? false // 🆕 Se asegura que tenga un valor por defecto
        },
        type: QueryTypes.UPDATE,
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error al actualizar el registro: ' + error.message);
    } else {
      throw new Error('Error desconocido al actualizar el registro');
    }
  }
}


