import { Request, Response } from 'express';
import { getEquipoPersonalByIdEquipo } from '../models/equipoPersonal';

/**
 * Controlador para obtener los registros de personal asignado a un equipo específico.
 */
export const getEquipoPersonal = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idEquipo } = req.params;

        if (!idEquipo) {
            res.status(400).json({ msg: "❌ El ID del equipo es obligatorio" });
            return;
        }

        const equipoPersonal = await getEquipoPersonalByIdEquipo(Number(idEquipo));

        res.status(200).json({
            msg: '✅ Personal del equipo obtenido correctamente',
            data: equipoPersonal,
        });
    } catch (error) {
        console.error('❌ Error al obtener el personal del equipo:', error);
        res.status(500).json({
            msg: '❌ Error al obtener el personal del equipo',
            error: error instanceof Error ? error.message : error,
        });
    }
};
