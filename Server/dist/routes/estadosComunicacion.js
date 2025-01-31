"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadosComunicacion_1 = require("../controllers/estadosComunicacion");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todos los estados de comunicación.
 */
router.get('/', estadosComunicacion_1.getEstadosComunicacion);
/**
 * Ruta para registrar un nuevo estado de comunicación.
 */
router.post('/', estadosComunicacion_1.registrarEstadoComunicacion);
exports.default = router;
