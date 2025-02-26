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
exports.editarTenerCtaHandler = exports.insertarTenerCtaController = exports.eliminarTenerCtaHandler = exports.obtenerTenerCtaPorCampania = exports.getTenerCta = void 0;
const tenerCta_1 = require("../models/tenerCta");
const getTenerCta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenerCta = yield (0, tenerCta_1.getTenerCtaUltimaCampania)();
        res.status(200).json({
            msg: '✅ Tener CTA obtenidos correctamente',
            data: tenerCta,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener Tener CTA:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getTenerCta = getTenerCta;
// Obtener registros filtrados por campaña
const obtenerTenerCtaPorCampania = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tituloCampania } = req.query;
        if (!tituloCampania) {
            res.status(400).json({ msg: '❌ Se requiere el parámetro "tituloCampania".' });
        }
        const data = yield (0, tenerCta_1.getTenerCtaPorCampania)(tituloCampania);
        res.json({ msg: '✅ Registros obtenidos correctamente', data });
    }
    catch (error) {
        res.status(500).json({ msg: '❌ Error al obtener registros', error });
    }
});
exports.obtenerTenerCtaPorCampania = obtenerTenerCtaPorCampania;
const eliminarTenerCtaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { v_id_tener_cta } = req.params; // Obtenemos el ID de la URL
        console.log('ID recibido para eliminar en el backend:', v_id_tener_cta);
        // Llamamos a la función que elimina el registro
        yield (0, tenerCta_1.eliminarTenerCta)(Number(v_id_tener_cta)); // Convertimos el id a un número
        res.status(200).json({
            msg: '✅ Registro eliminado correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar registro de tener_cta:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarTenerCtaHandler = eliminarTenerCtaHandler;
// Controlador para insertar un nuevo estado de tener_cta
const insertarTenerCtaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion_tener_cta, id_campania_tener_cta } = req.body;
    try {
        yield (0, tenerCta_1.insertarTenerCta)(descripcion_tener_cta, id_campania_tener_cta);
        res.status(200).json({ msg: '✅ Estado de tener_cta añadido correctamente' });
    }
    catch (error) {
        console.error('❌ Error al añadir tener_cta:', error);
        res.status(500).json({ msg: '❌ Error interno en la API', error: error instanceof Error ? error.message : error });
    }
});
exports.insertarTenerCtaController = insertarTenerCtaController;
const editarTenerCtaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extrae el ID desde los parámetros de la URL
    const datos = req.body; // Los datos vienen en el cuerpo de la solicitud
    // Asegúrate de que el ID esté presente
    if (!id) {
        res.status(400).json({ msg: '❌ Falta el ID del registro a editar' });
        return;
    }
    try {
        // Llama al modelo para realizar la actualización
        yield (0, tenerCta_1.editarTenerCta)(id, datos);
        res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
    }
    catch (error) {
        // Maneja los errores de manera apropiada
        if (error instanceof Error) {
            res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
        }
        else {
            res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
        }
    }
});
exports.editarTenerCtaHandler = editarTenerCtaHandler;
