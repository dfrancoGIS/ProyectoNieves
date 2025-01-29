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
const carreteras_1 = require("./src/models/carreteras");
function probarInsertCarretera() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resultado = yield (0, carreteras_1.insertCarretera)('Carretera de Prueba', 'Norte', 0, 100, 1, 'Zona 1', 1, 123, 456);
            console.log('✅ Inserción exitosa:', resultado);
        }
        catch (error) {
            console.error('❌ Error al insertar la carretera:', error);
        }
    });
}
probarInsertCarretera();
