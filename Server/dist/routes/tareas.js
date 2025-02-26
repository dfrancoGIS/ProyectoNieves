"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareas_1 = require("../controllers/tareas");
const router = (0, express_1.Router)();
// Ruta para obtener las tareas de la última campaña
router.get('/ultima-campania', tareas_1.getTareas);
router.delete('/eliminar/:id_tarea', tareas_1.eliminarTareaHandler); // Eliminar tarea por ID
// Ruta para insertar tarea
router.post('/insertar', tareas_1.insertarTareaController);
// Ruta para editar un registro de tarea
router.put('/editar/:id', tareas_1.editarTareaHandler);
router.get('/filtrar', tareas_1.obtenerTareasPorCampania);
exports.default = router;
