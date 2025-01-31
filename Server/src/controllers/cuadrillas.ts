import { Request, Response } from 'express';
import { getAllCuadrillas } from '../models/cuadrillas';

/**
 * Controlador para obtener todas las cuadrillas.
 */
export const getCuadrillas = async (req: Request, res: Response): Promise<void> => {
    try {
        const cuadrillas = await getAllCuadrillas();
        res.status(200).json({
            msg: '✅ Cuadrillas obtenidas correctamente',
            data: cuadrillas,
        });
    } catch (error) {
        console.error('❌ Error al obtener cuadrillas:', error);
        res.status(500).json({
            msg: '❌ Error al obtener cuadrillas',
            error: error instanceof Error ? error.message : error,
        });
    }
};
