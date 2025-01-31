"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTareas = getAllTareas;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todas las tareas disponibles.
 */
function getAllTareas() {
    return connection_1.default.query(`SELECT Id_tarea, Descripcion_Tarea, Color_Tarea_R, Color_Tarea_G, Color_Tarea_B, Id_Campania_Tareas 
     FROM Tareas ORDER BY Id_tarea`, { type: sequelize_1.QueryTypes.SELECT });
}
