import { Request, Response } from 'express';
import { insertarActivacion, obtenerActivaciones, editarActivacion, obtenerActivacionPorFechaHoraRecurso } from '../models/activacion';

/**
 * ✅ Insertar una nueva activación
 */
export const insertarActivacionHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    numeroTurno,
    fecha,
    hora,
    duracionTurno,
    activadoPor,
    empresaRecurso,
    recurso,
    vehiculo,
    tipoTurno,
    zona,
    personal1,
    rolPersonal1,
    personal2,
    rolPersonal2
  } = req.body;

  // ✅ Validamos que los campos obligatorios estén presentes
  if (!numeroTurno || !fecha || !hora || !duracionTurno || !activadoPor || !empresaRecurso || !recurso || !tipoTurno || !zona || !personal1 || !rolPersonal1) {
    res.status(400).json({ msg: '⚠️ Faltan datos obligatorios' });
    return;
  }

  try {
    await insertarActivacion(
      numeroTurno,
      fecha,
      hora,
      duracionTurno,
      activadoPor,
      empresaRecurso,
      recurso,
      vehiculo,
      tipoTurno,
      zona,
      personal1,
      rolPersonal1,
      personal2,
      rolPersonal2
    );

    res.status(201).json({
      msg: '✅ Activación insertada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al insertar la activación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * ✅ Obtener todas las activaciones
 */
export const obtenerActivacionesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const activaciones = await obtenerActivaciones();
    res.status(200).json({
      msg: '✅ Activaciones recuperadas correctamente',
      data: activaciones,
    });
  } catch (error) {
    console.error('❌ Error al obtener las activaciones:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};


/**
 * ✅ Editar una activación existente
 */
export const editarActivacionHandler = async (req: Request, res: Response): Promise<void> => {
  const {
    idActivacion,
    numeroTurno,
    fecha,
    horaInicio,
    duracionTurno,
    activadoPor,
    empresaRecurso,
    recurso,
    vehiculo,
    tipoTurno,
    zona,
    personal1,
    rolPersonal1,
    personal2,
    rolPersonal2
  } = req.body;

  // ✅ Validamos que los campos obligatorios estén presentes
  if (!idActivacion || !numeroTurno || !fecha || !horaInicio || !duracionTurno || !activadoPor || !empresaRecurso || !recurso || !tipoTurno || !zona || !personal1 || !rolPersonal1) {
    res.status(400).json({ msg: '⚠️ Faltan datos obligatorios' });
    return;
  }

  try {
    await editarActivacion(
      idActivacion,
      numeroTurno,
      fecha,
      duracionTurno,
      horaInicio,
      activadoPor,
      empresaRecurso,
      recurso,
      vehiculo,
      tipoTurno,
      zona,
      personal1,
      rolPersonal1,
      personal2,
      rolPersonal2
    );

    res.status(200).json({
      msg: '✅ Activación editada correctamente',
    });
  } catch (error) {
    console.error('❌ Error al editar la activación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};

/**
 * ✅ Buscar una activación por fecha, hora y recurso
 */
export const buscarActivacionHandler = async (req: Request, res: Response): Promise<void> => {
  const { fecha, horaInicio, recurso } = req.query;

  // ✅ Validación de parámetros
  if (!fecha || !horaInicio || !recurso) {
    res.status(400).json({ msg: '⚠️ Parámetros insuficientes (se requieren fecha, horaInicio y recurso)' });
    return;
  }

  try {
    const activacion = await obtenerActivacionPorFechaHoraRecurso(
      fecha as string, 
      horaInicio as string, 
      recurso as string
    );

    if (activacion) {
      res.status(200).json(activacion);
    } else {
      res.status(404).json({ msg: '⚠️ No se encontró la activación' });
    }
  } catch (error) {
    console.error('❌ Error al buscar la activación:', error);
    res.status(500).json({
      msg: '❌ Error interno en la API',
      error: error instanceof Error ? error.message : error,
    });
  }
};