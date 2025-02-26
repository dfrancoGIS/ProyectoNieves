import { Router } from 'express';
import { getEstadosComunicacion, eliminarEstadoComunicacionHandler, insertarEstadoComunicacionController, editarEstadoComunicacionHandler, obtenerEstadosComunicacionPorCampania } from '../controllers/estadosComunicacion';

const router = Router();

// Ruta para obtener los estados de comunicación de la última campaña
router.get('/', getEstadosComunicacion);

// Ruta para eliminar un estado de comunicación por su ID
router.delete('/eliminar/:id_estado_comunicacion', eliminarEstadoComunicacionHandler);


// Ruta para insertar un nuevo estado de comunicación
router.post('/insertar', insertarEstadoComunicacionController);

// Ruta para editar un registro de estado_comunicacion
router.put('/editar/:id', editarEstadoComunicacionHandler);

// Ruta para obtener los estados de comunicación filtrados por campaña
router.get('/filtrar', obtenerEstadosComunicacionPorCampania);

export default router;
