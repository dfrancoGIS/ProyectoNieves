"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenerCta_1 = require("../controllers/tenerCta");
const router = (0, express_1.Router)();
// Endpoint para obtener los datos de `tener_cta`
router.get('/', tenerCta_1.getTenerCta);
// Ruta para obtener registros filtrados por campaña
router.get('/filtrar', tenerCta_1.obtenerTenerCtaPorCampania);
// Ruta para eliminar un registro de 'tener_cta'
router.delete('/eliminar/:v_id_tener_cta', tenerCta_1.eliminarTenerCtaHandler);
// Ruta para insertar un nuevo registro de tener_cta
router.post('/insertar', tenerCta_1.insertarTenerCtaController);
// Ruta para editar un registro de tener_cta
router.put('/editar/:id', tenerCta_1.editarTenerCtaHandler);
exports.default = router;
