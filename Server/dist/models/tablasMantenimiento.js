"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTablasMantenimiento = getAllTablasMantenimiento;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todas las tablas de mantenimiento.
 */
function getAllTablasMantenimiento() {
    return connection_1.default.query(`SELECT Tabla, Descripcion, Orden, InfoCampaña, OcultarID 
     FROM Tablas_Mantenimiento ORDER BY Orden`, { type: sequelize_1.QueryTypes.SELECT });
}
