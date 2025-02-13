import { Request, Response } from 'express';
import { getAllVehiculos } from '../models/vehiculos';
import { getLastCampaignId } from '../models/equipos'; // 👈 Importa correctamente la función


// ✅ Obtener todos los vehículos
export const getVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculos = await getAllVehiculos();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    } catch (error) {
        console.error('❌ Error al obtener vehículos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos',
            error: error instanceof Error ? error.message : error,
        });
    }
};