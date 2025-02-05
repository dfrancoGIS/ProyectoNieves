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
exports.getStationDataById = exports.getStationData = void 0;
const stationService_1 = require("../services/stationService");
/**
 * Obtener todas las variables de la estación
 */
const getStationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📡 Solicitando datos de la estación...");
        const data = yield (0, stationService_1.getStationVariables)();
        console.log("✅ Datos obtenidos:", data);
        res.json(data);
    }
    catch (error) {
        console.error("❌ Error en getStationData:", error.message || error);
        res.status(500).json({ error: "Error al obtener datos de la estación", detalle: error.message });
    }
});
exports.getStationData = getStationData;
/**
 * Obtener una variable específica por ID
 */
const getStationDataById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(`🔎 Buscando variable con ID: ${id}`);
        if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }
        const data = yield (0, stationService_1.getStationVariables)();
        const result = data.find((item) => item.id === id);
        if (!result) {
            res.status(404).json({ error: `No se encontró la variable con ID ${id}` });
            return;
        }
        console.log("✅ Variable encontrada:", result);
        res.json(result);
    }
    catch (error) {
        console.error("❌ Error en getStationDataById:", error.message || error);
        res.status(500).json({ error: "Error al obtener la variable de la estación", detalle: error.message });
    }
});
exports.getStationDataById = getStationDataById;
