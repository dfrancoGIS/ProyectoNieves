"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEstados = getAllEstados;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// ✅ Obtener todos los estados
function getAllEstados() {
    return connection_1.default.query(`SELECT Id_Estado, Descripcion_Estado FROM Estados`, { type: sequelize_1.QueryTypes.SELECT });
}
