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
exports.getAllVehiculos = getAllVehiculos;
exports.getVehiculosPorCampania = getVehiculosPorCampania;
exports.getVehiculosUltimaCampania = getVehiculosUltimaCampania;
exports.eliminarVehiculo = eliminarVehiculo;
exports.insertarVehiculo = insertarVehiculo;
exports.editarVehiculo = editarVehiculo;
exports.getVehiculosPorRecurso = getVehiculosPorRecurso;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
/**
 * Obtiene todos los vehículos usando la función de PostgreSQL.
 */
function getAllVehiculos() {
    return connection_1.default.query(`SELECT * FROM obtener_vehiculos_ultima_campania()`, { type: sequelize_1.QueryTypes.SELECT });
}
/**
 * ✅ Obtener vehículos filtrados por título de campaña (llamando a la función en PostgreSQL)
 */
function getVehiculosPorCampania(tituloCampana) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_vehiculos_por_campania(:tituloCampana);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { tituloCampana },
    });
}
/**
 * Obtiene todos los vehículos de la campaña con el `id_campania_vehiculos` más alto.
 */
function getVehiculosUltimaCampania() {
    return connection_1.default.query(`
        SELECT * 
        FROM dbo.vehiculos
        WHERE id_campania_vehiculos = (
            SELECT MAX(id_campania_vehiculos) 
            FROM dbo.vehiculos
        )
        `, { type: sequelize_1.QueryTypes.SELECT });
}
// Función para eliminar un vehículo por su ID
function eliminarVehiculo(id_vehiculo) {
    return connection_1.default.query(`
      CALL dbo.eliminar_vehiculo(:id_vehiculo);
      `, {
        type: sequelize_1.QueryTypes.RAW,
        replacements: { id_vehiculo }, // Reemplazo para evitar inyección de SQL
    }).then(() => {
        // Devolvemos void explícitamente porque no necesitamos los resultados
    });
}
// Función para insertar un vehículo
function insertarVehiculo(id_vehiculo, descripcion_vehiculo, recurso_vehiculo, empresa_vehiculo, tfno_vehiculo, ext_vehiculo, id_campania_vehiculos) {
    return connection_1.default.query('CALL dbo.insertar_vehiculo(:id_vehiculo, :descripcion_vehiculo, :recurso_vehiculo, :empresa_vehiculo, :tfno_vehiculo, :ext_vehiculo, :id_campania_vehiculos)', {
        replacements: {
            id_vehiculo,
            descripcion_vehiculo,
            recurso_vehiculo,
            empresa_vehiculo,
            tfno_vehiculo,
            ext_vehiculo,
            id_campania_vehiculos,
        },
        type: sequelize_1.QueryTypes.RAW, // Ejecutar el procedimiento almacenado
    });
}
function editarVehiculo(id, datos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("🔍 Verificando datos antes de actualizar:", Object.assign({ id }, datos));
            yield connection_1.default.query(`CALL dbo.actualizar_vehiculo(:id_vehiculo, :descripcion_vehiculo, :recurso_vehiculo, :empresa_vehiculo, :tfno_vehiculo, :ext_vehiculo, :id_campania_vehiculos);`, {
                replacements: {
                    id_vehiculo: id,
                    descripcion_vehiculo: datos.descripcion_vehiculo,
                    recurso_vehiculo: datos.recurso_vehiculo,
                    empresa_vehiculo: datos.empresa_vehiculo,
                    tfno_vehiculo: datos.tfno_vehiculo,
                    ext_vehiculo: datos.ext_vehiculo,
                    id_campania_vehiculos: datos.id_campania_vehiculos,
                },
                type: sequelize_1.QueryTypes.RAW,
            });
        }
        catch (error) {
            console.error("❌ Error al actualizar vehículo:", error);
            throw new Error(error instanceof Error ? error.message : "Error desconocido al actualizar el vehículo");
        }
    });
}
function getVehiculosPorRecurso(recurso) {
    return connection_1.default.query(`SELECT * FROM dbo.filtrar_vehiculos_por_recurso(:recurso);`, {
        type: sequelize_1.QueryTypes.SELECT,
        replacements: { recurso },
    });
}
