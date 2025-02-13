import { Router } from 'express';
import { getZonas } from '../controllers/zonas';

const router = Router();

// Ruta para obtener todas las zonas
router.get('/', getZonas);

export default router;
