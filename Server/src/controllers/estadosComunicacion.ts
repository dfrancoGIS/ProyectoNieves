import { Request, Response } from 'express';
import { getEstadosComunicacionUltimaCampania, eliminarEstadoComunicacion, insertarEstadoComunicacion, editarEstadoComunicacion, getEstadosComunicacionPorCampania } from '../models/estadosComunicacion';

export const getEstadosComunicacion = async (req: Request, res: Response): Promise<void> => {
  try {
    const estadosComunicacion = await getEstadosComunicacionUltimaCampania();
    res.status(200).json({
      msg: '✅ Estados de comunicación obtenidos correctamente',
      data: estadosComunicacion,
    });
  } catch (error) {
    console.error('❌ Error al obtener estados de comunicación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * Controlador para obtener estados de comunicación por campaña
 */
export const obtenerEstadosComunicacionPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const estados = await getEstadosComunicacionPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Estados de comunicación obtenidos correctamente',
      data: estados,
    });
  } catch (error) {
    console.error('❌ Error al obtener estados de comunicación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const eliminarEstadoComunicacionHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_estado_comunicacion } = req.params;  // ID del estado de comunicación desde la URL
    console.log('ID recibido para eliminar en el backend:', id_estado_comunicacion);  // Debug
    await eliminarEstadoComunicacion(Number(id_estado_comunicacion));  // Llamada a la función del modelo
    res.status(200).json({
      msg: '✅ Estado de comunicación eliminado correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar estado de comunicación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const insertarEstadoComunicacionController = async (req: Request, res: Response): Promise<void> => {
  const { descripcion_estado_comunicacion, id_campania_estados_comunicacion } = req.body;

  try {
    await insertarEstadoComunicacion(descripcion_estado_comunicacion, id_campania_estados_comunicacion);
    res.status(200).json({ msg: '✅ Estado de comunicación añadido correctamente' });
  } catch (error) {
    console.error('❌ Error al añadir estado de comunicación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controlador para editar el registro de estado_comunicacion
export const editarEstadoComunicacionHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extrae el ID del estado de comunicación desde los parámetros de la URL
  const datos = req.body;     // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del estado de comunicación a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarEstadoComunicacion(id, datos);
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


