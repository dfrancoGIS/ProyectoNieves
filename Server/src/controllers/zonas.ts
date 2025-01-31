import { Request, Response } from 'express';
import { getAllZonas } from '../models/zonas';

/**
 * Controlador para obtener todas las zonas.
 */
export const getZonas = async (req: Request, res: Response): Promise<void> => {
    try {
        const zonas = await getAllZonas();
        res.status(200).json({
            msg: '✅ Zonas obtenidas correctamente',
            data: zonas,
        });
    } catch (error) {
        console.error('❌ Error al obtener zonas:', error);
        res.status(500).json({
            msg: '❌ Error al obtener zonas',
            error: error instanceof Error ? error.message : error,
        });
    }
};
