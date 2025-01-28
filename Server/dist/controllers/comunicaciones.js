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
exports.updateComunicacion = exports.postComunicacion = exports.deleteComunicacion = exports.getComunicacion = exports.getComunicaciones = void 0;
const getComunicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            msg: 'get comunicaciones'
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
exports.getComunicaciones = getComunicaciones;
const getComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'get comunicacion',
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
exports.getComunicacion = getComunicacion;
const deleteComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'delete comunicacion',
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
exports.deleteComunicacion = deleteComunicacion;
const postComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REQ.BODY:', req.body); // ✅ Verificar en consola
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'No se recibió un cuerpo en la solicitud' });
        return; // ✅ Asegurar que la función termina aquí
    }
    try {
        res.json({
            msg: 'post comunicacion',
            receivedBody: req.body // ✅ Confirmar los datos recibidos
        });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.postComunicacion = postComunicacion;
const updateComunicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            msg: `Comunicacion con ID ${id} actualizada correctamente`,
            updatedData: req.body // ✅ Mostrar los datos recibidos
        });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.updateComunicacion = updateComunicacion;
