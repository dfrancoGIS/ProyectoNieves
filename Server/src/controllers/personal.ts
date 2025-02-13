import { Request, Response } from 'express';
import { getPersonal } from '../models/personal';

export const obtenerPersonal = async (req: Request, res: Response): Promise<void> => {
  try {
    const personal = await getPersonal(); // Llama a la función del modelo
    res.status(200).json({
      msg: '✅ Personal obtenido correctamente',
      data: personal,
    });
  } catch (error) {
    console.error('❌ Error al obtener personal:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};
