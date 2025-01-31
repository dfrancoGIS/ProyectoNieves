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
exports.getTablasMantenimiento = void 0;
const tablasMantenimiento_1 = require("../models/tablasMantenimiento");
/**
 * Controlador para obtener todas las tablas de mantenimiento.
 */
const getTablasMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tablas = yield (0, tablasMantenimiento_1.getAllTablasMantenimiento)();
        res.status(200).json({
            msg: '✅ Tablas de mantenimiento obtenidas correctamente',
            data: tablas,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener tablas de mantenimiento:', error);
        res.status(500).json({
            msg: '❌ Error al obtener tablas de mantenimiento',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getTablasMantenimiento = getTablasMantenimiento;
