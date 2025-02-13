"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personal_1 = require("../controllers/personal");
const router = (0, express_1.Router)();
// Ruta para obtener el personal
router.get('/', personal_1.obtenerPersonal);
exports.default = router;
