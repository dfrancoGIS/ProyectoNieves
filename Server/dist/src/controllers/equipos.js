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
exports.updateEquipo = exports.postEquipo = exports.deleteEquipo = exports.getEquipo = exports.getEquipos = void 0;
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            msg: 'get equipos'
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
exports.getEquipos = getEquipos;
const getEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'get equipo',
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
exports.getEquipo = getEquipo;
const deleteEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.json({
            msg: 'delete equipo',
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
exports.deleteEquipo = deleteEquipo;
const postEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('REQ.BODY:', req.body); // ✅ Verificar en consola
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'No se recibió un cuerpo en la solicitud' });
        return; // ✅ Asegurar que la función termina aquí
    }
    try {
        res.json({
            msg: 'post equipo',
            receivedBody: req.body // ✅ Confirmar los datos recibidos
        });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.postEquipo = postEquipo;
const updateEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            msg: `Equipo con ID ${id} actualizado correctamente`,
            updatedData: req.body // ✅ Mostrar los datos recibidos
        });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.updateEquipo = updateEquipo;
