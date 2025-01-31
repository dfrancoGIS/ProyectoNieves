import { Request, Response } from 'express';
import { getAllEstadosComunicacion, registrarNuevoEstadoComunicacion } from '../models/estadosComunicacion';

/**
 * Controlador para obtener todos los estados de comunicación de la última campaña activa.
 */
export const getEstadosComunicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const estados = await getAllEstadosComunicacion();
        res.status(200).json({
            msg: '✅ Estados de comunicación obtenidos correctamente',
            data: estados,
        });
    } catch (error) {
        console.error('❌ Error al obtener estados de comunicación:', error);
        res.status(500).json({
            msg: '❌ Error al obtener estados de comunicación',
            error: error instanceof Error ? error.message : error,
        });
    }
};

/**
 * Controlador para registrar un nuevo estado de comunicación.
 */
export const registrarEstadoComunicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);

        const { descripcion } = req.body;

        if (!descripcion) {
            res.status(400).json({ msg: "❌ La descripción del estado es obligatoria" });
            return;
        }

        await registrarNuevoEstadoComunicacion(descripcion);

        res.json({ msg: "✅ Estado de comunicación registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar el estado de comunicación:", error);
        res.status(500).json({ msg: "❌ Error al registrar el estado de comunicación", error });
    }
};
