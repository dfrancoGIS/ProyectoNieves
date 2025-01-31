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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEstadosComunicacion = getAllEstadosComunicacion;
exports.registrarNuevoEstadoComunicacion = registrarNuevoEstadoComunicacion;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const equipos_1 = require("./equipos");
/**
 * Obtiene todos los estados de comunicación disponibles en la última campaña activa.
 */
function getAllEstadosComunicacion() {
    return __awaiter(this, void 0, void 0, function* () {
        const idCampania = yield (0, equipos_1.getLastCampaignId)();
        if (!idCampania) {
            throw new Error("No hay campañas activas disponibles.");
        }
        return connection_1.default.query(`SELECT Id_Estado_Comunicacion, Descripcion_Estado_Comunicacion, Id_Campania_Estados_Comunicacion
         FROM Estados_Comunicacion
         WHERE Id_Campania_Estados_Comunicacion = :idCampania`, {
            replacements: { idCampania },
            type: sequelize_1.QueryTypes.SELECT
        });
    });
}
/**
 * Inserta un nuevo estado de comunicación en la base de datos.
 */
function registrarNuevoEstadoComunicacion(descripcion) {
    return __awaiter(this, void 0, void 0, function* () {
        const idCampania = yield (0, equipos_1.getLastCampaignId)();
        if (!idCampania) {
            throw new Error("No hay campañas activas disponibles.");
        }
        return connection_1.default.query(`INSERT INTO Estados_Comunicacion (Descripcion_Estado_Comunicacion, Id_Campania_Estados_Comunicacion)
         VALUES (:descripcion, :idCampania)`, {
            replacements: { descripcion, idCampania },
            type: sequelize_1.QueryTypes.INSERT,
        });
    });
}
