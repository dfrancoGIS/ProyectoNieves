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
exports.getEstadosComunicacionUltimaCampania = getEstadosComunicacionUltimaCampania;
exports.getEstadosComunicacionPorCampania = getEstadosComunicacionPorCampania;
exports.eliminarEstadoComunicacion = eliminarEstadoComunicacion;
exports.insertarEstadoComunicacion = insertarEstadoComunicacion;
exports.editarEstadoComunicacion = editarEstadoComunicacion;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener los estados de comunicación asociados al último id_campania_estados_comunicacion
function getEstadosComunicacionUltimaCampania() {
    return connection_1.default.query(`
    SELECT *
    FROM dbo.estados_comunicacion
    WHERE id_campania_estados_comunicacion = (
      SELECT MAX(id_campania_estados_comunicacion)
      FROM dbo.estados_comunicacion
    )
    `, { type: sequelize_1.QueryTypes.SELECT });
}
/**
 * Obtener los estados de comunicación filtrados por campaña llamando a la función almacenada
 */
function getEstadosComunicacionPorCampania(tituloCampana) {
    return connection_1.default.query(`
    SELECT * FROM dbo.filtrar_estados_comunicacion_por_campania(:tituloCampana);
    `, {
        replacements: { tituloCampana },
        type: sequelize_1.QueryTypes.SELECT,
    });
}
// Función para eliminar un estado de comunicación por su ID
function eliminarEstadoComunicacion(id_estado_comunicacion) {
    return connection_1.default.query(`
    CALL dbo.eliminar_estado_comunicacion(:id_estado_comunicacion);
    `, {
        replacements: { id_estado_comunicacion }, // Usar la variable de reemplazo para evitar inyección
        type: sequelize_1.QueryTypes.RAW,
    }).then(() => {
        // No necesitamos devolver nada, solo indicamos que se completó
    });
}
// Función para insertar un nuevo estado de comunicación
function insertarEstadoComunicacion(descripcion_estado_comunicacion, id_campania_estados_comunicacion) {
    return connection_1.default.query('CALL dbo.insertar_estado_comunicacion(:descripcion_estado_comunicacion, :id_campania_estados_comunicacion)', {
        replacements: { descripcion_estado_comunicacion, id_campania_estados_comunicacion },
        type: sequelize_1.QueryTypes.RAW,
    });
}
function editarEstadoComunicacion(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Realizamos la consulta para actualizar el estado de comunicación
            yield connection_1.default.query(`
      UPDATE dbo.estados_comunicacion
      SET 
        descripcion_estado_comunicacion = :descripcion_estado_comunicacion,
        id_campania_estados_comunicacion = :id_campania_estados_comunicacion
      WHERE id_estado_comunicacion = :id
      `, {
                replacements: {
                    id,
                    descripcion_estado_comunicacion: datos.descripcion_estado_comunicacion,
                    id_campania_estados_comunicacion: datos.id_campania_estados_comunicacion
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar el estado de comunicación: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar el estado de comunicación');
            }
        }
    });
}
