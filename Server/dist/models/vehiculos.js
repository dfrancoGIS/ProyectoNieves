"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVehiculos = getAllVehiculos;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todos los vehículos usando la función de PostgreSQL.
 */
function getAllVehiculos() {
    return connection_1.default.query(`SELECT * FROM obtener_vehiculos_ultima_campania()`, { type: sequelize_1.QueryTypes.SELECT });
}
