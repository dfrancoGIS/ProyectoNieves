"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personal_1 = require("../controllers/personal");
const router = (0, express_1.Router)();
// Ruta para obtener el personal
router.get('/', personal_1.obtenerPersonal);
// Ruta para obtener el personal filtrado por título de campaña
router.get('/filtrar', personal_1.obtenerPersonalPorCampania);
// Ruta para eliminar un registro de personal
router.delete('/eliminar', personal_1.borrarPersonal);
// Ruta para insertar un nuevo personal
router.post('/insertar', personal_1.insertarPersonalHandler);
// Ruta para editar un registro de personal
router.put('/editar/:id', personal_1.editarPersonalHandler); // Usamos PUT para editar
exports.default = router;
