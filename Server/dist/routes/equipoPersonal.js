"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipoPersonal_1 = require("../controllers/equipoPersonal");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener el personal asignado a un equipo específico.
 */
router.get('/:idEquipo', equipoPersonal_1.getEquipoPersonal);
exports.default = router;
