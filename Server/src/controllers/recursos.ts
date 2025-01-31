import { Request, Response } from 'express';
import { getAllRecursos } from '../models/recursos';

/**
 * Controlador para obtener todos los recursos.
 */
export const getRecursos = async (req: Request, res: Response): Promise<void> => {
    try {
        const recursos = await getAllRecursos();
        res.status(200).json({
            msg: '✅ Recursos obtenidos correctamente',
            data: recursos,
        });
    } catch (error) {
        console.error('❌ Error al obtener recursos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener recursos',
            error: error instanceof Error ? error.message : error,
        });
    }
};
