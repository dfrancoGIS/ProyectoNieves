// controllers/historialEquipos.ts

import { Request, Response } from 'express';
import { getHistorialEquipos } from '../models/historialEquipos';

export const obtenerHistorialEquipos = async (req: Request, res: Response): Promise<void> => {
  try {
    const historial = await getHistorialEquipos();  // Aquí obtenemos el historial
    res.status(200).json({
      msg: '✅ Consulta exitosa',
      data: historial,
    });
  } catch (error) {
    console.error('❌ Error al obtener historial de equipos:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};
