import { Router } from 'express';
import { getCuadrillas } from '../controllers/cuadrillas';

const router = Router();

/**
 * Ruta para obtener todas las cuadrillas.
 */
router.get('/', getCuadrillas);

export default router;
