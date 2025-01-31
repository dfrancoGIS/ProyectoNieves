import { Router } from 'express';
import { obtenerTenerCta } from '../controllers/tenerCta';

const router = Router();

/**
 * Ruta para obtener todos los registros de "Tener_Cta".
 */
router.get('/', obtenerTenerCta);

export default router;
