import { Request, Response } from 'express';
import { getTareasUltimaCampania, eliminarTarea, insertarTarea, editarTarea, getTareasPorCampania } from '../models/tareas';

// Endpoint para obtener las tareas de la última campaña
export const getTareas = async (req: Request, res: Response): Promise<void> => {
  try {
    const tareas = await getTareasUltimaCampania();
    res.status(200).json({
      msg: '✅ Tareas de la última campaña obtenidas correctamente',
      data: tareas,
    });
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const obtenerTareasPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const tareas = await getTareasPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Tareas obtenidas correctamente',
      data: tareas,
    });
  } catch (error) {
    console.error('❌ Error al obtener tareas por campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const eliminarTareaHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_tarea } = req.params; // Obtener el ID desde los parámetros de la URL
    console.log('ID recibido para eliminar en el backend:', id_tarea); // Debug
    await eliminarTarea(Number(id_tarea)); // Asegúrate de convertir el ID a número
    res.status(200).json({
      msg: '✅ Tarea eliminada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar tarea:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const insertarTareaController = async (req: Request, res: Response): Promise<void> => {
  const { descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas } = req.body;

  try {
    await insertarTarea(descripcion_tarea, color_tarea_r, color_tarea_g, color_tarea_b, id_campania_tareas);
    res.status(200).json({
      msg: '✅ Tarea añadida correctamente',
    });
  } catch (error) {
    console.error('❌ Error al añadir tarea:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controlador para editar el registro de tareas
export const editarTareaHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Extrae el ID de la tarea desde los parámetros de la URL
  const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID de la tarea a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarTarea(id, datos);
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


