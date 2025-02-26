import { Request, Response } from 'express';
import { getCampanias, eliminarCampania, actualizarFinCampaniaAnterior, insertarNuevaCampania, replicarDatosNuevaCampania, getCampaniasFiltradas } from '../models/campanias';

// Endpoint para obtener todas las campañas
export const getCampaniasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const campanias = await getCampanias();
    res.status(200).json({
      msg: '✅ Campañas obtenidas correctamente',
      data: campanias,
    });
  } catch (error) {
    console.error('❌ Error al obtener campañas:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getCampaniasFiltradasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo_campania } = req.query;

    if (!titulo_campania) {
     res.status(400).json({ msg: '❌ Se requiere el parámetro titulo_campania' });
    }

    const campanias = await getCampaniasFiltradas(titulo_campania as string);

    res.status(200).json({
      msg: '✅ Campañas filtradas obtenidas correctamente',
      data: campanias,
    });
  } catch (error) {
    console.error('❌ Error al obtener campañas filtradas:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const eliminarCampaniaHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_campania } = req.params;  // ID de la campaña desde la URL
    console.log('ID recibido para eliminar en el backend:', id_campania);  // Debug
    await eliminarCampania(Number(id_campania));  // Llamada a la función del modelo
    res.status(200).json({
      msg: '✅ Campaña eliminada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al eliminar campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ✅ Crear una nueva campaña con replicación de datos
export const crearNuevaCampaniaHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, fechaInicio, fechaFinAnterior } = req.body;

    if (!titulo || !fechaInicio || !fechaFinAnterior) {
      res.status(400).json({ msg: '❌ Todos los campos son obligatorios' });
      return;
    }

    console.log('📌 Datos recibidos:', { titulo, fechaInicio, fechaFinAnterior });

    // 1️⃣ Actualizar la fecha de fin de la campaña anterior
    await actualizarFinCampaniaAnterior(fechaFinAnterior);

    // 2️⃣ Insertar la nueva campaña con el ID siguiente
    const nuevoIdCampania = await insertarNuevaCampania(titulo, fechaInicio);

    // 3️⃣ Replicar datos de la última campaña a la nueva
    await replicarDatosNuevaCampania(nuevoIdCampania - 1, nuevoIdCampania);

    res.status(201).json({
      msg: '✅ Nueva campaña creada y datos replicados correctamente',
    });
  } catch (error) {
    console.error('❌ Error al crear la nueva campaña:', error);
    
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};