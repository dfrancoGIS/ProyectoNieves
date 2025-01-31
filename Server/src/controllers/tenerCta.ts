import { Request, Response } from 'express';
import { getTenerCta } from '../models/tenerCta';

/**
 * Controlador para obtener todos los registros de "Tener_Cta".
 */
export const obtenerTenerCta = async (req: Request, res: Response): Promise<void> => {
    try {
        const tenerCta = await getTenerCta();

        res.status(200).json({
            msg: '✅ Elementos de "Tener en cuenta" obtenidos correctamente',
            data: tenerCta,
        });
    } catch (error) {
        console.error('❌ Error al obtener elementos de "Tener en cuenta":', error);
        res.status(500).json({
            msg: '❌ Error al obtener elementos de "Tener en cuenta"',
            error: error instanceof Error ? error.message : error,
        });
    }
};
