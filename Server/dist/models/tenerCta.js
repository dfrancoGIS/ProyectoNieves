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
exports.getTenerCtaUltimaCampania = getTenerCtaUltimaCampania;
exports.getTenerCtaPorCampania = getTenerCtaPorCampania;
exports.eliminarTenerCta = eliminarTenerCta;
exports.insertarTenerCta = insertarTenerCta;
exports.editarTenerCta = editarTenerCta;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Obtener los datos de `tener_cta` con el último id_campania_tener_cta
function getTenerCtaUltimaCampania() {
    return connection_1.default.query(`
    SELECT * 
    FROM dbo.tener_cta
    WHERE id_campania_tener_cta = (
      SELECT MAX(id_campania_tener_cta)
      FROM dbo.tener_cta
    )
    `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para obtener los registros de "tener_cta" filtrados por campaña
function getTenerCtaPorCampania(titulo_campania) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_tener_cta_por_campania(:titulo_campania)`, {
        replacements: { titulo_campania },
        type: sequelize_1.QueryTypes.SELECT,
    });
}
// Función para eliminar un registro de 'tener_cta' por su ID
function eliminarTenerCta(v_id_tener_cta) {
    return connection_1.default.query(`
    CALL dbo.eliminar_tener_cta(:v_id_tener_cta);
    `, {
        replacements: { v_id_tener_cta }, // Reemplazamos el valor para evitar inyección SQL
        type: sequelize_1.QueryTypes.RAW,
    }).then(() => {
        // No se necesita devolver nada, solo resolvemos la promesa.
    });
}
// Función para insertar un nuevo registro en tener_cta
function insertarTenerCta(descripcion_tener_cta, id_campania_tener_cta) {
    return connection_1.default.query(`CALL dbo.insertar_tener_cta(:descripcion_tener_cta, :id_campania_tener_cta);`, {
        replacements: { descripcion_tener_cta, id_campania_tener_cta },
        type: sequelize_1.QueryTypes.RAW,
    });
}
function editarTenerCta(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`
      CALL dbo.actualizar_tener_cta(:id_tener_cta, :descripcion_tener_cta, :id_campania_tener_cta);
      `, {
                replacements: {
                    id_tener_cta: id, // ID que se desea actualizar
                    descripcion_tener_cta: datos.descripcion_tener_cta,
                    id_campania_tener_cta: datos.id_campania_tener_cta
                },
                type: sequelize_1.QueryTypes.RAW, // Usamos un raw query para llamar al procedimiento almacenado
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar el registro: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar el registro');
            }
        }
    });
}
