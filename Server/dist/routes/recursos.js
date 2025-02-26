"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recursos_1 = require("../controllers/recursos");
const router = (0, express_1.Router)();
router.get('/', recursos_1.getRecursosEquipos);
// Ruta para obtener recursos de la última campaña
router.get('/ultima-campania', recursos_1.getRecursos);
// Ruta para eliminar un recurso
router.delete('/eliminar', recursos_1.eliminarRecursoController);
// Ruta para insertar un recurso
router.post('/insertar', recursos_1.insertarRecursoController);
// Ruta para editar un recurso (utilizando PUT)
router.put('/editar/:id', recursos_1.editarRecursoHandler);
// Ruta para obtener los recursos filtrados por título de campaña
router.get('/filtrar', recursos_1.obtenerRecursosPorCampania);
// Ruta para obtener tareas filtradas por título de campaña
router.get('/filtrar', recursos_1.obtenerTareasPorCampania);
exports.default = router;
