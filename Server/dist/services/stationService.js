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
exports.getStationVariables = exports.getAuthToken = void 0;
const axios_1 = __importDefault(require("axios"));
const AUTH_URL = 'https://iot.skade.es/public_api/v1/users/sign_in'; // Nueva URL corregida
const API_URL = 'https://iot.skade.es/public_api/v1/stations/18293/variables';
// ✅ Formato correcto esperado por la API
const credentials = {
    user: {
        login: 'utealavaeste',
        password: 'utealavaeste'
    }
};
/**
 * Función para obtener el token de autenticación
 */
const getAuthToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("🔑 Solicitando token de autenticación...");
        const response = yield axios_1.default.post(AUTH_URL, credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.data && response.data.auth_token) {
            console.log("✅ Token recibido:", response.data.auth_token);
            return response.data.auth_token;
        }
        else {
            throw new Error("No se recibió un token válido");
        }
    }
    catch (error) {
        console.error('❌ Error al obtener el token:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.status, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw new Error('No se pudo obtener el token de autenticación.');
    }
});
exports.getAuthToken = getAuthToken;
/**
 * Función para obtener datos de la API de estaciones usando el token
 */
const getStationVariables = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = yield (0, exports.getAuthToken)(); // Primero obtenemos el token
        console.log("📡 Solicitando datos de la estación con el token...");
        const response = yield axios_1.default.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        console.log("✅ Datos obtenidos:", response.data);
        return response.data;
    }
    catch (error) {
        console.error('❌ Error al obtener datos de la estación:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.status, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw new Error('No se pudo obtener los datos de la estación.');
    }
});
exports.getStationVariables = getStationVariables;
