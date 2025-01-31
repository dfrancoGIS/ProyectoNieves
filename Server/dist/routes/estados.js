"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estados_1 = require("../controllers/estados");
const router = (0, express_1.Router)();
// ✅ Ruta para obtener todos los estados
router.get('/', estados_1.getEstados);
exports.default = router;
