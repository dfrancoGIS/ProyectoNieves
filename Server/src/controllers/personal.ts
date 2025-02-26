import { Request, Response } from 'express';
import { getPersonal } from '../models/personal';
import { eliminarPersonal, insertarPersonal, editarPersonal, getPersonalPorCampania } from '../models/personal';

export const obtenerPersonal = async (req: Request, res: Response): Promise<void> => {
  try {
    const personal = await getPersonal(); // Llama a la función del modelo
    res.status(200).json({
      msg: '✅ Personal obtenido correctamente',
      data: personal,
    });
  } catch (error) {
    console.error('❌ Error al obtener personal:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * ✅ Obtener personal filtrado por título de campaña (llamando a la función en PostgreSQL)
 */
export const obtenerPersonalPorCampania = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tituloCampana } = req.query;

    if (!tituloCampana) {
      res.status(400).json({ msg: '⚠️ Debes proporcionar un título de campaña' });
      return;
    }

    const personal = await getPersonalPorCampania(tituloCampana as string);

    res.status(200).json({
      msg: '✅ Personal obtenido correctamente',
      data: personal,
    });
  } catch (error) {
    console.error('❌ Error al obtener personal por campaña:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const borrarPersonal = async (req: Request, res: Response): Promise<void> => {
  const { id_personal } = req.body; // Extrae el id del cuerpo de la solicitud

  if (!id_personal) {
    res.status(400).json({ msg: '❌ Falta el ID del registro a eliminar' });
    return;
  }

  try {
    await eliminarPersonal(id_personal); // Llama a la función del modelo
    res.status(200).json({
      msg: `✅ Registro con id_personal ${id_personal} eliminado correctamente`,
    });
  } catch (error) {
    console.error('❌ Error al eliminar personal:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Controlador para insertar un nuevo personal
export const insertarPersonalHandler = async (req: Request, res: Response): Promise<void> => {
  const {
      nombre_personal,
      apellido1_personal,
      apellido2_personal,
      alias_personal,
      ocupacion_personal,
      tfno1_personal,
      tfno2_personal,
      ext_personal,
      departamento_personal,
      dfa_personal,
      id_campania_personal,
      activo  // 🔹 Nuevo campo añadido
  } = req.body; // Obtenemos los datos enviados en el body de la solicitud

  try {
      await insertarPersonal(
          nombre_personal,
          apellido1_personal,
          apellido2_personal,
          alias_personal,
          ocupacion_personal,
          tfno1_personal,
          tfno2_personal,
          ext_personal,
          departamento_personal,
          dfa_personal,
          id_campania_personal,
          activo  // 🔹 Nuevo parámetro en la función
      );
      res.status(200).json({
          msg: '✅ Personal insertado correctamente',
      });
  } catch (error) {
      console.error('❌ Error al insertar el personal:', error);
      res.status(500).json({
          msg: '❌ Error interno en la API',
          error: error instanceof Error ? error.message : error,
      });
  }
};

// Controlador para editar el registro de personal

export const editarPersonalHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Extrae el ID del personal desde los parámetros de la URL
  const datos = req.body; // Los datos de la actualización vienen en el cuerpo de la solicitud

  // Asegúrate de que el ID esté presente
  if (!id) {
    res.status(400).json({ msg: '❌ Falta el ID del personal a editar' });
  }

  try {
    // Llama al modelo para realizar la actualización
    await editarPersonal(id, datos);
    res.status(200).json({ msg: '✅ Registro actualizado correctamente' });
  } catch (error) {
    // Maneja los errores de manera apropiada
    if (error instanceof Error) {
    res.status(500).json({ msg: '❌ Error al actualizar el registro', error: error.message });
    }
    res.status(500).json({ msg: '❌ Error desconocido al actualizar el registro' });
  }
};