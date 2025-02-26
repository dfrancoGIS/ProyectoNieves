"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadosComunicacion_1 = require("../controllers/estadosComunicacion");
const router = (0, express_1.Router)();
// Ruta para obtener los estados de comunicación de la última campaña
router.get('/', estadosComunicacion_1.getEstadosComunicacion);
// Ruta para eliminar un estado de comunicación por su ID
router.delete('/eliminar/:id_estado_comunicacion', estadosComunicacion_1.eliminarEstadoComunicacionHandler);
// Ruta para insertar un nuevo estado de comunicación
router.post('/insertar', estadosComunicacion_1.insertarEstadoComunicacionController);
// Ruta para editar un registro de estado_comunicacion
router.put('/editar/:id', estadosComunicacion_1.editarEstadoComunicacionHandler);
// Ruta para obtener los estados de comunicación filtrados por campaña
router.get('/filtrar', estadosComunicacion_1.obtenerEstadosComunicacionPorCampania);
exports.default = router;
