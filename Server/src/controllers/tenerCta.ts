import { Request, Response } from 'express';
import { getTenerCtaUltimaCampania, eliminarTenerCta, insertarTenerCta, editarTenerCta, getTenerCtaPorCampania } from '../models/tenerCta';

export const getTenerCta = async (req: Request, res: Response): Promise<void> => {
  try {
    const tenerCta = await getTenerCtaUltimaCampania();
    res.status(200).json({
      msg: '✅ Tener CTA obtenidos correctamente',
      data: tenerCta,
    });
  } catch (error) {
    console.error('❌ Error al obtener Tener CTA:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Obtener registros filtrados por campaña
export const obtenerTenerCtaPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampania } = req.query;
    if (!tituloCampania) {
      res.status(400).json({ msg: '❌ Se requiere el parámetro "tituloCampania".' });
    }

    const data = await getTenerCtaPorCampania(tituloCampania as string);
    res.json({ msg: '✅ Registros obtenidos correctamente', data });
  } catch (error) {
    res.status(500).json({ msg: '❌ Error al obtener registros', error });
  }
};

export const eliminarTenerCtaHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { v_id_tener_cta } = req.params; // Obtenemos el ID de la URL
    console.log('ID recibido para eliminar en el backend:', v_id_tener_cta);
    
    // Llamamos a la función que elimina el registro
    await eliminarTenerCta(Number(v_id_tener_cta)); // Convertimos el id a un número

    res.status(200).json({
      msg: '✅ Registro eliminado correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar registro de tener_cta:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controlador para insertar un nuevo estado de tener_cta
export const insertarTenerCtaController = async (req: Request, res: Response): Promise<void> => {
  const { descripcion_tener_cta, id_campania_tener_cta } = req.body;

  try {
    await insertarTenerCta(descripcion_tener_cta, id_campania_tener_cta);
    res.status(200).json({ msg: '✅ Estado de tener_cta añadido correctamente' });
  } catch (error) {
    console.error('❌ Error al añadir tener_cta:', error);
    res.status(500).json({ msg: '❌ Error interno en la API', error: error instanceof Error ? error.message : error });
  }
};

export const editarTenerCtaHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extrae el ID desde los parámetros de la URL
  const datos = req.body;     // Los datos vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del registro a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarTenerCta(id, datos);
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
