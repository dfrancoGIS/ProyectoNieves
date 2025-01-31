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
exports.getAllPersonal = getAllPersonal;
exports.registrarNuevoPersonal = registrarNuevoPersonal;
exports.actualizarPersonal = actualizarPersonal;
exports.eliminarPersonal = eliminarPersonal;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const equipos_1 = require("./equipos");
/**
 * Obtiene todos los registros de Personal.
 */
function getAllPersonal() {
    return connection_1.default.query(`SELECT Id_Personal, Nombre_Personal, Apellido1_Personal, Apellido2_Personal, 
            Alias_Personal, Ocupacion_Personal, Tfno1_Personal, Tfno2_Personal, 
            Ext_Personal, Departamento_Personal, DFA_Personal, Id_Campania_Personal 
     FROM Personal`, { type: sequelize_1.QueryTypes.SELECT });
}
/**
 * Inserta un nuevo registro de personal en la base de datos.
 */
function registrarNuevoPersonal(nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa) {
    return __awaiter(this, void 0, void 0, function* () {
        const idCampania = yield (0, equipos_1.getLastCampaignId)();
        if (!idCampania) {
            throw new Error("No hay campañas activas disponibles.");
        }
        return connection_1.default.query(`INSERT INTO Personal (Nombre_Personal, Apellido1_Personal, Apellido2_Personal, Alias_Personal, 
                               Ocupacion_Personal, Tfno1_Personal, Tfno2_Personal, Ext_Personal, 
                               Departamento_Personal, DFA_Personal, Id_Campania_Personal)
         VALUES (:nombre, :apellido1, :apellido2, :alias, :ocupacion, :telefono1, :telefono2, 
                 :extension, :departamento, :dfa, :idCampania)`, {
            replacements: { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa, idCampania },
            type: sequelize_1.QueryTypes.INSERT,
        });
    });
}
/**
 * Actualiza un registro de personal en la base de datos.
 */
function actualizarPersonal(id, nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.default.query(`UPDATE Personal 
         SET Nombre_Personal = :nombre, Apellido1_Personal = :apellido1, Apellido2_Personal = :apellido2,
             Alias_Personal = :alias, Ocupacion_Personal = :ocupacion, Tfno1_Personal = :telefono1,
             Tfno2_Personal = :telefono2, Ext_Personal = :extension, Departamento_Personal = :departamento,
             DFA_Personal = :dfa
         WHERE Id_Personal = :id`, {
            replacements: { id, nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa },
            type: sequelize_1.QueryTypes.UPDATE,
        });
    });
}
/**
 * Elimina un registro de personal de la base de datos.
 */
function eliminarPersonal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.default.query(`DELETE FROM Personal WHERE Id_Personal = :id`, {
            replacements: { id },
            type: sequelize_1.QueryTypes.DELETE,
        });
    });
}
