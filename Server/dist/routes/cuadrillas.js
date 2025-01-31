"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cuadrillas_1 = require("../controllers/cuadrillas");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todas las cuadrillas.
 */
router.get('/', cuadrillas_1.getCuadrillas);
exports.default = router;
