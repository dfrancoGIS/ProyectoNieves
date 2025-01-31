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
exports.getEquipoPersonal = void 0;
const equipoPersonal_1 = require("../models/equipoPersonal");
/**
 * Controlador para obtener los registros de personal asignado a un equipo específico.
 */
const getEquipoPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idEquipo } = req.params;
        if (!idEquipo) {
            res.status(400).json({ msg: "❌ El ID del equipo es obligatorio" });
            return;
        }
        const equipoPersonal = yield (0, equipoPersonal_1.getEquipoPersonalByIdEquipo)(Number(idEquipo));
        res.status(200).json({
            msg: '✅ Personal del equipo obtenido correctamente',
            data: equipoPersonal,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener el personal del equipo:', error);
        res.status(500).json({
            msg: '❌ Error al obtener el personal del equipo',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getEquipoPersonal = getEquipoPersonal;
