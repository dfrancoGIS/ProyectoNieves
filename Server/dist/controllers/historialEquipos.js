"use strict";
// controllers/historialEquipos.ts
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
exports.obtenerHistorialEquipos = void 0;
const historialEquipos_1 = require("../models/historialEquipos");
const obtenerHistorialEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const historial = yield (0, historialEquipos_1.getHistorialEquipos)(); // Aquí obtenemos el historial
        res.status(200).json({
            msg: '✅ Consulta exitosa',
            data: historial,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener historial de equipos:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerHistorialEquipos = obtenerHistorialEquipos;
