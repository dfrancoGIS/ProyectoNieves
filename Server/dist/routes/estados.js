"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estados_1 = require("../controllers/estados");
const router = (0, express_1.Router)();
// ✅ Ruta para obtener todos los estados
router.get('/', estados_1.getEstados);
router.delete('/eliminar/:id_estado', estados_1.eliminarEstadoHandler);
// Ruta para insertar un nuevo estado
router.post("/insertar", estados_1.insertarEstadoController);
// Ruta para editar un registro de estado
router.put('/editar/:id', estados_1.editarEstadoHandler);
exports.default = router;
