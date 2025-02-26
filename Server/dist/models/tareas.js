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
exports.getTareasUltimaCampania = getTareasUltimaCampania;
exports.eliminarTarea = eliminarTarea;
exports.insertarTarea = insertarTarea;
exports.getTareasPorCampania = getTareasPorCampania;
exports.editarTarea = editarTarea;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener las tareas asociadas a la última campaña
function getTareasUltimaCampania() {
    return connection_1.default.query(`
    SELECT *
    FROM dbo.tareas
    WHERE id_campania_tareas = (
      SELECT MAX(id_campania_tareas)
      FROM dbo.tareas
    )
    `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para eliminar una tarea por su ID
function eliminarTarea(id_tarea) {
    return connection_1.default.query(`
    CALL dbo.eliminar_tarea(:id_tarea);
    `, {
        replacements: { id_tarea },
        type: sequelize_1.QueryTypes.RAW,
    }).then(() => {
        // Aquí no necesitamos devolver nada, simplemente resolvemos la promesa.
    });
}
// Función para insertar una tarea
function insertarTarea(descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas) {
    return connection_1.default.query('CALL dbo.insertar_tarea(:descripcion_tarea, :color_tarea_r, :color_tarea_g, :color_tarea_b, :id_campania_tareas)', {
        replacements: { descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas },
        type: sequelize_1.QueryTypes.RAW,
    });
}
function getTareasPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_tareas_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
function editarTarea(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Aquí utilizamos una consulta SQL para actualizar el registro de la tarea
            yield connection_1.default.query(`
      UPDATE dbo.tareas
      SET 
        descripcion_tarea = :descripcion_tarea,
        color_tarea_r = :color_tarea_r,
        color_tarea_g = :color_tarea_g,
        color_tarea_b = :color_tarea_b,
        id_campania_tareas = :id_campania_tareas
      WHERE id_tarea = :id
      `, {
                replacements: {
                    id,
                    descripcion_tarea: datos.descripcion_tarea,
                    color_tarea_r: datos.color_tarea_r,
                    color_tarea_g: datos.color_tarea_g,
                    color_tarea_b: datos.color_tarea_b,
                    id_campania_tareas: datos.id_campania_tareas,
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar el registro de la tarea: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar el registro de la tarea');
            }
        }
    });
}
