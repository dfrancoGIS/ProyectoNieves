import { Request, Response } from 'express';
import { getCarreterasRecursoCuadrilla } from '../models/carreterasRecursoCuadrilla';

/**
 * Controlador para obtener todas las carreteras recurso cuadrilla.
 */
export const obtenerCarreterasRecursoCuadrilla = async (req: Request, res: Response): Promise<void> => {
    try {
        const carreteras = await getCarreterasRecursoCuadrilla();

        res.status(200).json({
            msg: '✅ Carreteras recurso cuadrilla obtenidas correctamente',
            data: carreteras,
        });
    } catch (error) {
        console.error('❌ Error al obtener carreteras recurso cuadrilla:', error);
        res.status(500).json({
            msg: '❌ Error al obtener carreteras recurso cuadrilla',
            error: error instanceof Error ? error.message : error,
        });
    }
};
