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
exports.editarRecursoHandler = exports.insertarRecursoController = exports.eliminarRecursoController = exports.obtenerRecursosPorCampania = exports.getRecursosEquipos = exports.obtenerTareasPorCampania = exports.getRecursos = void 0;
const recursos_1 = require("../models/recursos");
const getRecursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recursos = yield (0, recursos_1.getRecursosUltimaCampania)();
        res.status(200).json({
            msg: '✅ Recursos de la última campaña obtenidos correctamente',
            data: recursos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener recursos:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getRecursos = getRecursos;
// Obtener tareas filtradas por campaña
const obtenerTareasPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const tareas = yield (0, recursos_1.getTareasPorCampania)(tituloCampana);
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
/**
 * Controlador para obtener todos los recursos.
 */
const getRecursosEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recursos = yield (0, recursos_1.getAllRecursos)();
        res.status(200).json({
            msg: '✅ Recursos obtenidos correctamente',
            data: recursos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener recursos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener recursos',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getRecursosEquipos = getRecursosEquipos;
/**
 * ✅ Obtener recursos filtrados por título de campaña (llamando a la función en PostgreSQL)
 */
const obtenerRecursosPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const recursos = yield (0, recursos_1.getRecursosPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Recursos obtenidos correctamente',
            data: recursos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener recursos por campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerRecursosPorCampania = obtenerRecursosPorCampania;
const eliminarRecursoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_recurso } = req.body;
    if (!id_recurso) {
        res.status(400).json({ msg: '❌ Debes proporcionar un ID de recurso' });
        return;
    }
    try {
        yield (0, recursos_1.eliminarRecurso)(id_recurso);
        res.status(200).json({ msg: '✅ Recurso eliminado correctamente' });
    }
    catch (error) {
        console.error('❌ Error al eliminar recurso:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarRecursoController = eliminarRecursoController;
// Controlador para insertar un nuevo recurso
const insertarRecursoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_recurso, empresa_recurso, id_campania_recursos } = req.body;
    if (!id_recurso || !empresa_recurso || !id_campania_recursos) {
        res.status(400).json({ msg: '❌ Faltan parámetros para insertar el recurso' });
        return;
    }
    try {
        yield (0, recursos_1.insertarRecurso)(id_recurso, empresa_recurso, id_campania_recursos);
        res.status(200).json({ msg: '✅ Recurso insertado correctamente' });
    }
    catch (error) {
        console.error('❌ Error al insertar el recurso:', error);
        res.status(500).json({ msg: '❌ Error interno en la API', error });
    }
});
exports.insertarRecursoController = insertarRecursoController;
// Controlador para actualizar el recurso
const editarRecursoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del recurso desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del recurso a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, recursos_1.editarRecurso)(id, datos);
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
exports.editarRecursoHandler = editarRecursoHandler;
