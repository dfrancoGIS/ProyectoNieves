import { Request, RequestHandler, Response } from 'express';
import {
    getAllEquipos,
    getEquipoById,
    registrarTurnoEquipo,
    getTurnosTrabajo
} from '../models/equipos';

// ✅ Obtener lista de equipos
export const getEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        const equipos = await getAllEquipos();
        res.json(equipos);
    } catch (error) {
        console.error("❌ Error al obtener los equipos:", error);
        res.status(500).json({ msg: "❌ Error al obtener los equipos", error });
    }
};

// ✅ Obtener datos de un equipo específico
export const getEquipo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const equipo = await getEquipoById(Number(id));
        if (!equipo.length) {
            res.status(404).json({ msg: "❌ Equipo no encontrado" });
            return;
        }
        res.json(equipo[0]);
    } catch (error) {
        console.error("❌ Error al obtener el equipo:", error);
        res.status(500).json({ msg: "❌ Error al obtener el equipo", error });
    }
};

// ✅ Registrar un turno de trabajo
export const registrarTurno = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("📥 Datos recibidos en la solicitud:", req.body);

        const { recursoEquipo, fechaInicio, horaInicio, fechaFin, horaFin, responsable, vehiculo } = req.body;

        // ✅ Verifica si todos los valores están presentes
        if (!recursoEquipo || !fechaInicio || !horaInicio || !fechaFin || !horaFin || responsable === undefined || !vehiculo) {
            res.status(400).json({ msg: "❌ Todos los campos son obligatorios" });
            return;
        }

        // ✅ Llama a la función para insertar el turno
        await registrarTurnoEquipo(recursoEquipo, fechaInicio, horaInicio, fechaFin, horaFin, responsable, vehiculo);

        res.json({ msg: "✅ Turno registrado correctamente" });
    } catch (error) {
        console.error("❌ Error al registrar el turno:", error);
        res.status(500).json({ msg: "❌ Error al registrar el turno", error });
    }
};


// ✅ Obtener turnos de trabajo registrados
export const getTurnosTrabajoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const turnos = await getTurnosTrabajo();
        res.json(turnos);
    } catch (error) {
        console.error("❌ Error al obtener los turnos de trabajo:", error);
        res.status(500).json({ msg: "❌ Error al obtener los turnos", error });
    }
};


