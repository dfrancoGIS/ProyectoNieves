"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipos_1 = require("../controllers/equipos");
const router = (0, express_1.Router)();
router.get('/', equipos_1.getEquipos);
router.get('/:id', equipos_1.getEquipo);
router.delete('/:id', equipos_1.deleteEquipo);
router.put('/:id', equipos_1.updateEquipo);
router.post('/', equipos_1.postEquipo);
exports.default = router;
