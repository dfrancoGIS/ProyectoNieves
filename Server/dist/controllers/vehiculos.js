"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarVehiculo = exports.getVehiculo = exports.getVehiculos = void 0;
const vehiculos_1 = require("../models/vehiculos");
const equipos_1 = require("../models/equipos"); // 👈 Importa correctamente la función
// ✅ Obtener todos los vehículos
const getVehiculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculos = yield (0, vehiculos_1.getAllVehiculos)();
        res.json({ msg: "✅ Vehículos obtenidos correctamente", data: vehiculos });
    }
    catch (error) {
        console.error("❌ Error al obtener vehículos:", error);
        res.status(500).json({ msg: "❌ Error al obtener vehículos", error });
    }
});
exports.getVehiculos = getVehiculos;
// ✅ Obtener un vehículo por matrícula
const getVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matricula } = req.params;
    try {
        const vehiculo = yield (0, vehiculos_1.getVehiculoById)(matricula);
        if (!vehiculo.length) {
            res.status(404).json({ msg: "❌ Vehículo no encontrado" });
            return;
        }
        res.json({ msg: "✅ Vehículo encontrado", data: vehiculo[0] });
    }
    catch (error) {
        console.error("❌ Error al obtener el vehículo:", error);
        res.status(500).json({ msg: "❌ Error al obtener el vehículo", error });
    }
});
exports.getVehiculo = getVehiculo;
// ✅ Insertar un nuevo vehículo
const registrarVehiculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { matricula, descripcion, recurso, empresa, telefono } = req.body;
        if (!matricula || !descripcion || !recurso || !empresa || !telefono) {
            res.status(400).json({ msg: "❌ Todos los campos son obligatorios" });
            return;
        }
        // ✅ Obtener la última campaña activa
        const idCampania = yield (0, equipos_1.getLastCampaignId)(); // 📌 No devuelve un array, sino un número o null
        if (!idCampania) {
            res.status(400).json({ msg: "❌ No hay campañas activas disponibles" });
            return;
        }
        // ✅ Llamar a la función de inserción
        yield (0, vehiculos_1.registrarNuevoVehiculo)(matricula, descripcion, recurso, empresa, telefono, idCampania);
        res.json({ msg: "✅ Vehículo registrado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al registrar el vehículo:", error);
        res.status(500).json({ msg: "❌ Error al registrar el vehículo", error });
    }
});
exports.registrarVehiculo = registrarVehiculo;
