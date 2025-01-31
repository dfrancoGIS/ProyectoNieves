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
exports.getZonas = void 0;
const zonas_1 = require("../models/zonas");
/**
 * Controlador para obtener todas las zonas.
 */
const getZonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zonas = yield (0, zonas_1.getAllZonas)();
        res.status(200).json({
            msg: '✅ Zonas obtenidas correctamente',
            data: zonas,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener zonas:', error);
        res.status(500).json({
            msg: '❌ Error al obtener zonas',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getZonas = getZonas;
