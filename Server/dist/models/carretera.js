"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCarretera = insertCarretera;
const connection_1 = __importDefault(require("../db/connection"));
function insertCarretera(Carretera, Direccion_Carretera, PK_Inferior, PK_Superior, Prioridad_Carretera, Zona_Carretera, Estado, Id_Campania_Carreteras, ID_VISOR) {
    return connection_1.default.query('EXEC NombreDelProcedimiento :Carretera, :Direccion_Carretera, :PK_Inferior, :PK_Superior, :Prioridad_Carretera, :Zona_Carretera, :Estado, :Id_Campania_Carreteras, :ID_VISOR', {
        replacements: {
            Carretera: Carretera,
            Direccion_Carretera: Direccion_Carretera,
            PK_Inferior: PK_Inferior,
            PK_Superior: PK_Superior,
            Prioridad_Carretera: Prioridad_Carretera,
            Zona_Carretera: Zona_Carretera,
            Estado: Estado,
            Id_Campania_Carreteras: Id_Campania_Carreteras,
            ID_VISOR: ID_VISOR,
        },
    });
}
