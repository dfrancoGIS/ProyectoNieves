import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';
import { getLastCampaignId } from './equipos';

/**
 * Obtiene todos los registros de Personal.
 */
export function getAllPersonal() {
  return sequelize.query(
    `SELECT Id_Personal, Nombre_Personal, Apellido1_Personal, Apellido2_Personal, 
            Alias_Personal, Ocupacion_Personal, Tfno1_Personal, Tfno2_Personal, 
            Ext_Personal, Departamento_Personal, DFA_Personal, Id_Campania_Personal 
     FROM Personal`,
    { type: QueryTypes.SELECT }
  );
}

/**
 * Inserta un nuevo registro de personal en la base de datos.
 */
export async function registrarNuevoPersonal(
    nombre: string, apellido1: string, apellido2: string, alias: string, 
    ocupacion: string, telefono1: string, telefono2: string, extension: string, 
    departamento: string, dfa: number
) {
    const idCampania = await getLastCampaignId();
    if (!idCampania) {
        throw new Error("No hay campañas activas disponibles.");
    }

    return sequelize.query(
        `INSERT INTO Personal (Nombre_Personal, Apellido1_Personal, Apellido2_Personal, Alias_Personal, 
                               Ocupacion_Personal, Tfno1_Personal, Tfno2_Personal, Ext_Personal, 
                               Departamento_Personal, DFA_Personal, Id_Campania_Personal)
         VALUES (:nombre, :apellido1, :apellido2, :alias, :ocupacion, :telefono1, :telefono2, 
                 :extension, :departamento, :dfa, :idCampania)`,
        {
            replacements: { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa, idCampania },
            type: QueryTypes.INSERT,
        }
    );
}

/**
 * Actualiza un registro de personal en la base de datos.
 */
export async function actualizarPersonal(
    id: number,
    nombre: string, apellido1: string, apellido2: string, alias: string, 
    ocupacion: string, telefono1: string, telefono2: string, extension: string, 
    departamento: string, dfa: number
) {
    return sequelize.query(
        `UPDATE Personal 
         SET Nombre_Personal = :nombre, Apellido1_Personal = :apellido1, Apellido2_Personal = :apellido2,
             Alias_Personal = :alias, Ocupacion_Personal = :ocupacion, Tfno1_Personal = :telefono1,
             Tfno2_Personal = :telefono2, Ext_Personal = :extension, Departamento_Personal = :departamento,
             DFA_Personal = :dfa
         WHERE Id_Personal = :id`,
        {
            replacements: { id, nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa },
            type: QueryTypes.UPDATE,
        }
    );
}

/**
 * Elimina un registro de personal de la base de datos.
 */
export async function eliminarPersonal(id: number) {
    return sequelize.query(
        `DELETE FROM Personal WHERE Id_Personal = :id`,
        {
            replacements: { id },
            type: QueryTypes.DELETE,
        }
    );
}
