"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carreteras_1 = require("../controllers/carreteras");
const router = (0, express_1.Router)();
router.get('/', carreteras_1.getCarreteras);
router.put('/actualizar-estado', carreteras_1.actualizarEstadoCarretera);
// Ruta para obtener carreteras de la última campaña
router.get('/ultima-campania', carreteras_1.getCarreterasUltima);
// Ruta para eliminar una carretera
router.delete('/eliminar', carreteras_1.eliminarCarreteraController);
// Ruta para insertar una nueva carretera
router.post('/insertar', carreteras_1.insertarCarreteraController);
// Ruta para editar un registro de carretera
router.put('/editar/:id', carreteras_1.editarCarreteraHandler); // Usamos PUT para editar 
//Ruta para obtener carreteras filtradas por título de campaña
router.get('/filtrar', carreteras_1.obtenerCarreterasPorCampania);
exports.default = router;
