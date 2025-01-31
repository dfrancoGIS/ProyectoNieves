"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareas_1 = require("../controllers/tareas");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todas las tareas.
 */
router.get('/', tareas_1.getTareas);
exports.default = router;
