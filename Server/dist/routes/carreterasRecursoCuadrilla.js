"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreterasRecursoCuadrilla_1 = require("../controllers/carreterasRecursoCuadrilla");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todas las carreteras recurso cuadrilla.
 */
router.get('/', carreterasRecursoCuadrilla_1.obtenerCarreterasRecursoCuadrilla);
exports.default = router;
