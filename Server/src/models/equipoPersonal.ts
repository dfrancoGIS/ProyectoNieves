import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene todos los registros de `Equipo_Personal` vinculados a un equipo específico.
 */
export async function getEquipoPersonalByIdEquipo(idEquipo: number) {
    return sequelize.query(
        `SELECT Id_Equipo, Id_Personal, Tfno1_Eq_Pers, Tfno2_Eq_Pers, Ext_Eq_Pers
         FROM Equipo_Personal
         WHERE Id_Equipo = :idEquipo`,
        { 
            replacements: { idEquipo }, 
            type: QueryTypes.SELECT 
        }
    );
}