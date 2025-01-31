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
exports.registrarEstadoComunicacion = exports.getEstadosComunicacion = void 0;
const estadosComunicacion_1 = require("../models/estadosComunicacion");
/**
 * Controlador para obtener todos los estados de comunicación de la última campaña activa.
 */
const getEstadosComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield (0, estadosComunicacion_1.getAllEstadosComunicacion)();
        res.status(200).json({
            msg: '✅ Estados de comunicación obtenidos correctamente',
            data: estados,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener estados de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error al obtener estados de comunicación',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEstadosComunicacion = getEstadosComunicacion;
/**
 * Controlador para registrar un nuevo estado de comunicación.
 */
const registrarEstadoComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { descripcion } = req.body;
        if (!descripcion) {
            res.status(400).json({ msg: "❌ La descripción del estado es obligatoria" });
            return;
        }
        yield (0, estadosComunicacion_1.registrarNuevoEstadoComunicacion)(descripcion);
        res.json({ msg: "✅ Estado de comunicación registrado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al registrar el estado de comunicación:", error);
        res.status(500).json({ msg: "❌ Error al registrar el estado de comunicación", error });
    }
});
exports.registrarEstadoComunicacion = registrarEstadoComunicacion;
