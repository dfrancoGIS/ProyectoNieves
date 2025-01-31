"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recursos_1 = require("../controllers/recursos");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todos los recursos.
 */
router.get('/', recursos_1.getRecursos);
exports.default = router;
