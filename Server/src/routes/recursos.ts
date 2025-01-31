import { Router } from 'express';
import { getRecursos } from '../controllers/recursos';

const router = Router();

/**
 * Ruta para obtener todos los recursos.
 */
router.get('/', getRecursos);

export default router;
