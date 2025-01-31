"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCuadrillas = getAllCuadrillas;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todas las cuadrillas disponibles.
 */
function getAllCuadrillas() {
    return connection_1.default.query(`SELECT Id_Cuadrilla, Descripcion_Cuadrilla 
     FROM Cuadrillas`, { type: sequelize_1.QueryTypes.SELECT });
}
