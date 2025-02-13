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
exports.getEstados = void 0;
const estados_1 = require("../models/estados");
// ✅ Controlador para obtener todos los estados
const getEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield (0, estados_1.getAllEstados)();
        // Verifica el contenido de los datos obtenidos
        console.log("Datos obtenidos desde la base de datos:", estados);
        const estadosMap = estados.map((estado) => ({
            id: estado.id_estado, // Verifica que estas claves existen en los objetos devueltos
            nombre: estado.descripcion_estado, // Verifica que estas claves existen en los objetos devueltos
        }));
        res.json({ msg: "✅ Estados obtenidos correctamente", data: estadosMap });
    }
    catch (error) {
        console.error("❌ Error al obtener estados:", error);
        res.status(500).json({ msg: "❌ Error al obtener estados", error });
    }
});
exports.getEstados = getEstados;
