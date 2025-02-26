import { Request, Response } from 'express';
import { getCarreterasConEstado, getCarreterasUltimaCampania, updateEstadoCarretera, eliminarCarretera, insertarCarretera, editarCarretera , getCarreterasPorCampania} from '../models/carreteras';

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

// Obtener carreteras filtradas por título de campaña
export const obtenerCarreterasPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const carreteras = await getCarreterasPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Carreteras obtenidas correctamente',
      data: carreteras,
    });
  } catch (error) {
    console.error('❌ Error al obtener carreteras por campaña:', error);
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

// Obtener carreteras de la última campaña
export const getCarreterasUltima = async (req: Request, res: Response): Promise<void> => {
  try {
    const carreteras = await getCarreterasUltimaCampania();
    res.status(200).json({
      msg: '✅ Carreteras de la última campaña obtenidas correctamente',
      data: carreteras,
    });
  } catch (error) {
    console.error('❌ Error al obtener carreteras de la última campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};
// Controlador para eliminar una carretera
export const eliminarCarreteraController = async (req: Request, res: Response): Promise<void> => {
  const { id_carretera } = req.body;

  if (!id_carretera) {
    res.status(400).json({
      msg: '❌ Faltan parámetros: id_carretera es obligatorio',
    });
    return;
  }

  try {
    await eliminarCarretera(id_carretera);
    res.status(200).json({
      msg: `✅ Carretera con ID ${id_carretera} eliminada correctamente`,
    });
  } catch (error) {
    console.error('❌ Error al eliminar carretera:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};


// Función para insertar una nueva carretera
export const insertarCarreteraController = async (req: Request, res: Response): Promise<void> => {
  const {
    carretera,
    direccion_carretera,
    pk_inferior,
    pk_superior,
    prioridad_carretera,
    zona_carretera,
    estado,
    id_campania_carreteras,
    id_visor,
  } = req.body;

  // Validar parámetros
  if (
    !carretera ||
    !direccion_carretera ||
    !pk_inferior ||
    !pk_superior ||
    !prioridad_carretera ||
    !zona_carretera ||
    !estado ||
    !id_campania_carreteras ||
    !id_visor
  ) {
    res.status(400).json({ msg: '❌ Faltan parámetros para la inserción de la carretera' });
    return;
  }

  try {
    // Insertar la carretera llamando al procedimiento almacenado
    await insertarCarretera(req.body);
    res.status(200).json({
      msg: '✅ Carretera insertada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al insertar carretera:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const editarCarreteraHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Extrae el ID de la carretera desde los parámetros de la URL
  const datos = req.body;  // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID de la carretera a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarCarretera(id, datos);
    res.status(200).json({ msg: '✅ Carretera actualizada correctamente' });
  } catch (error) {
    // Maneja los errores de manera apropiada
    if (error instanceof Error) {
      res.status(500).json({ msg: '❌ Error al actualizar la carretera', error: error.message });
    } else {
      res.status(500).json({ msg: '❌ Error desconocido al actualizar la carretera' });
    }
  }
};