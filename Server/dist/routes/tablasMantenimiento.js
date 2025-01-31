"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tablasMantenimiento_1 = require("../controllers/tablasMantenimiento");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todas las tablas de mantenimiento.
 */
router.get('/', tablasMantenimiento_1.getTablasMantenimiento);
exports.default = router;
