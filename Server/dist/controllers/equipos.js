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
exports.getTurnosTrabajoController = exports.registrarTurno = exports.getEquipo = exports.getEquipos = void 0;
const equipos_1 = require("../models/equipos");
// ✅ Obtener lista de equipos
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipos = yield (0, equipos_1.getAllEquipos)();
        res.json(equipos);
    }
    catch (error) {
        console.error("❌ Error al obtener los equipos:", error);
        res.status(500).json({ msg: "❌ Error al obtener los equipos", error });
    }
});
exports.getEquipos = getEquipos;
// ✅ Obtener datos de un equipo específico
const getEquipo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const equipo = yield (0, equipos_1.getEquipoById)(Number(id));
        if (!equipo.length) {
            res.status(404).json({ msg: "❌ Equipo no encontrado" });
            return;
        }
        res.json(equipo[0]);
    }
    catch (error) {
        console.error("❌ Error al obtener el equipo:", error);
        res.status(500).json({ msg: "❌ Error al obtener el equipo", error });
    }
});
exports.getEquipo = getEquipo;
// ✅ Registrar un turno de trabajo
const registrarTurno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { recursoEquipo, fechaInicio, horaInicio, fechaFin, horaFin, responsable, vehiculo } = req.body;
        // ✅ Verifica si todos los valores están presentes
        if (!recursoEquipo || !fechaInicio || !horaInicio || !fechaFin || !horaFin || responsable === undefined || !vehiculo) {
            res.status(400).json({ msg: "❌ Todos los campos son obligatorios" });
            return;
        }
        // ✅ Llama a la función para insertar el turno
        yield (0, equipos_1.registrarTurnoEquipo)(recursoEquipo, fechaInicio, horaInicio, fechaFin, horaFin, responsable, vehiculo);
        res.json({ msg: "✅ Turno registrado correctamente" });
    }
    catch (error) {
        console.error("❌ Error al registrar el turno:", error);
        res.status(500).json({ msg: "❌ Error al registrar el turno", error });
    }
});
exports.registrarTurno = registrarTurno;
// ✅ Obtener turnos de trabajo registrados
const getTurnosTrabajoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const turnos = yield (0, equipos_1.getTurnosTrabajo)();
        res.json(turnos);
    }
    catch (error) {
        console.error("❌ Error al obtener los turnos de trabajo:", error);
        res.status(500).json({ msg: "❌ Error al obtener los turnos", error });
    }
});
exports.getTurnosTrabajoController = getTurnosTrabajoController;
