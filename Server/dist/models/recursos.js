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
exports.getRecursosUltimaCampania = getRecursosUltimaCampania;
exports.getTareasPorCampania = getTareasPorCampania;
exports.getRecursosPorCampania = getRecursosPorCampania;
exports.getAllRecursos = getAllRecursos;
exports.eliminarRecurso = eliminarRecurso;
exports.insertarRecurso = insertarRecurso;
exports.editarRecurso = editarRecurso;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener los recursos asociados a la última campaña
function getRecursosUltimaCampania() {
    return connection_1.default.query(`
    SELECT *
    FROM dbo.recursos
    WHERE id_campania_recursos = (
      SELECT MAX(id_campania_recursos)
      FROM dbo.recursos
    )
    `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para obtener las tareas filtradas por título de campaña
function getTareasPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_tareas_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
/**
 * ✅ Obtener los registros de recursos filtrados por el título de la campaña
 */
function getRecursosPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_recursos_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
/**
 * Obtiene todos los recursos.
 */
function getAllRecursos() {
    return connection_1.default.query(`SELECT * FROM obtener_recursos();`, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para eliminar un recurso
function eliminarRecurso(idRecurso) {
    return connection_1.default.query('CALL dbo.eliminar_recurso(:id_recurso);', {
        replacements: { id_recurso: idRecurso },
        type: sequelize_1.QueryTypes.RAW,
    });
}
// Función para insertar un recurso
function insertarRecurso(id_recurso, empresa_recurso, id_campania_recursos) {
    return connection_1.default.query(`CALL dbo.insertar_recurso(:id_recurso, :empresa_recurso, :id_campania_recursos)`, {
        replacements: {
            id_recurso,
            empresa_recurso,
            id_campania_recursos,
        },
        type: sequelize_1.QueryTypes.RAW,
    });
}
function editarRecurso(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Realizamos la consulta de actualización
            yield connection_1.default.query(`
      UPDATE dbo.recursos
      SET 
        id_recurso = :id_recurso,  -- Aquí actualizamos el id_recurso
        empresa_recurso = :empresa_recurso,
        id_campania_recursos = :id_campania_recursos
      WHERE id_recurso = :id_recurso  -- Filtramos por el id_recurso
      `, {
                replacements: {
                    id_recurso: id, // El ID que se desea cambiar, que es un texto
                    empresa_recurso: datos.empresa_recurso,
                    id_campania_recursos: datos.id_campania_recursos,
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar el recurso: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar el recurso');
            }
        }
    });
}
