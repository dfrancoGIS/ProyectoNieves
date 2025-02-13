"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarreterasConEstado = getCarreterasConEstado;
exports.updateEstadoCarretera = updateEstadoCarretera;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener las carreteras con su estado
function getCarreterasConEstado() {
    return connection_1.default.query('SELECT * FROM select_carreteras_con_estado()', {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
// Función para actualizar el estado de una carretera
function updateEstadoCarretera(id_carretera, nuevo_estado) {
    return connection_1.default.query('CALL actualizar_estado_carretera(:id, :estado)', {
        replacements: { id: id_carretera, estado: nuevo_estado },
        type: sequelize_1.QueryTypes.RAW, // Ejecuta el procedimiento almacenado
    });
}
