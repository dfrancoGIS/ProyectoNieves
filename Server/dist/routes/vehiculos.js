"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiculos_1 = require("../controllers/vehiculos");
const router = (0, express_1.Router)();
// ✅ Obtener todos los vehículos
router.get("/", vehiculos_1.getVehiculos);
// Ruta para eliminar un vehículo por su ID
router.delete('/eliminar/:id_vehiculo', vehiculos_1.eliminarVehiculoHandler);
// ✅ Ruta para obtener vehículos de la última campaña
router.get('/ultima-campania', vehiculos_1.getVehiculosDetalle);
// Ruta para insertar vehículo
router.post('/insertar', vehiculos_1.insertarVehiculoController);
// ✅ Ruta para obtener los vehículos filtrados por título de campaña
router.get('/filtrar', vehiculos_1.obtenerVehiculosPorCampania);
router.put('/editar/:id', vehiculos_1.editarVehiculoHandler);
exports.default = router;
