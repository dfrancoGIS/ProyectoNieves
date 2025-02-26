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
exports.editarEstadoComunicacionHandler = exports.insertarEstadoComunicacionController = exports.eliminarEstadoComunicacionHandler = exports.obtenerEstadosComunicacionPorCampania = exports.getEstadosComunicacion = void 0;
const estadosComunicacion_1 = require("../models/estadosComunicacion");
const getEstadosComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadosComunicacion = yield (0, estadosComunicacion_1.getEstadosComunicacionUltimaCampania)();
        res.status(200).json({
            msg: '✅ Estados de comunicación obtenidos correctamente',
            data: estadosComunicacion,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener estados de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEstadosComunicacion = getEstadosComunicacion;
/**
 * Controlador para obtener estados de comunicación por campaña
 */
const obtenerEstadosComunicacionPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const estados = yield (0, estadosComunicacion_1.getEstadosComunicacionPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Estados de comunicación obtenidos correctamente',
            data: estados,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener estados de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerEstadosComunicacionPorCampania = obtenerEstadosComunicacionPorCampania;
const eliminarEstadoComunicacionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_estado_comunicacion } = req.params; // ID del estado de comunicación desde la URL
        console.log('ID recibido para eliminar en el backend:', id_estado_comunicacion); // Debug
        yield (0, estadosComunicacion_1.eliminarEstadoComunicacion)(Number(id_estado_comunicacion)); // Llamada a la función del modelo
        res.status(200).json({
            msg: '✅ Estado de comunicación eliminado correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar estado de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarEstadoComunicacionHandler = eliminarEstadoComunicacionHandler;
const insertarEstadoComunicacionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion_estado_comunicacion, id_campania_estados_comunicacion } = req.body;
    try {
        yield (0, estadosComunicacion_1.insertarEstadoComunicacion)(descripcion_estado_comunicacion, id_campania_estados_comunicacion);
        res.status(200).json({ msg: '✅ Estado de comunicación añadido correctamente' });
    }
    catch (error) {
        console.error('❌ Error al añadir estado de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarEstadoComunicacionController = insertarEstadoComunicacionController;
// Controlador para editar el registro de estado_comunicacion
const editarEstadoComunicacionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del estado de comunicación desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del estado de comunicación a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, estadosComunicacion_1.editarEstadoComunicacion)(id, datos);
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
exports.editarEstadoComunicacionHandler = editarEstadoComunicacionHandler;
