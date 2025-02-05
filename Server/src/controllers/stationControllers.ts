import { Request, Response } from 'express';
import { getStationVariables } from '../services/stationService';

/**
 * Obtener todas las variables de la estación
 */
export const getStationData = async (req: Request, res: Response) => {
    try {
        console.log("📡 Solicitando datos de la estación...");
        const data = await getStationVariables();
        console.log("✅ Datos obtenidos:", data);
        res.json(data);
    } catch (error: any) {
        console.error("❌ Error en getStationData:", error.message || error);
        res.status(500).json({ error: "Error al obtener datos de la estación", detalle: error.message });
    }
};

/**
 * Obtener una variable específica por ID
 */
export const getStationDataById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(`🔎 Buscando variable con ID: ${id}`);

        if (isNaN(id)) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        const data = await getStationVariables();
        const result = data.find((item: any) => item.id === id);

        if (!result) {
            res.status(404).json({ error: `No se encontró la variable con ID ${id}` });
            return;
        }

        console.log("✅ Variable encontrada:", result);
        res.json(result);
    } catch (error: any) {
        console.error("❌ Error en getStationDataById:", error.message || error);
        res.status(500).json({ error: "Error al obtener la variable de la estación", detalle: error.message });
    }
};


