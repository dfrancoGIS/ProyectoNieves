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
exports.getVehiculoById = getVehiculoById;
exports.registrarNuevoVehiculo = registrarNuevoVehiculo;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
// ✅ Obtener todos los vehículos
function getAllVehiculos() {
    return connection_1.default.query(`SELECT Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, Empresa_Vehiculo, 
            Tfno_Vehiculo, Ext_Vehiculo, Id_Campania_Vehiculos
     FROM Vehiculos`, { type: sequelize_1.QueryTypes.SELECT });
}
// ✅ Obtener un vehículo por su ID (Matrícula)
function getVehiculoById(idVehiculo) {
    return connection_1.default.query(`SELECT Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, Empresa_Vehiculo, 
            Tfno_Vehiculo, Ext_Vehiculo, Id_Campania_Vehiculos
     FROM Vehiculos 
     WHERE Id_Vehiculo = :idVehiculo`, {
        replacements: { idVehiculo },
        type: sequelize_1.QueryTypes.SELECT,
    });
}
// ✅ Insertar un nuevo vehículo
function registrarNuevoVehiculo(idVehiculo, descripcion, recurso, empresa, telefono, idCampania) {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.default.query(`INSERT INTO Vehiculos (Id_Vehiculo, Descripcion_Vehiculo, Recurso_Vehiculo, 
                            Empresa_Vehiculo, Tfno_Vehiculo, Id_Campania_Vehiculos)
     VALUES (:idVehiculo, :descripcion, :recurso, :empresa, :telefono, :idCampania)`, {
            replacements: { idVehiculo, descripcion, recurso, empresa, telefono, idCampania },
            type: sequelize_1.QueryTypes.INSERT,
        });
    });
}
