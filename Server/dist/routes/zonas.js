"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zonas_1 = require("../controllers/zonas");
const router = (0, express_1.Router)();
// Ruta para obtener todas las zonas
router.get('/', zonas_1.getZonas);
exports.default = router;
