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
exports.editarPersonalHandler = exports.insertarPersonalHandler = exports.borrarPersonal = exports.obtenerPersonalPorCampania = exports.obtenerPersonal = void 0;
const personal_1 = require("../models/personal");
const personal_2 = require("../models/personal");
const obtenerPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personal = yield (0, personal_1.getPersonal)(); // Llama a la función del modelo
        res.status(200).json({
            msg: '✅ Personal obtenido correctamente',
            data: personal,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener personal:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerPersonal = obtenerPersonal;
/**
 * ✅ Obtener personal filtrado por título de campaña (llamando a la función en PostgreSQL)
 */
const obtenerPersonalPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampana } = req.query;
        if (!tituloCampana) {
            res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
            return;
        }
        const personal = yield (0, personal_2.getPersonalPorCampania)(tituloCampana);
        res.status(200).json({
            msg: '✅ Personal obtenido correctamente',
            data: personal,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener personal por campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.obtenerPersonalPorCampania = obtenerPersonalPorCampania;
const borrarPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_personal } = req.body; // Extrae el id del cuerpo de la solicitud
    if (!id_personal) {
        res.status(400).json({ msg: '❌ Falta el ID del registro a eliminar' });
        return;
    }
    try {
        yield (0, personal_2.eliminarPersonal)(id_personal); // Llama a la función del modelo
        res.status(200).json({
            msg: `✅ Registro con id_personal ${id_personal} eliminado correctamente`,
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar personal:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.borrarPersonal = borrarPersonal;
// Controlador para insertar un nuevo personal
const insertarPersonalHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_personal, apellido1_personal, apellido2_personal, alias_personal, ocupacion_personal, tfno1_personal, tfno2_personal, ext_personal, departamento_personal, dfa_personal, id_campania_personal, activo // 🔹 Nuevo campo añadido
     } = req.body; // Obtenemos los datos enviados en el body de la solicitud
    try {
        yield (0, personal_2.insertarPersonal)(nombre_personal, apellido1_personal, apellido2_personal, alias_personal, ocupacion_personal, tfno1_personal, tfno2_personal, ext_personal, departamento_personal, dfa_personal, id_campania_personal, activo // 🔹 Nuevo parámetro en la función
        );
        res.status(200).json({
            msg: '✅ Personal insertado correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al insertar el personal:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.insertarPersonalHandler = insertarPersonalHandler;
// Controlador para editar el registro de personal
const editarPersonalHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID del personal desde los parámetros de la URL
    const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del personal a editar' });
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, personal_2.editarPersonal)(id, datos);
        res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
    }
    catch (error) {
        // Maneja los errores de manera apropiada
        if (error instanceof Error) {
            res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
        }
        res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
    }
});
exports.editarPersonalHandler = editarPersonalHandler;
