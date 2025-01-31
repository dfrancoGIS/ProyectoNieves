"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculos_1 = require("../controllers/vehiculos");
const router = (0, express_1.Router)();
// ✅ Obtener todos los vehículos
router.get("/", vehiculos_1.getVehiculos);
// ✅ Obtener un vehículo por matrícula
router.get("/:matricula", vehiculos_1.getVehiculo);
// ✅ Insertar un nuevo vehículo
router.post("/", vehiculos_1.registrarVehiculo);
exports.default = router;
