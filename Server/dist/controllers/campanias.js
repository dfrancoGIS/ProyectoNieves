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
exports.crearNuevaCampaniaHandler = exports.eliminarCampaniaHandler = exports.getCampaniasFiltradasController = exports.getCampaniasController = void 0;
const campanias_1 = require("../models/campanias");
// Endpoint para obtener todas las campañas
const getCampaniasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campanias = yield (0, campanias_1.getCampanias)();
        res.status(200).json({
            msg: '✅ Campañas obtenidas correctamente',
            data: campanias,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener campañas:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getCampaniasController = getCampaniasController;
const getCampaniasFiltradasController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo_campania } = req.query;
        if (!titulo_campania) {
            res.status(400).json({ msg: '❌ Se requiere el parámetro titulo_campania' });
        }
        const campanias = yield (0, campanias_1.getCampaniasFiltradas)(titulo_campania);
        res.status(200).json({
            msg: '✅ Campañas filtradas obtenidas correctamente',
            data: campanias,
        });
    }
    catch (error) {
        console.error('❌ Error al obtener campañas filtradas:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.getCampaniasFiltradasController = getCampaniasFiltradasController;
const eliminarCampaniaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_campania } = req.params; // ID de la campaña desde la URL
        console.log('ID recibido para eliminar en el backend:', id_campania); // Debug
        yield (0, campanias_1.eliminarCampania)(Number(id_campania)); // Llamada a la función del modelo
        res.status(200).json({
            msg: '✅ Campaña eliminada correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al eliminar campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.eliminarCampaniaHandler = eliminarCampaniaHandler;
// ✅ Crear una nueva campaña con replicación de datos
const crearNuevaCampaniaHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, fechaInicio, fechaFinAnterior } = req.body;
        if (!titulo || !fechaInicio || !fechaFinAnterior) {
            res.status(400).json({ msg: '❌ Todos los campos son obligatorios' });
            return;
        }
        console.log('📌 Datos recibidos:', { titulo, fechaInicio, fechaFinAnterior });
        // 1️⃣ Actualizar la fecha de fin de la campaña anterior
        yield (0, campanias_1.actualizarFinCampaniaAnterior)(fechaFinAnterior);
        // 2️⃣ Insertar la nueva campaña con el ID siguiente
        const nuevoIdCampania = yield (0, campanias_1.insertarNuevaCampania)(titulo, fechaInicio);
        // 3️⃣ Replicar datos de la última campaña a la nueva
        yield (0, campanias_1.replicarDatosNuevaCampania)(nuevoIdCampania - 1, nuevoIdCampania);
        res.status(201).json({
            msg: '✅ Nueva campaña creada y datos replicados correctamente',
        });
    }
    catch (error) {
        console.error('❌ Error al crear la nueva campaña:', error);
        res.status(500).json({
            msg: '❌ Error interno en la API',
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.crearNuevaCampaniaHandler = crearNuevaCampaniaHandler;
