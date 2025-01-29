import {Request, Response, RequestHandler} from 'express'
import { getAllCarreteras, getCarreterasByNombre, getCarreterasByPrioridad, updateEstadoCarreteras } from '../models/carreteras';

export const getCarreteras = async (req: Request, res: Response): Promise<void> => {
    try {
      const carreteras = await getAllCarreteras();
      res.status(200).json({
        msg: '✅ Consulta exitosa',
        data: carreteras,
      });
    } catch (error) {
      console.error('❌ Error al obtener carreteras:', error);
      res.status(500).json({
        msg: '❌ Error interno en la API',
        error: error instanceof Error ? error.message : error,
      });
    }
}

export const getCarreterasPorNombre = async (req: Request, res: Response) => {
    try {
      const { nombre } = req.params;
      const data = await getCarreterasByNombre(nombre);
      res.json({ msg: "✅ Carreteras encontradas", data });
    } catch (error) {
      res.status(500).json({ msg: "❌ Error en la consulta", error });
    }
}

export const getCarreterasPorPrioridad = async (req: Request, res: Response) => {
    try {
      const { prioridad } = req.params;
      const data = await getCarreterasByPrioridad(Number(prioridad));
      res.json({ msg: "✅ Carreteras encontradas", data });
    } catch (error) {
      res.status(500).json({ msg: "❌ Error en la consulta", error });
    }
}

export const putEstadoCarretera = async (req: Request, res: Response): Promise<void> => {
    try {
        const { prioridad, carretera, estadoNombre } = req.body;

        if (!prioridad || !estadoNombre) {
            res.status(400).json({ msg: "❌ Falta prioridad o estadoNombre" });
            return;
        }

        await updateEstadoCarreteras(prioridad, carretera, estadoNombre);
        res.json({ msg: "✅ Estado actualizado correctamente" });
    } catch (error) {
        console.error("❌ Error en putEstadoCarretera:", error);
        res.status(500).json({ msg: "❌ Error al actualizar el estado", error });
    }
}

