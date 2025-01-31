import { Router } from 'express';
import { getTablasMantenimiento } from '../controllers/tablasMantenimiento';

const router = Router();

/**
 * Ruta para obtener todas las tablas de mantenimiento.
 */
router.get('/', getTablasMantenimiento);

export default router;
