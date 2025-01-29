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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstadoCarreteras = void 0;
exports.getAllCarreteras = getAllCarreteras;
exports.getCarreterasByNombre = getCarreterasByNombre;
exports.getCarreterasByPrioridad = getCarreterasByPrioridad;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
function getAllCarreteras() {
    return connection_1.default.query('SELECT * FROM Carreteras', {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
function getCarreterasByNombre(nombre) {
    return connection_1.default.query('SELECT * FROM Carreteras WHERE Carretera = :nombre', {
        replacements: { nombre },
        type: sequelize_1.QueryTypes.SELECT,
    });
}
function getCarreterasByPrioridad(prioridad) {
    return connection_1.default.query('SELECT * FROM Carreteras WHERE Prioridad_Carretera = :prioridad', {
        replacements: { prioridad },
        type: sequelize_1.QueryTypes.SELECT,
    });
}
const updateEstadoCarreteras = (prioridad, carretera, estadoNombre) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("📥 Datos recibidos:", { prioridad, carretera, estadoNombre });
    if (!prioridad || !estadoNombre) {
        throw new Error("❌ Prioridad y estado son obligatorios");
    }
    try {
        // Obtener ID del estado
        const estadoResult = yield connection_1.default.query("SELECT Id_Estado FROM Estados WHERE Descripcion_Estado = :estadoNombre", { replacements: { estadoNombre }, type: sequelize_1.QueryTypes.SELECT });
        if (!estadoResult.length) {
            throw new Error("❌ Estado no encontrado");
        }
        const idEstado = estadoResult[0].Id_Estado;
        // Obtener carreteras
        let queryCarreteras = "SELECT Id_Carretera FROM Carreteras WHERE Prioridad_Carretera = :prioridad";
        let replacementsCarreteras = { prioridad };
        if (carretera && carretera !== "TODAS") {
            queryCarreteras += " AND Carretera = :carretera";
            replacementsCarreteras.carretera = carretera;
        }
        const carreterasResult = yield connection_1.default.query(queryCarreteras, {
            replacements: replacementsCarreteras,
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!carreterasResult.length) {
            throw new Error("❌ No se encontraron carreteras con la prioridad dada");
        }
        const idCarreteras = carreterasResult.map((row) => row.Id_Carretera);
        // Actualizar estado
        yield connection_1.default.query("UPDATE Carreteras SET Estado = :idEstado WHERE Id_Carretera IN (:idCarreteras)", { replacements: { idEstado, idCarreteras }, type: sequelize_1.QueryTypes.UPDATE });
        console.log("✅ Estado actualizado para carreteras:", idCarreteras);
    }
    catch (error) {
        console.error("❌ Error en updateEstadoCarreteras:", error);
        throw error;
    }
});
exports.updateEstadoCarreteras = updateEstadoCarreteras;
