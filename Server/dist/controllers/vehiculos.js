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
exports.getVehiculos = void 0;
const vehiculos_1 = require("../models/vehiculos");
// ✅ Obtener todos los vehículos
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield (0, vehiculos_1.getAllVehiculos)();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener vehículos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getVehiculos = getVehiculos;
