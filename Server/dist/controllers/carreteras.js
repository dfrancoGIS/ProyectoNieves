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
exports.actualizarEstadoCarretera = exports.getCarreteras = void 0;
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
