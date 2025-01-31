import { Router } from 'express';
import { getEstadosComunicacion, registrarEstadoComunicacion } from '../controllers/estadosComunicacion';

const router = Router();

/**
 * Ruta para obtener todos los estados de comunicación.
 */
router.get('/', getEstadosComunicacion);

/**
 * Ruta para registrar un nuevo estado de comunicación.
 */
router.post('/', registrarEstadoComunicacion);

export default router;
