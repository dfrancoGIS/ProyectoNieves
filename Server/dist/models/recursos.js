"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRecursos = getAllRecursos;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todos los recursos.
 */
function getAllRecursos() {
    return connection_1.default.query(`SELECT * FROM obtener_recursos();`, { type: sequelize_1.QueryTypes.SELECT });
}
