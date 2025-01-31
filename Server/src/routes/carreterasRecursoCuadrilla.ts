import { Router } from 'express';
import { obtenerCarreterasRecursoCuadrilla } from '../controllers/carreterasRecursoCuadrilla';

const router = Router();

/**
 * Ruta para obtener todas las carreteras recurso cuadrilla.
 */
router.get('/', obtenerCarreterasRecursoCuadrilla);

export default router;
