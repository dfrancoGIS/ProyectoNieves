import { Request, Response } from 'express';
import { getVehiculosUltimaCampania, eliminarVehiculo, getAllVehiculos, insertarVehiculo, editarVehiculo, getVehiculosPorCampania } from '../models/vehiculos';

// ✅ Obtener todos los vehículos
export const getVehiculos = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculos = await getAllVehiculos();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    } catch (error) {
        console.error('❌ Error al obtener vehículos:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos',
            error: error instanceof Error ? error.message : error,
        });
    }
};

/**
 * ✅ Obtener vehículos filtrados por título de campaña
 */
export const obtenerVehiculosPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const vehiculos = await getVehiculosPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Vehículos obtenidos correctamente',
      data: vehiculos,
    });
  } catch (error) {
    console.error('❌ Error al obtener vehículos por campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// ✅ Obtener todos los vehículos de la última campaña
export const getVehiculosDetalle = async (req: Request, res: Response): Promise<void> => {
    try {
        const vehiculos = await getVehiculosUltimaCampania();
        res.status(200).json({
            msg: '✅ Vehículos obtenidos correctamente',
            data: vehiculos,
        });
    } catch (error) {
        console.error('❌ Error al obtener vehículos de la última campaña:', error);
        res.status(500).json({
            msg: '❌ Error al obtener vehículos de la última campaña',
            error: error instanceof Error ? error.message : error,
        });
    }
};


export const eliminarVehiculoHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_vehiculo } = req.params;
      console.log('ID recibido para eliminar en el backend:', id_vehiculo); // Debug
      await eliminarVehiculo(id_vehiculo);
      res.status(200).json({
        msg: '✅ Vehículo eliminado correctamente',
      });
    } catch (error) {
      console.error('❌ Error al eliminar vehículo:', error);
      res.status(500).json({
        msg: '❌ Error interno en la API',
        error: error instanceof Error ? error.message : error,
      });
    }
  };


export const insertarVehiculoController = async (req: Request, res: Response): Promise<void> => {
    const { id_vehiculo, descripcion_vehiculo, recurso_vehiculo, empresa_vehiculo, tfno_vehiculo, ext_vehiculo, id_campania_vehiculos } = req.body;
  
    // Verificar si los datos requeridos están presentes
    if (!id_vehiculo || !descripcion_vehiculo || !recurso_vehiculo || !empresa_vehiculo || !id_campania_vehiculos) {
      res.status(400).json({ msg: '❌ Faltan parámetros necesarios' });
      return;
    }
  
    try {
      // Llamar al modelo para insertar el vehículo
      await insertarVehiculo(id_vehiculo, descripcion_vehiculo, recurso_vehiculo, empresa_vehiculo, tfno_vehiculo, ext_vehiculo, id_campania_vehiculos);
      res.status(200).json({
        msg: '✅ Vehículo añadido correctamente',
      });
    } catch (error) {
      console.error('❌ Error al insertar vehículo:', error);
      res.status(500).json({
        msg: '❌ Error interno en la API',
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  // Handler para editar un vehículo
export const editarVehiculoHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  // Extrae el ID del vehículo desde los parámetros de la URL
  const datos = req.body;     // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del vehículo a editar' });
    return;
  }

  try {
    // Llama al modelo para realizar la actualización del vehículo
    await editarVehiculo(id, datos);
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