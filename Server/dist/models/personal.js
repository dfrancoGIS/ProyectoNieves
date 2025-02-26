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
exports.getPersonal = getPersonal;
exports.getPersonalPorCampania = getPersonalPorCampania;
exports.eliminarPersonal = eliminarPersonal;
exports.insertarPersonal = insertarPersonal;
exports.editarPersonal = editarPersonal;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener los registros de personal de la última campaña
function getPersonal() {
    return connection_1.default.query(`
    SELECT * 
    FROM dbo.personal
    WHERE id_campania_personal = (
        SELECT MAX(id_campania_personal) 
        FROM dbo.personal
    );
    `, {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
/**
 * ✅ Obtener los registros de personal filtrados por el título de la campaña (usando la función de la BDD)
 */
function getPersonalPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_personal_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
// Función para eliminar un registro de personal
function eliminarPersonal(idPersonal) {
    return connection_1.default.query(`SELECT dbo.eliminar_personal(:idPersonal);`, // Llama al procedimiento almacenado
    {
        replacements: { idPersonal }, // Reemplaza el parámetro
        type: sequelize_1.QueryTypes.RAW, // RAW porque es un procedimiento almacenado
    });
}
// Función para insertar un nuevo personal en la base de datos
function insertarPersonal(nombre_personal, apellido1_personal, apellido2_personal, alias_personal, ocupacion_personal, tfno1_personal, tfno2_personal, ext_personal, departamento_personal, dfa_personal, id_campania_personal, activo // 🆕 Agregamos el campo activo
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.query(`
          CALL dbo.insertar_personal(
              :p_nombre_personal,
              :p_apellido1_personal,
              :p_apellido2_personal,
              :p_alias_personal,
              :p_ocupacion_personal,
              :p_tfno1_personal,
              :p_tfno2_personal,
              :p_ext_personal,
              :p_departamento_personal,
              :p_dfa_personal,
              :p_id_campania_personal,
              :p_activo  -- 🆕 Se añade en la llamada al procedimiento
          );
          `, {
                replacements: {
                    p_nombre_personal: nombre_personal,
                    p_apellido1_personal: apellido1_personal,
                    p_apellido2_personal: apellido2_personal,
                    p_alias_personal: alias_personal,
                    p_ocupacion_personal: ocupacion_personal,
                    p_tfno1_personal: tfno1_personal,
                    p_tfno2_personal: tfno2_personal,
                    p_ext_personal: ext_personal,
                    p_departamento_personal: departamento_personal,
                    p_dfa_personal: dfa_personal,
                    p_id_campania_personal: id_campania_personal,
                    p_activo: activo // 🆕 Se pasa el nuevo valor
                },
                type: sequelize_1.QueryTypes.RAW,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al insertar el personal: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al insertar el personal');
            }
        }
    });
}
// Función para editar el registro de personal en la base de datos
function editarPersonal(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield connection_1.default.query(`
      UPDATE dbo.personal
      SET 
        nombre_personal = :nombre_personal,
        apellido1_personal = :apellido1_personal,
        apellido2_personal = :apellido2_personal,
        alias_personal = :alias_personal,
        ocupacion_personal = :ocupacion_personal,
        tfno1_personal = :tfno1_personal,
        tfno2_personal = :tfno2_personal,
        ext_personal = :ext_personal,
        departamento_personal = :departamento_personal,
        dfa_personal = :dfa_personal,
        id_campania_personal = :id_campania_personal,
        activo = :activo  -- 🆕 Se agrega el campo activo
      WHERE id_personal = :id
      `, {
                replacements: {
                    id,
                    nombre_personal: datos.nombre_personal,
                    apellido1_personal: datos.apellido1_personal,
                    apellido2_personal: datos.apellido2_personal,
                    alias_personal: datos.alias_personal,
                    ocupacion_personal: datos.ocupacion_personal,
                    tfno1_personal: datos.tfno1_personal,
                    tfno2_personal: datos.tfno2_personal,
                    ext_personal: datos.ext_personal,
                    departamento_personal: datos.departamento_personal,
                    dfa_personal: datos.dfa_personal,
                    id_campania_personal: datos.id_campania_personal,
                    activo: (_a = datos.activo) !== null && _a !== void 0 ? _a : false // 🆕 Se asegura que tenga un valor por defecto
                },
                type: sequelize_1.QueryTypes.UPDATE,
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
