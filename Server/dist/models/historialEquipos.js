"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistorialEquipos = getHistorialEquipos;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener los datos del historial de equipos
function getHistorialEquipos() {
    return connection_1.default.query(`SELECT DISTINCT ON (recurso_equipo) * 
     FROM obtener_historico_equipos()
     ORDER BY recurso_equipo, fecha_inicio DESC`, // Seleccionamos el más reciente por cada recurso
    { type: sequelize_1.QueryTypes.SELECT });
}
