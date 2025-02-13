"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZonasCarretera = getZonasCarretera;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener las zonas ordenadas
function getZonasCarretera() {
    return connection_1.default.query('SELECT * FROM get_zonas() ORDER BY orden_zona ASC', {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
