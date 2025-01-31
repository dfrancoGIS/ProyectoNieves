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
exports.getRecursos = void 0;
const recursos_1 = require("../models/recursos");
/**
 * Controlador para obtener todos los recursos.
 */
const getRecursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recursos = yield (0, recursos_1.getAllRecursos)();
        res.status(200).json({
            msg: '✅ Recursos obtenidos correctamente',
            data: recursos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener recursos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener recursos',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getRecursos = getRecursos;
