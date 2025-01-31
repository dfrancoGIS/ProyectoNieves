import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

/**
 * Obtiene la lista de equipos disponibles.
 */
export const getAllEquipos = async () => {
    return await sequelize.query(
        `SELECT Id_Equipo, Recurso_Equipo FROM Equipos`,
        { type: QueryTypes.SELECT }
    );
};

/**
 * Obtiene los datos de un equipo específico por su ID.
 */
export const getEquipoById = async (idEquipo: number) => {
    return await sequelize.query(
        `SELECT E.Id_Equipo, E.Recurso_Equipo, E.Inicio_Equipo, 
                E.Fin_Equipo, E.Responsable, E.Vehiculo_Equipo,
                P.Nombre_Personal, P.Apellido1_Personal, P.Apellido2_Personal, 
                P.Ocupacion_Personal, P.Tfno1_Personal, P.Tfno2_Personal
         FROM Equipos E
         LEFT JOIN Equipo_Personal EP ON E.Id_Equipo = EP.Id_Equipo
         LEFT JOIN Personal P ON EP.Id_Personal = P.Id_Personal
         WHERE E.Id_Equipo = :idEquipo`,
        { replacements: { idEquipo }, type: QueryTypes.SELECT }
    );
};

/**
 * Obtiene la última campaña activa (la más reciente con fecha de inicio pasada o actual).
 */
export const getLastCampaignId = async (): Promise<number | null> => {
    const [campaniaValida]: any = await sequelize.query(
        `SELECT TOP 1 Id_Campania 
         FROM Campañas 
         WHERE Inicio_Campania <= GETDATE() 
         ORDER BY Inicio_Campania DESC`,  
        { type: QueryTypes.SELECT }
    );

    return campaniaValida ? campaniaValida.Id_Campania : null;
};

/**
 * Registra un turno de trabajo en la tabla Equipos.
 */
export const registrarTurnoEquipo = async (
    recursoEquipo: string,
    fechaInicio: string,
    horaInicio: string,
    fechaFin: string,
    horaFin: string,
    responsable: number,
    vehiculo: string
) => {
    const idCampania = await getLastCampaignId();

    if (!idCampania) {
        throw new Error("No hay campañas activas en la base de datos.");
    }

    // Concatenamos fecha y hora antes de pasarlo a SQL
    const fechaHoraInicio = `${fechaInicio} ${horaInicio}`;
    const fechaHoraFin = `${fechaFin} ${horaFin}`;

    return await sequelize.query(
        `INSERT INTO Equipos 
         (Recurso_Equipo, Inicio_Equipo, Fin_Equipo, Responsable, Reten_Equipo, Vehiculo_Equipo, Id_Campania_Equipos)
         VALUES (
          :recursoEquipo, 
          CONVERT(DATETIME, :fechaHoraInicio, 120), 
          CONVERT(DATETIME, :fechaHoraFin, 120), 
          :responsable, 0, :vehiculo, :idCampania
         )`,
        { 
            replacements: { recursoEquipo, fechaHoraInicio, fechaHoraFin, responsable, vehiculo, idCampania }, 
            type: QueryTypes.INSERT 
        }
    );
};




/**
 * Obtiene los turnos de trabajo registrados en la tabla Equipos.
 */
export const getTurnosTrabajo = async () => {
    return await sequelize.query(
        `SELECT E.Id_Equipo, E.Recurso_Equipo, E.Inicio_Equipo, 
                E.Fin_Equipo, E.Responsable, E.Vehiculo_Equipo
         FROM Equipos E`,
        { type: QueryTypes.SELECT }
    );
};
