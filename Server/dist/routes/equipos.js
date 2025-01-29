"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipos_1 = require("../controllers/equipos");
const router = (0, express_1.Router)();
// ✅ Obtener todos los equipos
router.get('/', equipos_1.getEquipos);
// ✅ Obtener un equipo por ID
router.get('/:id', equipos_1.getEquipo);
// ✅ Registrar turno de trabajo
router.post('/turno', equipos_1.registrarTurno);
// ✅ Obtener turnos de trabajo registrados
router.get('/turnos', equipos_1.getTurnosTrabajoController);
exports.default = router;
