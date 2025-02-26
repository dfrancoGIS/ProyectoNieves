import { Request, Response } from 'express';
import { getAllEstados, eliminarEstado, insertarEstado, editarEstado } from '../models/estados';

// ✅ Obtener todos los estados
export const getEstados = async (req: Request, res: Response): Promise<void> => {
    try {
        const estados = await getAllEstados();
        res.status(200).json({
            msg: '✅ Estados obtenidos correctamente',
            data: estados,
        });
    } catch (error) {
        console.error('❌ Error al obtener estados:', error);
        res.status(500).json({
            msg: '❌ Error al obtener estados',
            error: error instanceof Error ? error.message : error,
        });
    }
};

export const eliminarEstadoHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_estado } = req.params; // ID del estado desde la URL
      console.log('ID recibido para eliminar en el backend:', id_estado); // Debug
      await eliminarEstado(Number(id_estado)); // Convertimos el id a número si es necesario
      res.status(200).json({
        msg: '✅ Estado eliminado correctamente',
      });
    } catch (error) {
      console.error('❌ Error al eliminar estado:', error);
      res.status(500).json({
        msg: '❌ Error interno en la API',
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  export const insertarEstadoController = async (req: Request, res: Response): Promise<void> => {
    const { descripcion_estado, color_estado_r, color_estado_g, color_estado_b } = req.body;
  
    console.log('Datos recibidos en el backend:', req.body);  // Verifica si se están enviando correctamente
  
    try {
      await insertarEstado(descripcion_estado, color_estado_r, color_estado_g, color_estado_b);
      res.status(200).json({
        msg: '✅ Estado añadido correctamente',
      });
    } catch (error) {
      console.error('❌ Error al añadir estado:', error);
      res.status(500).json({
        msg: '❌ Error interno en la API',
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Controlador para editar el registro de estados
export const editarEstadoHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extrae el ID del estado desde los parámetros de la URL
  const datos = req.body;     // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del estado a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarEstado(id, datos);
    res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
  } catch (error) {
    // Maneja los errores de manera apropiada
    if (error instanceof Error) {
      res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
    } else {
      res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
    }
  }
};