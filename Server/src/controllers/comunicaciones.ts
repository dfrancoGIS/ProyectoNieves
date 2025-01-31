import { Request, Response } from 'express';
import { getAllComunicaciones, getComunicacionById, registrarComunicacion } from '../models/comunicaciones';

/**
 * Obtiene todas las comunicaciones activas.
 */
export const getComunicaciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const comunicaciones = await getAllComunicaciones();
        res.status(200).json({
            msg: "✅ Comunicaciones obtenidas correctamente",
            data: comunicaciones
        });
    } catch (error) {
        console.error("❌ Error al obtener las comunicaciones:", error);
        res.status(500).json({
            msg: "❌ Error al obtener las comunicaciones",
            error: error instanceof Error ? error.message : error,
        });
    }
};

/**
 * Obtiene una comunicación por ID.
 */
export const getComunicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ msg: "❌ El ID de la comunicación es obligatorio" });
            return;
        }

        const comunicacion = await getComunicacionById(Number(id));
        if (!comunicacion.length) {
            res.status(404).json({ msg: "❌ Comunicación no encontrada" });
            return;
        }

        res.status(200).json({
            msg: "✅ Comunicación obtenida correctamente",
            data: comunicacion[0]
        });
    } catch (error) {
        console.error("❌ Error al obtener la comunicación:", error);
        res.status(500).json({
            msg: "❌ Error al obtener la comunicación",
            error: error instanceof Error ? error.message : error,
        });
    }
};

/**
 * Registra una nueva comunicación.
 */
export const postComunicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);

        const { equipo, recurso, zona, prioridad, carretera, tarea, estadoCarretera, tenerCta, observaciones } = req.body;

        if (!equipo || !recurso || !zona || prioridad === undefined || !carretera || !tarea || !estadoCarretera) {
            res.status(400).json({ msg: "❌ Todos los campos obligatorios deben completarse" });
            return;
        }

        await registrarComunicacion(equipo, recurso, zona, prioridad, carretera, tarea, estadoCarretera, tenerCta, observaciones);

        res.json({ msg: "✅ Comunicación registrada correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar la comunicación:", error);
        res.status(500).json({ msg: "❌ Error al registrar la comunicación", error });
    }
};
