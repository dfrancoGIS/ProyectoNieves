"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreteras_1 = require("../controllers/carreteras");
const router = (0, express_1.Router)();
router.get('/', carreteras_1.getCarreteras);
router.put('/actualizar-estado', carreteras_1.actualizarEstadoCarretera);
exports.default = router;
