import { Router } from 'express';
import { getComunicaciones, getComunicacion, postComunicacion } from '../controllers/comunicaciones';

const router = Router();

/**
 * Rutas para la gestión de comunicaciones.
 */
router.get('/', getComunicaciones);
router.get('/:id', getComunicacion);
router.post('/', postComunicacion);

export default router;