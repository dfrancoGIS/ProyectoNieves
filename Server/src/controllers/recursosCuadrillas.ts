import { Request, Response } from 'express';
import { getRecursosCuadrillas } from '../models/recursosCuadrillas';


export const getRecursosCuadrillasHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const recursos = await getRecursosCuadrillas();
    res.status(200).json({
      msg: '✅ Recursos de la última campaña obtenidos correctamente',
      data: recursos,
    });
  } catch (error) {
    console.error('❌ Error al obtener recursos:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};