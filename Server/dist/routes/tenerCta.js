"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenerCta_1 = require("../controllers/tenerCta");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todos los registros de "Tener_Cta".
 */
router.get('/', tenerCta_1.obtenerTenerCta);
exports.default = router;
