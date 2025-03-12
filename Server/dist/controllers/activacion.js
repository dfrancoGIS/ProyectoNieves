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
exports.buscarActivacionHandler = exports.editarActivacionHandler = exports.obtenerActivacionesHandler = exports.insertarActivacionHandler = void 0;
const activacion_1 = require("../models/activacion");
/**
 * ✅ Insertar una nueva activación
 */
const insertarActivacionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numeroTurno, fecha, hora, duracionTurno, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zona, personal1, rolPersonal1, personal2, rolPersonal2 } = req.body;
    // ✅ Validamos que los campos obligatorios estén presentes
    if (!numeroTurno || !fecha || !hora || !duracionTurno || !activadoPor || !empresaRecurso || !recurso || !tipoTurno || !zona || !personal1 || !rolPersonal1) {
        res.status(400).json({ msg: '⚠️ Faltan datos obligatorios' });
        return;
    }
    try {
        yield (0, activacion_1.insertarActivacion)(numeroTurno, fecha, hora, duracionTurno, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zona, personal1, rolPersonal1, personal2, rolPersonal2);
        res.status(201).json({
            msg: '✅ Activación insertada correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al insertar la activación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarActivacionHandler = insertarActivacionHandler;
/**
 * ✅ Obtener todas las activaciones
 */
const obtenerActivacionesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activaciones = yield (0, activacion_1.obtenerActivaciones)();
        res.status(200).json({
            msg: '✅ Activaciones recuperadas correctamente',
            data: activaciones,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener las activaciones:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerActivacionesHandler = obtenerActivacionesHandler;
/**
 * ✅ Editar una activación existente
 */
const editarActivacionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idActivacion, numeroTurno, fecha, horaInicio, duracionTurno, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zona, personal1, rolPersonal1, personal2, rolPersonal2 } = req.body;
    // ✅ Validamos que los campos obligatorios estén presentes
    if (!idActivacion || !numeroTurno || !fecha || !horaInicio || !duracionTurno || !activadoPor || !empresaRecurso || !recurso || !tipoTurno || !zona || !personal1 || !rolPersonal1) {
        res.status(400).json({ msg: '⚠️ Faltan datos obligatorios' });
        return;
    }
    try {
        yield (0, activacion_1.editarActivacion)(idActivacion, numeroTurno, fecha, duracionTurno, horaInicio, activadoPor, empresaRecurso, recurso, vehiculo, tipoTurno, zona, personal1, rolPersonal1, personal2, rolPersonal2);
        res.status(200).json({
            msg: '✅ Activación editada correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al editar la activación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.editarActivacionHandler = editarActivacionHandler;
/**
 * ✅ Buscar una activación por fecha, hora y recurso
 */
const buscarActivacionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha, horaInicio, recurso } = req.query;
    // ✅ Validación de parámetros
    if (!fecha || !horaInicio || !recurso) {
        res.status(400).json({ msg: '⚠️ Parámetros insuficientes (se requieren fecha, horaInicio y recurso)' });
        return;
    }
    try {
        const activacion = yield (0, activacion_1.obtenerActivacionPorFechaHoraRecurso)(fecha, horaInicio, recurso);
        if (activacion) {
            res.status(200).json(activacion);
        }
        else {
            res.status(404).json({ msg: '⚠️ No se encontró la activación' });
        }
    }
    catch (error) {
        console.error('❌ Error al buscar la activación:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.buscarActivacionHandler = buscarActivacionHandler;
