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
exports.postComunicacion = exports.getComunicacion = exports.getComunicaciones = void 0;
const comunicaciones_1 = require("../models/comunicaciones");
/**
 * Obtiene todas las comunicaciones activas.
 */
const getComunicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comunicaciones = yield (0, comunicaciones_1.getAllComunicaciones)();
        res.status(200).json({
            msg: "✅ Comunicaciones obtenidas correctamente",
            data: comunicaciones
        });
    }
    catch (error) {
        console.error("❌ Error al obtener las comunicaciones:", error);
        res.status(500).json({
            msg: "❌ Error al obtener las comunicaciones",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getComunicaciones = getComunicaciones;
/**
 * Obtiene una comunicación por ID.
 */
const getComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "❌ El ID de la comunicación es obligatorio" });
            return;
        }
        const comunicacion = yield (0, comunicaciones_1.getComunicacionById)(Number(id));
        if (!comunicacion.length) {
            res.status(404).json({ msg: "❌ Comunicación no encontrada" });
            return;
        }
        res.status(200).json({
            msg: "✅ Comunicación obtenida correctamente",
            data: comunicacion[0]
        });
    }
    catch (error) {
        console.error("❌ Error al obtener la comunicación:", error);
        res.status(500).json({
            msg: "❌ Error al obtener la comunicación",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getComunicacion = getComunicacion;
/**
 * Registra una nueva comunicación.
 */
const postComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { equipo, recurso, zona, prioridad, carretera, tarea, estadoCarretera, tenerCta, observaciones } = req.body;
        if (!equipo || !recurso || !zona || prioridad === undefined || !carretera || !tarea || !estadoCarretera) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben completarse" });
            return;
        }
        yield (0, comunicaciones_1.registrarComunicacion)(equipo, recurso, zona, prioridad, carretera, tarea, estadoCarretera, tenerCta, observaciones);
        res.json({ msg: "✅ Comunicación registrada correctamente" });
    }
    catch (error) {
        console.error("❌ Error al registrar la comunicación:", error);
        res.status(500).json({ msg: "❌ Error al registrar la comunicación", error });
    }
});
exports.postComunicacion = postComunicacion;
