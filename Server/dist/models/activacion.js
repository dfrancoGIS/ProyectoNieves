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
exports.insertarActivacion = insertarActivacion;
exports.editarActivacion = editarActivacion;
exports.obtenerActivaciones = obtenerActivaciones;
exports.obtenerActivacionPorFechaHoraRecurso = obtenerActivacionPorFechaHoraRecurso;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
function insertarActivacion(numeroTurno, fecha, hora, duracionTurno, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zona, personal1, rolPersonal1, personal2, rolPersonal2) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`CALL dbo.insertar_activacion(
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
      );`, {
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
                type: sequelize_1.QueryTypes.RAW, // 🔹 Mejor práctica para procedimientos almacenados
            });
        }
        catch (error) {
            console.error('❌ Error al insertar la activación:', error);
            throw new Error(`❌ Error al insertar la activación: ${error instanceof Error ? error.message : error}`);
        }
    });
}
function editarActivacion(idActivacion, numeroTurno, fechaActivacion, duracionTurno, horaInicio, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zonaAsignada, personalAsignado1, ocupacionAsignado1, personalAsignado2, ocupacionAsignado2) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`CALL dbo.sp_editar_activacion(
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
      );`, {
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
                type: sequelize_1.QueryTypes.RAW, // Usamos RAW porque es un procedimiento almacenado
            });
        }
        catch (error) {
            console.error('❌ Error al editar la activación:', error);
            throw new Error(`❌ Error al editar la activación: ${error instanceof Error ? error.message : error}`);
        }
    });
}
/**
 * ✅ Recuperar todas las activaciones
 */
function obtenerActivaciones() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activaciones = yield connection_1.default.query(`SELECT * FROM dbo.obtener_todas_activaciones();`, {
                type: sequelize_1.QueryTypes.SELECT, // 🔹 Devolvemos un array de objetos
            });
            return activaciones;
        }
        catch (error) {
            console.error('❌ Error al obtener las activaciones:', error);
            throw new Error(`❌ Error al obtener activaciones: ${error instanceof Error ? error.message : error}`);
        }
    });
}
/**
 * ✅ Buscar una activación específica por fecha, hora y recurso
 */
function obtenerActivacionPorFechaHoraRecurso(fecha, horaInicio, recurso) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activacion = yield connection_1.default.query(`SELECT * FROM dbo.activaciones 
       WHERE fecha_activacion = CAST(:p_fecha AS DATE) 
       AND TRIM(LOWER(recurso)) = TRIM(LOWER(:p_recurso))
       AND hora_inicio = CAST(:p_horaInicio AS TIME)
       LIMIT 1;`, {
                replacements: {
                    p_fecha: fecha,
                    p_horaInicio: horaInicio,
                    p_recurso: recurso
                },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return activacion.length > 0 ? activacion[0] : null;
        }
        catch (error) {
            console.error('❌ Error al buscar la activación:', error);
            throw new Error(`❌ Error al buscar activación: ${error instanceof Error ? error.message : error}`);
        }
    });
}
