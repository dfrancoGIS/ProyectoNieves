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
exports.getCampanias = getCampanias;
exports.getCampaniasFiltradas = getCampaniasFiltradas;
exports.eliminarCampania = eliminarCampania;
exports.actualizarFinCampaniaAnterior = actualizarFinCampaniaAnterior;
exports.insertarNuevaCampania = insertarNuevaCampania;
exports.replicarDatosNuevaCampania = replicarDatosNuevaCampania;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener todas las campañas
function getCampanias() {
    return connection_1.default.query(`
      SELECT *
      FROM dbo."Campañas"
      `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para obtener campañas filtradas por titulo_campania
function getCampaniasFiltradas(tituloCampania) {
    return connection_1.default.query(`
    SELECT *
    FROM dbo."Campañas"
    WHERE titulo_campania = :tituloCampania
    `, {
        replacements: { tituloCampania },
        type: sequelize_1.QueryTypes.SELECT
    });
}
// Función para eliminar una campaña por su ID
function eliminarCampania(id_campania) {
    return connection_1.default.query(`
    CALL dbo.eliminar_campanias(:id_campania);
    `, {
        replacements: { id_campania },
        type: sequelize_1.QueryTypes.RAW,
    }).then(() => { });
}
// ✅ Actualizar la fecha de fin de la campaña anterior
function actualizarFinCampaniaAnterior(fechaFinAnterior) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`CALL dbo.actualizar_fin_campania(:fechaFinAnterior)`, {
                replacements: { fechaFinAnterior },
                type: sequelize_1.QueryTypes.RAW,
            });
        }
        catch (error) {
            console.error('❌ Error al actualizar la fecha de fin de la campaña anterior:', error);
            throw new Error('Error al actualizar la fecha de fin de la campaña anterior.');
        }
    });
}
// ✅ Insertar una nueva campaña y devolver su ID
function insertarNuevaCampania(titulo, fechaInicio) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield connection_1.default.query(`
      INSERT INTO dbo."Campañas" (titulo_campania, inicio_campania, fin_campania)
      VALUES (:titulo, :fechaInicio, NULL)
      RETURNING id_campania;
      `, {
                replacements: { titulo, fechaInicio },
                type: sequelize_1.QueryTypes.SELECT,
            });
            return result[0].id_campania; // Devuelve el ID de la nueva campaña
        }
        catch (error) {
            console.error('❌ Error al insertar la nueva campaña:', error);
            throw new Error('Error al insertar la nueva campaña.');
        }
    });
}
// ✅ Replicar datos de la última campaña a la nueva
function replicarDatosNuevaCampania(idCampaniaAnterior, idCampaniaNueva) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`CALL dbo.replicar_datos_nueva_campania(:idCampaniaAnterior, :idCampaniaNueva)`, {
                replacements: { idCampaniaAnterior, idCampaniaNueva },
                type: sequelize_1.QueryTypes.RAW,
            });
        }
        catch (error) {
            console.error('❌ Error al replicar datos de la campaña anterior:', error);
            throw new Error('Error al replicar datos de la campaña anterior.');
        }
    });
}
