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
exports.editarCarreteraHandler = exports.insertarCarreteraController = exports.eliminarCarreteraController = exports.getCarreterasUltima = exports.actualizarEstadoCarretera = exports.obtenerCarreterasPorCampania = exports.getCarreteras = void 0;
const carreteras_1 = require("../models/carreteras");
const getCarreteras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreteras = yield (0, carreteras_1.getCarreterasConEstado)();
        res.status(200).json({
            msg: '✅ Consulta exitosa',
            data: carreteras,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener carreteras:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getCarreteras = getCarreteras;
// Obtener carreteras filtradas por título de campaña
const obtenerCarreterasPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const carreteras = yield (0, carreteras_1.getCarreterasPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Carreteras obtenidas correctamente',
            data: carreteras,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener carreteras por campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerCarreterasPorCampania = obtenerCarreterasPorCampania;
const actualizarEstadoCarretera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carretera, nuevo_estado } = req.body;
    if (!id_carretera || !nuevo_estado) {
        res.status(400).json({ msg: '❌ Faltan parámetros' });
        return;
    }
    try {
        yield (0, carreteras_1.updateEstadoCarretera)(id_carretera, nuevo_estado);
        res.status(200).json({ msg: '✅ Estado actualizado correctamente' });
    }
    catch (error) {
        console.error('❌ Error al actualizar estado:', error);
        res.status(500).json({ msg: '❌ Error interno en la API', error });
    }
});
exports.actualizarEstadoCarretera = actualizarEstadoCarretera;
// Obtener carreteras de la última campaña
const getCarreterasUltima = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreteras = yield (0, carreteras_1.getCarreterasUltimaCampania)();
        res.status(200).json({
            msg: '✅ Carreteras de la última campaña obtenidas correctamente',
            data: carreteras,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener carreteras de la última campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getCarreterasUltima = getCarreterasUltima;
// Controlador para eliminar una carretera
const eliminarCarreteraController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_carretera } = req.body;
    if (!id_carretera) {
        res.status(400).json({
            msg: '❌ Faltan parámetros: id_carretera es obligatorio',
        });
        return;
    }
    try {
        yield (0, carreteras_1.eliminarCarretera)(id_carretera);
        res.status(200).json({
            msg: `✅ Carretera con ID ${id_carretera} eliminada correctamente`,
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar carretera:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarCarreteraController = eliminarCarreteraController;
// Función para insertar una nueva carretera
const insertarCarreteraController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { carretera, direccion_carretera, pk_inferior, pk_superior, prioridad_carretera, zona_carretera, estado, id_campania_carreteras, id_visor, } = req.body;
    // Validar parámetros
    if (!carretera ||
        !direccion_carretera ||
        !pk_inferior ||
        !pk_superior ||
        !prioridad_carretera ||
        !zona_carretera ||
        !estado ||
        !id_campania_carreteras ||
        !id_visor) {
        res.status(400).json({ msg: '❌ Faltan parámetros para la inserción de la carretera' });
        return;
    }
    try {
        // Insertar la carretera llamando al procedimiento almacenado
        yield (0, carreteras_1.insertarCarretera)(req.body);
        res.status(200).json({
            msg: '✅ Carretera insertada correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al insertar carretera:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarCarreteraController = insertarCarreteraController;
const editarCarreteraHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID de la carretera desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID de la carretera a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, carreteras_1.editarCarretera)(id, datos);
        res.status(200).json({ msg: '✅ Carretera actualizada correctamente' });
    }
    catch (error) {
        // Maneja los errores de manera apropiada
        if (error instanceof Error) {
            res.status(500).json({ msg: '❌ Error al actualizar la carretera', error: error.message });
        }
        else {
            res.status(500).json({ msg: '❌ Error desconocido al actualizar la carretera' });
        }
    }
});
exports.editarCarreteraHandler = editarCarreteraHandler;
