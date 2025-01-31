"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllZonas = getAllZonas;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todas las zonas disponibles.
 */
function getAllZonas() {
    return connection_1.default.query(`SELECT Id_Zona, Orden_Zona 
     FROM Zonas ORDER BY Orden_Zona`, { type: sequelize_1.QueryTypes.SELECT });
}
