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
exports.obtenerTenerCta = void 0;
const tenerCta_1 = require("../models/tenerCta");
/**
 * Controlador para obtener todos los registros de "Tener_Cta".
 */
const obtenerTenerCta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenerCta = yield (0, tenerCta_1.getTenerCta)();
        res.status(200).json({
            msg: '✅ Elementos de "Tener en cuenta" obtenidos correctamente',
            data: tenerCta,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener elementos de "Tener en cuenta":', error);
        res.status(500).json({
            msg: '❌ Error al obtener elementos de "Tener en cuenta"',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerTenerCta = obtenerTenerCta;
