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
exports.getCarreterasConEstado = getCarreterasConEstado;
exports.getCarreterasPorCampania = getCarreterasPorCampania;
exports.updateEstadoCarretera = updateEstadoCarretera;
exports.getCarreterasUltimaCampania = getCarreterasUltimaCampania;
exports.eliminarCarretera = eliminarCarretera;
exports.insertarCarretera = insertarCarretera;
exports.editarCarretera = editarCarretera;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// Función para obtener las carreteras con su estado
function getCarreterasConEstado() {
    return connection_1.default.query('SELECT * FROM select_carreteras_con_estado()', {
        type: sequelize_1.QueryTypes.SELECT,
    });
}
// Obtener las carreteras filtradas por título de campaña (usando la función en la BDD)
function getCarreterasPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_carreteras_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
// Función para actualizar el estado de una carretera
function updateEstadoCarretera(id_carretera, nuevo_estado) {
    return connection_1.default.query('CALL dbo.actualizar_estado_carretera(:id, :estado)', {
        replacements: { id: id_carretera, estado: nuevo_estado },
        type: sequelize_1.QueryTypes.RAW, // Ejecuta el procedimiento almacenado
    });
}
// Función para obtener las carreteras asociadas a la última campaña
function getCarreterasUltimaCampania() {
    return connection_1.default.query(`
    SELECT * 
    FROM dbo.carreteras
    WHERE id_campania_carreteras = (
      SELECT MAX(id_campania_carreteras)
      FROM dbo.carreteras
    )
    `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para eliminar una carretera
function eliminarCarretera(idCarretera) {
    return connection_1.default.query(`
    CALL dbo.eliminar_carretera(:idCarretera);
    `, {
        replacements: { idCarretera },
        type: sequelize_1.QueryTypes.RAW,
    });
}
// Función para insertar una nueva carretera usando el procedimiento
function insertarCarretera(carretera) {
    return connection_1.default.query(`
    CALL dbo.insertar_carretera(
      :carretera, 
      :direccion_carretera, 
      :pk_inferior, 
      :pk_superior, 
      :prioridad_carretera, 
      :zona_carretera, 
      :estado, 
      :id_campania_carreteras, 
      :id_visor
    );
    `, {
        replacements: {
            carretera: carretera.carretera,
            direccion_carretera: carretera.direccion_carretera,
            pk_inferior: carretera.pk_inferior,
            pk_superior: carretera.pk_superior,
            prioridad_carretera: carretera.prioridad_carretera,
            zona_carretera: carretera.zona_carretera,
            estado: carretera.estado,
            id_campania_carreteras: carretera.id_campania_carreteras,
            id_visor: carretera.id_visor,
        },
        type: sequelize_1.QueryTypes.RAW, // Llamada al procedimiento almacenado
    });
}
function editarCarretera(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Realiza la actualización de la carretera
            yield connection_1.default.query(`
      UPDATE dbo.carreteras
      SET 
        carretera = :carretera,
        direccion_carretera = :direccion_carretera,
        pk_inferior = :pk_inferior,
        pk_superior = :pk_superior,
        prioridad_carretera = :prioridad_carretera,
        zona_carretera = :zona_carretera,
        estado = :estado,
        id_campania_carreteras = :id_campania_carreteras,
        id_visor = :id_visor
      WHERE id_carretera = :id
      `, {
                replacements: {
                    id,
                    carretera: datos.carretera,
                    direccion_carretera: datos.direccion_carretera,
                    pk_inferior: datos.pk_inferior,
                    pk_superior: datos.pk_superior,
                    prioridad_carretera: datos.prioridad_carretera,
                    zona_carretera: datos.zona_carretera,
                    estado: datos.estado,
                    id_campania_carreteras: datos.id_campania_carreteras,
                    id_visor: datos.id_visor
                },
                type: sequelize_1.QueryTypes.UPDATE,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error al actualizar la carretera: ' + error.message);
            }
            else {
                throw new Error('Error desconocido al actualizar la carretera');
            }
        }
    });
}
