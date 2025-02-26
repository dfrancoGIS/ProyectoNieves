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
exports.editarEstadoHandler = exports.insertarEstadoController = exports.eliminarEstadoHandler = exports.getEstados = void 0;
const estados_1 = require("../models/estados");
// ✅ Obtener todos los estados
const getEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield (0, estados_1.getAllEstados)();
        res.status(200).json({
            msg: '✅ Estados obtenidos correctamente',
            data: estados,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener estados:', error);
        res.status(500).json({
            msg: '❌ Error al obtener estados',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEstados = getEstados;
const eliminarEstadoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_estado } = req.params; // ID del estado desde la URL
        console.log('ID recibido para eliminar en el backend:', id_estado); // Debug
        yield (0, estados_1.eliminarEstado)(Number(id_estado)); // Convertimos el id a número si es necesario
        res.status(200).json({
            msg: '✅ Estado eliminado correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar estado:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarEstadoHandler = eliminarEstadoHandler;
const insertarEstadoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion_estado, color_estado_r, color_estado_g, color_estado_b } = req.body;
    console.log('Datos recibidos en el backend:', req.body); // Verifica si se están enviando correctamente
    try {
        yield (0, estados_1.insertarEstado)(descripcion_estado, color_estado_r, color_estado_g, color_estado_b);
        res.status(200).json({
            msg: '✅ Estado añadido correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al añadir estado:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarEstadoController = insertarEstadoController;
// Controlador para editar el registro de estados
const editarEstadoHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del estado desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del estado a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, estados_1.editarEstado)(id, datos);
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
exports.editarEstadoHandler = editarEstadoHandler;
