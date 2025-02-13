"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonal = getPersonal;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para llamar al procedimiento almacenado `get_personal`
function getPersonal() {
    return connection_1.default.query('SELECT * FROM get_personal()', // Llamada directa a la función
    {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
