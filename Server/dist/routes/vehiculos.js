"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculos_1 = require("../controllers/vehiculos");
const router = (0, express_1.Router)();
// ✅ Obtener todos los vehículos
router.get("/", vehiculos_1.getVehiculos);
exports.default = router;
