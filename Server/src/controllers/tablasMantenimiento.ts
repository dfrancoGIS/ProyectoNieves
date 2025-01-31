import { Request, Response } from 'express';
import { getAllTablasMantenimiento } from '../models/tablasMantenimiento';

/**
 * Controlador para obtener todas las tablas de mantenimiento.
 */
export const getTablasMantenimiento = async (req: Request, res: Response): Promise<void> => {
    try {
        const tablas = await getAllTablasMantenimiento();
        res.status(200).json({
            msg: '✅ Tablas de mantenimiento obtenidas correctamente',
            data: tablas,
        });
    } catch (error) {
        console.error('❌ Error al obtener tablas de mantenimiento:', error);
        res.status(500).json({
            msg: '❌ Error al obtener tablas de mantenimiento',
            error: error instanceof Error ? error.message : error,
        });
    }
};
