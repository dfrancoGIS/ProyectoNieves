"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campanias_1 = require("../controllers/campanias");
const router = (0, express_1.Router)();
// Ruta para obtener todas las campañas
router.get('/', campanias_1.getCampaniasController);
router.get('/filtradas', campanias_1.getCampaniasFiltradasController);
// Ruta para eliminar una campaña por su ID
router.delete('/eliminar/:id_campania', campanias_1.eliminarCampaniaHandler);
// ✅ Crear una nueva campaña
router.post('/crear', campanias_1.crearNuevaCampaniaHandler);
exports.default = router;
