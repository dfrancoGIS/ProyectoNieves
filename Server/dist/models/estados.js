"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertarEstado = void 0;
exports.getAllEstados = getAllEstados;
exports.eliminarEstado = eliminarEstado;
exports.editarEstado = editarEstado;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todos los registros de la tabla `estados` dentro del esquema `dbo`.
 */
function getAllEstados() {
    return connection_1.default.query(`
        SELECT * 
        FROM dbo.estados
        `, { type: sequelize_1.QueryTypes.SELECT });
}
function eliminarEstado(id_estado) {
    return connection_1.default.query(`
    CALL dbo.eliminar_estado(:id_estado);
    `, {
        replacements: { id_estado }, // Asegúrate de pasar el parámetro correctamente
        type: sequelize_1.QueryTypes.RAW,
    }).then(() => {
        // Promesa resuelta correctamente
    });
}
const insertarEstado = (descripcion_estado, color_estado_r, color_estado_g, color_estado_b) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.query('CALL dbo.insertar_estado(:descripcion_estado, :color_estado_r, :color_estado_g, :color_estado_b)', {
            replacements: { descripcion_estado, color_estado_r, color_estado_g, color_estado_b },
            type: sequelize_1.QueryTypes.RAW,
        });
    }
    catch (error) {
        throw new Error(`Error al insertar estado: ${error.message}`);
    }
});
exports.insertarEstado = insertarEstado;
function editarEstado(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Realizamos la consulta para actualizar el estado
            yield connection_1.default.query(`
      UPDATE dbo.estados
      SET 
        descripcion_estado = :descripcion_estado,
        color_estado_r = :color_estado_r,
        color_estado_g = :color_estado_g,
        color_estado_b = :color_estado_b
      WHERE id_estado = :id
      `, {
                replacements: {
                    id,
                    descripcion_estado: datos.descripcion_estado,
                    color_estado_r: datos.color_estado_r,
                    color_estado_g: datos.color_estado_g,
                    color_estado_b: datos.color_estado_b
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar el estado: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar el estado');
            }
        }
    });
}
