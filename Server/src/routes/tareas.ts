import { Router } from 'express';
import { getTareas } from '../controllers/tareas';

const router = Router();

/**
 * Ruta para obtener todas las tareas.
 */
router.get('/', getTareas);

export default router;
