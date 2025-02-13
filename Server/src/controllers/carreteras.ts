import { Request, Response } from 'express';
import { getCarreterasConEstado, updateEstadoCarretera } from '../models/carreteras';

export const getCarreteras = async (req: Request, res: Response): Promise<void> => {
    try {
      const carreteras = await getCarreterasConEstado();
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
};

export const actualizarEstadoCarretera = async (req: Request, res: Response): Promise<void> => {
    const { id_carretera, nuevo_estado } = req.body;

    if (!id_carretera || !nuevo_estado) {
        res.status(400).json({ msg: '❌ Faltan parámetros' });
        return;
    }

    try {
        await updateEstadoCarretera(id_carretera, nuevo_estado);
        res.status(200).json({ msg: '✅ Estado actualizado correctamente' });
    } catch (error) {
        console.error('❌ Error al actualizar estado:', error);
        res.status(500).json({ msg: '❌ Error interno en la API', error });
    }
};
