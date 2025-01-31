import { Request, Response } from 'express';
import { getAllTareas } from '../models/tareas';

/**
 * Controlador para obtener todas las tareas.
 */
export const getTareas = async (req: Request, res: Response): Promise<void> => {
    try {
        const tareas = await getAllTareas();
        res.status(200).json({
            msg: '✅ Tareas obtenidas correctamente',
            data: tareas,
        });
    } catch (error) {
        console.error('❌ Error al obtener tareas:', error);
        res.status(500).json({
            msg: '❌ Error al obtener tareas',
            error: error instanceof Error ? error.message : error,
        });
    }
};
