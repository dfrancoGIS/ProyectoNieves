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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarTareaHandler = exports.insertarTareaController = exports.eliminarTareaHandler = exports.obtenerTareasPorCampania = exports.getTareas = void 0;
const tareas_1 = require("../models/tareas");
// Endpoint para obtener las tareas de la última campaña
const getTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tareas = yield (0, tareas_1.getTareasUltimaCampania)();
        res.status(200).json({
            msg: '✅ Tareas de la última campaña obtenidas correctamente',
            data: tareas,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener tareas:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getTareas = getTareas;
const obtenerTareasPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const tareas = yield (0, tareas_1.getTareasPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Tareas obtenidas correctamente',
            data: tareas,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener tareas por campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerTareasPorCampania = obtenerTareasPorCampania;
const eliminarTareaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tarea } = req.params; // Obtener el ID desde los parámetros de la URL
        console.log('ID recibido para eliminar en el backend:', id_tarea); // Debug
        yield (0, tareas_1.eliminarTarea)(Number(id_tarea)); // Asegúrate de convertir el ID a número
        res.status(200).json({
            msg: '✅ Tarea eliminada correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar tarea:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarTareaHandler = eliminarTareaHandler;
const insertarTareaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas } = req.body;
    try {
        yield (0, tareas_1.insertarTarea)(descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas);
        res.status(200).json({
            msg: '✅ Tarea añadida correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al añadir tarea:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarTareaController = insertarTareaController;
// Controlador para editar el registro de tareas
const editarTareaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID de la tarea desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID de la tarea a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, tareas_1.editarTarea)(id, datos);
        res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
    }
    catch (error) {
        // Maneja los errores de manera apropiada
        if (error instanceof Error) {
            res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
        }
        else {
            res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
        }
    }
});
exports.editarTareaHandler = editarTareaHandler;
