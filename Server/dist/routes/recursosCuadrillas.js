"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recursosCuadrillas_1 = require("../controllers/recursosCuadrillas");
const router = (0, express_1.Router)();
router.get('/', recursosCuadrillas_1.getRecursosCuadrillasHandler);
// Ruta para obtener recursos de la última campaña
exports.default = router;
