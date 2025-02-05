import axios from 'axios';

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
export const getAuthToken = async () => {
    try {
        console.log("🔑 Solicitando token de autenticación...");

        const response = await axios.post(AUTH_URL, credentials, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.data && response.data.auth_token) {
            console.log("✅ Token recibido:", response.data.auth_token);
            return response.data.auth_token;
        } else {
            throw new Error("No se recibió un token válido");
        }
    } catch (error: any) {
        console.error('❌ Error al obtener el token:', error.response?.status, error.response?.data || error.message);
        throw new Error('No se pudo obtener el token de autenticación.');
    }
};

/**
 * Función para obtener datos de la API de estaciones usando el token
 */
export const getStationVariables = async () => {
    try {
        const token = await getAuthToken(); // Primero obtenemos el token
        console.log("📡 Solicitando datos de la estación con el token...");

        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        console.log("✅ Datos obtenidos:", response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Error al obtener datos de la estación:', error.response?.status, error.response?.data || error.message);
        throw new Error('No se pudo obtener los datos de la estación.');
    }
};






