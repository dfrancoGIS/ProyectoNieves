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
exports.obtenerCarreterasRecursoCuadrilla = void 0;
const carreterasRecursoCuadrilla_1 = require("../models/carreterasRecursoCuadrilla");
/**
 * Controlador para obtener todas las carreteras recurso cuadrilla.
 */
const obtenerCarreterasRecursoCuadrilla = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreteras = yield (0, carreterasRecursoCuadrilla_1.getCarreterasRecursoCuadrilla)();
        res.status(200).json({
            msg: '✅ Carreteras recurso cuadrilla obtenidas correctamente',
            data: carreteras,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener carreteras recurso cuadrilla:', error);
        res.status(500).json({
            msg: '❌ Error al obtener carreteras recurso cuadrilla',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerCarreterasRecursoCuadrilla = obtenerCarreterasRecursoCuadrilla;
