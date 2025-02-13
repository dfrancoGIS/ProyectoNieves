"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/historialEquipos.ts
const express_1 = require("express");
const historialEquipos_1 = require("../controllers/historialEquipos");
const router = (0, express_1.Router)();
// Ruta para obtener el historial de equipos
router.get('/', historialEquipos_1.obtenerHistorialEquipos);
exports.default = router;
