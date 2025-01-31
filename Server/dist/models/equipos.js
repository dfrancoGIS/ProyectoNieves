"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTurnosTrabajo = exports.registrarTurnoEquipo = exports.getLastCampaignId = exports.getEquipoById = exports.getAllEquipos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene la lista de equipos disponibles.
 */
const getAllEquipos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.default.query(`SELECT Id_Equipo, Recurso_Equipo FROM Equipos`, { type: sequelize_1.QueryTypes.SELECT });
});
exports.getAllEquipos = getAllEquipos;
/**
 * Obtiene los datos de un equipo específico por su ID.
 */
const getEquipoById = (idEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.default.query(`SELECT E.Id_Equipo, E.Recurso_Equipo, E.Inicio_Equipo, 
                E.Fin_Equipo, E.Responsable, E.Vehiculo_Equipo,
                P.Nombre_Personal, P.Apellido1_Personal, P.Apellido2_Personal, 
                P.Ocupacion_Personal, P.Tfno1_Personal, P.Tfno2_Personal
         FROM Equipos E
         LEFT JOIN Equipo_Personal EP ON E.Id_Equipo = EP.Id_Equipo
         LEFT JOIN Personal P ON EP.Id_Personal = P.Id_Personal
         WHERE E.Id_Equipo = :idEquipo`, { replacements: { idEquipo }, type: sequelize_1.QueryTypes.SELECT });
});
exports.getEquipoById = getEquipoById;
/**
 * Obtiene la última campaña activa (la más reciente con fecha de inicio pasada o actual).
 */
const getLastCampaignId = () => __awaiter(void 0, void 0, void 0, function* () {
    const [campaniaValida] = yield connection_1.default.query(`SELECT TOP 1 Id_Campania 
         FROM Campañas 
         WHERE Inicio_Campania <= GETDATE() 
         ORDER BY Inicio_Campania DESC`, { type: sequelize_1.QueryTypes.SELECT });
    return campaniaValida ? campaniaValida.Id_Campania : null;
});
exports.getLastCampaignId = getLastCampaignId;
/**
 * Registra un turno de trabajo en la tabla Equipos.
 */
const registrarTurnoEquipo = (recursoEquipo, fechaInicio, horaInicio, fechaFin, horaFin, responsable, vehiculo) => __awaiter(void 0, void 0, void 0, function* () {
    const idCampania = yield (0, exports.getLastCampaignId)();
    if (!idCampania) {
        throw new Error("No hay campañas activas en la base de datos.");
    }
    // Concatenamos fecha y hora antes de pasarlo a SQL
    const fechaHoraInicio = `${fechaInicio} ${horaInicio}`;
    const fechaHoraFin = `${fechaFin} ${horaFin}`;
    return yield connection_1.default.query(`INSERT INTO Equipos 
         (Recurso_Equipo, Inicio_Equipo, Fin_Equipo, Responsable, Reten_Equipo, Vehiculo_Equipo, Id_Campania_Equipos)
         VALUES (
          :recursoEquipo, 
          CONVERT(DATETIME, :fechaHoraInicio, 120), 
          CONVERT(DATETIME, :fechaHoraFin, 120), 
          :responsable, 0, :vehiculo, :idCampania
         )`, {
        replacements: { recursoEquipo, fechaHoraInicio, fechaHoraFin, responsable, vehiculo, idCampania },
        type: sequelize_1.QueryTypes.INSERT
    });
});
exports.registrarTurnoEquipo = registrarTurnoEquipo;
/**
 * Obtiene los turnos de trabajo registrados en la tabla Equipos.
 */
const getTurnosTrabajo = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connection_1.default.query(`SELECT E.Id_Equipo, E.Recurso_Equipo, E.Inicio_Equipo, 
                E.Fin_Equipo, E.Responsable, E.Vehiculo_Equipo
         FROM Equipos E`, { type: sequelize_1.QueryTypes.SELECT });
});
exports.getTurnosTrabajo = getTurnosTrabajo;
