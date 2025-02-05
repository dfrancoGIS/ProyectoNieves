"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stationControllers_1 = require("../controllers/stationControllers");
const router = (0, express_1.Router)();
router.get('/station-data', stationControllers_1.getStationData);
router.get('/station-data/:id', stationControllers_1.getStationDataById);
exports.default = router;
