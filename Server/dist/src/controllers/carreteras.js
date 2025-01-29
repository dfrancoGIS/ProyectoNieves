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
exports.updateCarretera = exports.postCarretera = exports.deleteCarretera = exports.getCarretera = exports.getCarreteras = void 0;
const carreteras_1 = require("../models/carreteras");
const getCarreteras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            msg: 'get carreteras'
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});
exports.getCarreteras = getCarreteras;
const getCarretera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'get carretera',
            id
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});
exports.getCarretera = getCarretera;
const deleteCarretera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'delete carretera',
            id
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});
exports.deleteCarretera = deleteCarretera;
const postCarretera = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Carretera, Direccion_Carretera, PK_Inferior, PK_Superior, Prioridad_Carretera, Zona_Carretera, Estado, Id_Campania_Carreteras, ID_VISOR } = req.body;
        if (!Carretera || !Zona_Carretera || Estado === undefined) {
            resp.status(400).json({
                msg: '❌ Faltan datos obligatorios',
                required: ['Carretera', 'Zona_Carretera', 'Estado']
            });
            return; // 🔴 IMPORTANTE: Asegurar que la función termina aquí
        }
        yield (0, carreteras_1.insertCarretera)(Carretera, Direccion_Carretera, PK_Inferior, PK_Superior, Prioridad_Carretera, Zona_Carretera, Estado, Id_Campania_Carreteras, ID_VISOR);
        resp.status(201).json({
            msg: '✅ Carretera insertada correctamente',
            data: req.body
        });
    }
    catch (error) {
        console.error('❌ Error al insertar la carretera:', error);
        resp.status(500).json({
            msg: '❌ Error interno al insertar la carretera',
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.postCarretera = postCarretera;
const updateCarretera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // ✅ Extraer el ID de los parámetros
    console.log('REQ.BODY:', req.body);
    console.log('REQ.PARAMS:', req.params);
    if (!id) {
        res.status(400).json({ error: 'No se proporcionó un ID válido' });
        return;
    }
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'No se recibió un cuerpo en la solicitud' });
        return;
    }
    try {
        // Simulación de actualización
        res.json({
            msg: `Carretera con ID ${id} actualizada correctamente`,
            updatedData: req.body // ✅ Mostrar los datos recibidos
        });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.updateCarretera = updateCarretera;
