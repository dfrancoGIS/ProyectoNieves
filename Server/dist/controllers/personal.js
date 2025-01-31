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
exports.borrarPersonal = exports.modificarPersonal = exports.registrarPersonal = exports.getPersonal = void 0;
const personal_1 = require("../models/personal");
/**
 * Controlador para obtener todos los registros de Personal.
 */
const getPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personal = yield (0, personal_1.getAllPersonal)();
        res.status(200).json({
            msg: '✅ Personal obtenido correctamente',
            data: personal,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener personal:', error);
        res.status(500).json({
            msg: '❌ Error al obtener personal',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getPersonal = getPersonal;
/**
 * Controlador para registrar un nuevo personal.
 */
const registrarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa } = req.body;
        if (!nombre || !apellido1 || !alias || !ocupacion || !telefono1 || !departamento || dfa === undefined) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben estar presentes" });
            return;
        }
        yield (0, personal_1.registrarNuevoPersonal)(nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa);
        res.json({ msg: "✅ Personal registrado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al registrar el personal:", error);
        res.status(500).json({ msg: "❌ Error al registrar el personal", error });
    }
});
exports.registrarPersonal = registrarPersonal;
/**
 * Controlador para actualizar un registro de personal.
 */
const modificarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa } = req.body;
        if (!id || !nombre || !apellido1 || !alias || !ocupacion || !telefono1 || !departamento || dfa === undefined) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben estar presentes" });
            return;
        }
        yield (0, personal_1.actualizarPersonal)(Number(id), nombre, apellido1, apellido2, alias, ocupacion, telefono1, telefono2, extension, departamento, dfa);
        res.json({ msg: "✅ Personal actualizado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al actualizar el personal:", error);
        res.status(500).json({ msg: "❌ Error al actualizar el personal", error });
    }
});
exports.modificarPersonal = modificarPersonal;
/**
 * Controlador para eliminar un registro de personal.
 */
const borrarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "❌ ID del personal es obligatorio" });
            return;
        }
        yield (0, personal_1.eliminarPersonal)(Number(id));
        res.json({ msg: "✅ Personal eliminado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al eliminar el personal:", error);
        res.status(500).json({ msg: "❌ Error al eliminar el personal", error });
    }
});
exports.borrarPersonal = borrarPersonal;
