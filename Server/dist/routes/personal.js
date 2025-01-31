"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personal_1 = require("../controllers/personal");
const router = (0, express_1.Router)();
/**
 * Ruta para obtener todos los registros de Personal.
 */
router.get('/', personal_1.getPersonal);
/**
 * Ruta para registrar un nuevo personal.
 */
router.post('/', personal_1.registrarPersonal);
/**
 * Ruta para actualizar un personal existente.
 */
router.put('/:id', personal_1.modificarPersonal);
/**
 * Ruta para eliminar un personal.
 */
router.delete('/:id', personal_1.borrarPersonal);
exports.default = router;
