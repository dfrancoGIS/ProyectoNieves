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
exports.getCarreterasRecursoCuadrilla = getCarreterasRecursoCuadrilla;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todas las carreteras recurso cuadrilla de la última campaña activa.
 */
function getCarreterasRecursoCuadrilla() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.default.query(`SELECT Id_Carreteras_Recurso_Cuadrilla, Id_Recurso_Cuadrilla, Carretera_Recurso_Cuadrilla, Id_Campania_Carretera_Recurso_Cuadrilla
         FROM Carreteras_Recurso_Cuadrilla`, { type: sequelize_1.QueryTypes.SELECT });
    });
}
