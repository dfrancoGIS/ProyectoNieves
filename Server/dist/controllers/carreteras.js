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
exports.putEstadoCarretera = exports.getCarreterasPorPrioridad = exports.getCarreterasPorNombre = exports.getCarreteras = void 0;
const carreteras_1 = require("../models/carreteras");
const getCarreteras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreteras = yield (0, carreteras_1.getAllCarreteras)();
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
const getCarreterasPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const data = yield (0, carreteras_1.getCarreterasByNombre)(nombre);
        res.json({ msg: "✅ Carreteras encontradas", data });
    }
    catch (error) {
        res.status(500).json({ msg: "❌ Error en la consulta", error });
    }
});
exports.getCarreterasPorNombre = getCarreterasPorNombre;
const getCarreterasPorPrioridad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prioridad } = req.params;
        const data = yield (0, carreteras_1.getCarreterasByPrioridad)(Number(prioridad));
        res.json({ msg: "✅ Carreteras encontradas", data });
    }
    catch (error) {
        res.status(500).json({ msg: "❌ Error en la consulta", error });
    }
});
exports.getCarreterasPorPrioridad = getCarreterasPorPrioridad;
const putEstadoCarretera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prioridad, carretera, estadoNombre } = req.body;
        if (!prioridad || !estadoNombre) {
            res.status(400).json({ msg: "❌ Falta prioridad o estadoNombre" });
            return;
        }
        yield (0, carreteras_1.updateEstadoCarreteras)(prioridad, carretera, estadoNombre);
        res.json({ msg: "✅ Estado actualizado correctamente" });
    }
    catch (error) {
        console.error("❌ Error en putEstadoCarretera:", error);
        res.status(500).json({ msg: "❌ Error al actualizar el estado", error });
    }
});
exports.putEstadoCarretera = putEstadoCarretera;
