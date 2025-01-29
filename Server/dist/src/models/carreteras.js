"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCarretera = insertCarretera;
const connection_1 = __importDefault(require("../db/connection"));
function insertCarretera(Carretera, Direccion_Carretera, PK_Inferior, PK_Superior, Prioridad_Carretera, Zona_Carretera, Estado, Id_Campania_Carreteras, ID_VISOR) {
    return connection_1.default.query(`INSERT INTO Carreteras 
      (Carretera, Direccion_Carretera, PK_Inferior, PK_Superior, Prioridad_Carretera, Zona_Carretera, Estado, Id_Campania_Carreteras, ID_VISOR) 
    VALUES 
      (:Carretera, :Direccion_Carretera, :PK_Inferior, :PK_Superior, :Prioridad_Carretera, :Zona_Carretera, :Estado, :Id_Campania_Carreteras, :ID_VISOR)`, {
        replacements: {
            Carretera,
            Direccion_Carretera,
            PK_Inferior,
            PK_Superior,
            Prioridad_Carretera,
            Zona_Carretera,
            Estado,
            Id_Campania_Carreteras,
            ID_VISOR,
        },
    });
}
