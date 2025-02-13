import { Request, Response } from 'express';
import { getZonasCarretera } from '../models/zonas';

// Función para obtener todas las zonas
export const getZonas = async (req: Request, res: Response): Promise<void> => {
  try {
    const zonas = await getZonasCarretera();
    res.status(200).json({
      msg: '✅ Consulta exitosa',
      data: zonas,
    });
  } catch (error) {
    console.error('❌ Error al obtener zonas:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};
