import { Request, Response } from 'express';
import { getRecursosUltimaCampania, getAllRecursos, eliminarRecurso, insertarRecurso, editarRecurso, getRecursosPorCampania, getTareasPorCampania } from '../models/recursos';

export const getRecursos = async (req: Request, res: Response): Promise<void> => {
  try {
    const recursos = await getRecursosUltimaCampania();
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

// Obtener tareas filtradas por campaña
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

/**
 * Controlador para obtener todos los recursos.
 */
export const getRecursosEquipos = async (req: Request, res: Response): Promise<void> => {
  try {
      const recursos = await getAllRecursos();
      res.status(200).json({
          msg: '✅ Recursos obtenidos correctamente',
          data: recursos,
      });
  } catch (error) {
      console.error('❌ Error al obtener recursos:', error);
      res.status(500).json({
          msg: '❌ Error al obtener recursos',
          error: error instanceof Error ? error.message : error,
      });
  }
};

/**
 * ✅ Obtener recursos filtrados por título de campaña (llamando a la función en PostgreSQL)
 */
export const obtenerRecursosPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const recursos = await getRecursosPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Recursos obtenidos correctamente',
      data: recursos,
    });
  } catch (error) {
    console.error('❌ Error al obtener recursos por campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const eliminarRecursoController = async (req: Request, res: Response): Promise<void> => {
  const { id_recurso } = req.body;

  if (!id_recurso) {
    res.status(400).json({ msg: '❌ Debes proporcionar un ID de recurso' });
    return;
  }

  try {
    await eliminarRecurso(id_recurso);
    res.status(200).json({ msg: '✅ Recurso eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar recurso:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};


// Controlador para insertar un nuevo recurso
export const insertarRecursoController = async (req: Request, res: Response): Promise<void> => {
  const { id_recurso, empresa_recurso, id_campania_recursos } = req.body;

  if (!id_recurso || !empresa_recurso || !id_campania_recursos) {
    res.status(400).json({ msg: '❌ Faltan parámetros para insertar el recurso' });
    return;
  }

  try {
    await insertarRecurso(id_recurso, empresa_recurso, id_campania_recursos);
    res.status(200).json({ msg: '✅ Recurso insertado correctamente' });
  } catch (error) {
    console.error('❌ Error al insertar el recurso:', error);
    res.status(500).json({ msg: '❌ Error interno en la API', error });
  }
};

// Controlador para actualizar el recurso
export const editarRecursoHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extrae el ID del recurso desde los parámetros de la URL
  const datos = req.body;     // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del recurso a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarRecurso(id, datos);
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