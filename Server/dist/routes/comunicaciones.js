"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comunicaciones_1 = require("../controllers/comunicaciones");
const router = (0, express_1.Router)();
router.get('/', comunicaciones_1.getComunicaciones);
router.get('/:id', comunicaciones_1.getComunicacion);
router.delete('/:id', comunicaciones_1.deleteComunicacion);
router.put('/:id', comunicaciones_1.updateComunicacion);
router.post('/', comunicaciones_1.postComunicacion);
exports.default = router;
